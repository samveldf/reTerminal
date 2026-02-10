import { XMLParser } from 'fast-xml-parser';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { GoogleDecoder } from 'google-news-url-decoder';
import {
  DEFAULT_GADGET_NEWS_RSS,
  DEFAULT_GENERAL_NEWS_RSS,
  fetchNews,
} from '../apis/news';

export interface NewsItem {
  title: string;
  url: string;
  pubDate: string;
  source: string;
  description: string;
}

export interface NewsData {
  headlines: NewsItem[];
}

export interface GadgetBrief {
  title: string;
  source: string;
  pubDate: string;
  url: string;
  summary: string;
}

export interface GadgetBriefData {
  briefs: GadgetBrief[];
}

const GOOGLE_NEWS_HOST = 'news.google.com';
const GADGET_BRIEF_MIN = 90;
const GADGET_BRIEF_MAX = 120;
const decoder = new GoogleDecoder();

const stripBrokenChars = (input: string): string => {
  return input
    .replace(/[�□]/g, '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '');
};

const isLikelyCorruptedText = (input: string): boolean => {
  const text = input.trim();
  if (!text) return true;

  const brokenCount = (text.match(/[�□]/g) || []).length;
  if (brokenCount >= 2) return true;

  const visible = text.replace(/\s+/g, '');
  if (visible.length < 32) return false;

  const allowed = (
    visible.match(/[\u4e00-\u9fffA-Za-z0-9，。！？；：、（）《》“”‘’【】—,.!?;:()[\]<>/%+\-]/g) || []
  ).length;

  return allowed / visible.length < 0.78;
};

const cleanTitle = (title: string): string => {
  return stripBrokenChars(title)
    .replace(/\s+-\s+[^-]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const decodeEntities = (input: string): string => {
  return input
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
};

const stripHtml = (input: string): string => {
  return decodeEntities(input.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
};

const sanitizeLink = (link: string): string => {
  try {
    const url = new URL(link);
    url.search = '';
    return url.toString();
  } catch {
    return link;
  }
};

const normalizeArticleText = (raw: string): string => {
  const text = stripBrokenChars(raw)
    .replace(/\r/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  if (!text) return '';

  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
};

const normalizeSummaryText = (input: string): string => {
  return stripBrokenChars(input)
    .replace(/[#*_`>]/g, '')
    .replace(/[ \t]+/g, '')
    .replace(/\n+/g, '')
    .replace(/^[：:;；，,。.!！？]+/, '')
    .trim();
};

const countChars = (text: string): number => [...text].length;

const cutChars = (text: string, maxChars: number): string => {
  const chars = [...text];
  return chars.slice(0, maxChars).join('');
};

const sentenceSplit = (text: string): string[] => {
  return (text.match(/[^。！？!?；;\n]+[。！？!?；;]?/g) || [])
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 2);
};

const enforceTextLength = (
  text: string,
  sourceText: string,
  minChars: number,
  maxChars: number,
): string => {
  let current = normalizeSummaryText(text);
  const compactSource = normalizeSummaryText(sourceText);

  if (countChars(current) > maxChars) {
    current = cutChars(current, maxChars);
    const cutAt = Math.max(
      current.lastIndexOf('。'),
      current.lastIndexOf('！'),
      current.lastIndexOf('？'),
      current.lastIndexOf(';'),
      current.lastIndexOf('；'),
    );
    if (cutAt >= minChars - 1) {
      current = current.slice(0, cutAt + 1);
    }
  }

  if (countChars(current) < minChars) {
    const missing = minChars - countChars(current);
    const appendPart = cutChars(compactSource, missing + 24);
    current = normalizeSummaryText(`${current}${appendPart}`);
  }

  if (countChars(current) > maxChars) {
    current = cutChars(current, maxChars);
  }

  return current;
};

const toNewsItem = (item: {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  source?: { '#text'?: string } | string;
}): NewsItem => ({
  title: cleanTitle(item.title || 'N/A'),
  url: sanitizeLink(item.link || ''),
  pubDate: item.pubDate || '',
  source: typeof item.source === 'string' ? item.source : item.source?.['#text'] || '',
  description: stripHtml(item.description || ''),
});

const scoreGadgetHeadline = (item: NewsItem): number => {
  const text = `${item.title} ${item.description}`.toLowerCase();
  const positive = [
    '评测',
    '体验',
    '深度',
    '解读',
    '首发',
    '发布',
    '芯片',
    '影像',
    '折叠',
    'ai',
    '大模型',
    '旗舰',
    '性能',
  ];
  const negative = ['补贴', '抽奖', '话费', '促销', '福利', '优惠'];

  let score = 0;
  for (const kw of positive) {
    if (text.includes(kw)) score += 2;
  }
  for (const kw of negative) {
    if (text.includes(kw)) score -= 2;
  }

  if (item.title.length >= 16) score += 1;

  const pub = Date.parse(item.pubDate);
  if (!Number.isNaN(pub)) {
    const ageHours = (Date.now() - pub) / 3_600_000;
    score += Math.max(0, 48 - ageHours) / 16;
  }

  return score;
};

const scoreGeneralHeadline = (item: NewsItem): number => {
  const text = `${item.title} ${item.description}`.toLowerCase();
  const positive = [
    '突发',
    '最新',
    '要闻',
    '发布',
    '政策',
    '经济',
    '金融',
    '国际',
    'ai',
    '科技',
    '芯片',
    '能源',
    '安全',
    '市场',
  ];
  const negative = ['折扣', '优惠', '抽奖', '福利', '促销', '团购'];

  let score = 0;
  for (const kw of positive) {
    if (text.includes(kw)) score += 1.6;
  }
  for (const kw of negative) {
    if (text.includes(kw)) score -= 2;
  }

  if (item.title.length >= 14) score += 0.8;

  const pub = Date.parse(item.pubDate);
  if (!Number.isNaN(pub)) {
    const ageHours = (Date.now() - pub) / 3_600_000;
    score += Math.max(0, 36 - ageHours) / 14;
  }

  return score;
};

const fallbackGeneralItems = (): NewsItem[] => [
  {
    title: '暂无可用重点新闻，请检查网络连接',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '请确认综合 RSS 地址可访问',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '系统将在下次刷新时自动重试',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '可在 web/.env 调整 GENERAL_NEWS_RSS_URL',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '建议使用 Google News 综合头条 RSS',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '当前页面仅显示重点 headlines',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
];

const fallbackGadgetItems = (): NewsItem[] => [
  {
    title: '暂无可用数码新闻，请检查网络连接',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '请确认 Gadget RSS 地址可访问',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '系统会在下次刷新时自动重试',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
];

const dedupeByTitle = (items: NewsItem[]): NewsItem[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.title.toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const parseNewsItems = async (feedUrl: string, fallback: NewsItem[]): Promise<NewsItem[]> => {
  let response = '';
  try {
    response = await fetchNews(feedUrl);
  } catch (error) {
    console.error('news fetch error:', error);
    return fallback;
  }

  const parser = new XMLParser();
  const xml = parser.parse(response);
  const rawItems = xml?.rss?.channel?.item;

  if (!rawItems) return fallback;

  const items = (Array.isArray(rawItems) ? rawItems : [rawItems])
    .slice(0, 24)
    .map(
      (item: {
        title?: string;
        link?: string;
        pubDate?: string;
        description?: string;
        source?: { '#text'?: string } | string;
      }) => toNewsItem(item),
    )
    .filter((item) => !!item.title && !item.title.includes('N/A'));

  return dedupeByTitle(items);
};

const resolveGeneralRssUrl = (): string => {
  return import.meta.env.GENERAL_NEWS_RSS_URL || import.meta.env.GOOGLE_NEWS_RSS_URL || DEFAULT_GENERAL_NEWS_RSS;
};

const resolveGadgetRssUrl = (): string => {
  return import.meta.env.GADGET_NEWS_RSS_URL || import.meta.env.GOOGLE_NEWS_RSS_URL || DEFAULT_GADGET_NEWS_RSS;
};

const tryDecodeGoogleNewsLink = async (url: string): Promise<string> => {
  try {
    const host = new URL(url).hostname;
    if (!host.includes(GOOGLE_NEWS_HOST)) return url;
    const decoded = await decoder.decode(url);
    if (decoded?.status && decoded.decoded_url) return decoded.decoded_url;
    return url;
  } catch {
    return url;
  }
};

const fetchTextWithTimeout = async (url: string, timeoutMs: number): Promise<string> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Safari/537.36',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
    });
    if (!response.ok) {
      throw new Error(`failed to fetch article: ${response.status}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
};

const extractReadableBody = (html: string, articleUrl: string): string => {
  try {
    const dom = new JSDOM(html, { url: articleUrl });
    const result = new Readability(dom.window.document).parse();
    return normalizeArticleText(result?.textContent || '');
  } catch {
    return '';
  }
};

const extractViaJinaProxy = async (url: string): Promise<string> => {
  const normalized = url.replace(/^https?:\/\//, '');
  const text = await fetchTextWithTimeout(`https://r.jina.ai/http://${normalized}`, 15_000);
  const marker = 'Markdown Content:';
  const idx = text.indexOf(marker);
  const body = idx >= 0 ? text.slice(idx + marker.length) : text;
  return normalizeArticleText(body);
};

const keywordSetFromTitle = (title: string): string[] => {
  const words = title
    .toLowerCase()
    .match(/[a-z0-9]{2,}|[\u4e00-\u9fff]{2,}/g);
  if (!words) return [];
  return Array.from(new Set(words)).slice(0, 12);
};

const extractiveSummary = (
  title: string,
  body: string,
  minChars: number,
  maxChars: number,
): string => {
  const normalizedBody = normalizeSummaryText(body);
  const sentences = sentenceSplit(normalizedBody);

  if (!sentences.length) {
    return enforceTextLength(normalizedBody, normalizedBody, minChars, maxChars);
  }

  const keywords = keywordSetFromTitle(title);
  const scored = sentences.map((sentence, index) => {
    const keywordHits = keywords.reduce(
      (sum, keyword) => (sentence.includes(keyword) ? sum + 1 : sum),
      0,
    );
    const len = countChars(sentence);
    const lengthScore = len >= 16 && len <= 48 ? 1.4 : len <= 70 ? 1 : 0.2;
    return {
      sentence,
      index,
      score: keywordHits * 2 + lengthScore + (index <= 1 ? 0.5 : 0),
    };
  });

  const picked = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.sentence);

  let summary = '';
  for (const sentence of picked) {
    if (countChars(summary) >= maxChars) break;
    summary = `${summary}${sentence}`;
  }

  return enforceTextLength(summary, normalizedBody, minChars, maxChars);
};

const summarizeWithGemini = async (
  title: string,
  source: string,
  minChars: number,
  maxChars: number,
): Promise<string> => {
  const apiKey = import.meta.env.GEMINI_API_KEY;
  if (!apiKey) return '';

  const prompt = [
    '请把下面这篇新闻摘要为简体中文，必须满足：',
    '1) 只输出一段正文，不要标题，不要序号，不要项目符号。',
    `2) 字数必须在${minChars}-${maxChars}字之间。`,
    '3) 保留关键事实：产品/公司、时间、核心变化、影响。',
    `新闻标题：${title}`,
    `新闻正文：${source}`,
  ].join('\n');

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topP: 0.9,
            maxOutputTokens: 260,
          },
        }),
      },
    );

    if (!response.ok) return '';
    const json = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    const text =
      json.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || '')
        .join('')
        .trim() || '';

    if (!text) return '';
    return enforceTextLength(text, source, minChars, maxChars);
  } catch {
    return '';
  }
};

const buildFallbackBriefBody = (item: NewsItem, items: NewsItem[]): string => {
  const merged = items
    .slice(0, 6)
    .map((news, index) => `${index + 1}. ${news.title}`)
    .join('。');

  return normalizeArticleText(`${item.title}。${item.description}。${merged}`);
};

const getArticleBody = async (url: string): Promise<string> => {
  if (!url) return '';

  try {
    const html = await fetchTextWithTimeout(url, 15_000);
    const readable = extractReadableBody(html, url);
    if (readable.length >= 120 && !isLikelyCorruptedText(readable)) {
      return readable;
    }
  } catch (error) {
    console.error('featured article fetch error:', error);
  }

  try {
    const proxyBody = await extractViaJinaProxy(url);
    if (proxyBody.length >= 120 && !isLikelyCorruptedText(proxyBody)) {
      return proxyBody;
    }
  } catch (error) {
    console.error('featured article proxy error:', error);
  }

  return '';
};

const toFallbackBrief = (index: number): GadgetBrief => {
  return {
    title: `数码简报 ${index + 1}`,
    source: 'Google News',
    pubDate: '',
    url: '',
    summary: '当前未拉取到足够的数码资讯，系统将在下次刷新时自动重试。请检查 RSS 地址和网络连接状态。',
  };
};

const buildGadgetBrief = async (item: NewsItem, allItems: NewsItem[]): Promise<GadgetBrief> => {
  const decodedUrl = item.url ? await tryDecodeGoogleNewsLink(item.url) : '';
  const body = (await getArticleBody(decodedUrl)) || buildFallbackBriefBody(item, allItems);

  const aiSummary = await summarizeWithGemini(item.title, body, GADGET_BRIEF_MIN, GADGET_BRIEF_MAX);
  let summary = aiSummary || extractiveSummary(item.title, body, GADGET_BRIEF_MIN, GADGET_BRIEF_MAX);
  summary = enforceTextLength(summary, body, GADGET_BRIEF_MIN, GADGET_BRIEF_MAX);

  if (isLikelyCorruptedText(summary)) {
    summary = extractiveSummary(item.title, buildFallbackBriefBody(item, allItems), GADGET_BRIEF_MIN, GADGET_BRIEF_MAX);
  }

  return {
    title: item.title,
    source: item.source || 'Google News',
    pubDate: item.pubDate,
    url: decodedUrl || item.url,
    summary,
  };
};

export const getGoogleHeadlines = async (): Promise<NewsData> => {
  const items = await parseNewsItems(resolveGeneralRssUrl(), fallbackGeneralItems());
  const ranked = [...items].sort((a, b) => scoreGeneralHeadline(b) - scoreGeneralHeadline(a));
  const headlines = ranked.slice(0, 8);

  if (!headlines.length) {
    return { headlines: fallbackGeneralItems() };
  }

  return { headlines };
};

export const getGadgetBriefs = async (): Promise<GadgetBriefData> => {
  const items = await parseNewsItems(resolveGadgetRssUrl(), fallbackGadgetItems());
  const ranked = [...items].sort((a, b) => scoreGadgetHeadline(b) - scoreGadgetHeadline(a));
  const selected = ranked.slice(0, 3);

  if (!selected.length) {
    return { briefs: [toFallbackBrief(0), toFallbackBrief(1), toFallbackBrief(2)] };
  }

  const briefs = await Promise.all(selected.map((item) => buildGadgetBrief(item, ranked)));
  while (briefs.length < 3) {
    briefs.push(toFallbackBrief(briefs.length));
  }

  return { briefs };
};
