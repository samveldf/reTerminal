import { XMLParser } from 'fast-xml-parser';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { GoogleDecoder } from 'google-news-url-decoder';
import { fetchNews } from '../apis/news';

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

export interface FeaturedArticle {
  title: string;
  source: string;
  pubDate: string;
  url: string;
  summary: string;
  body: string;
}

const GOOGLE_NEWS_HOST = 'news.google.com';
const SUMMARY_MIN = 200;
const SUMMARY_MAX = 300;
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
    visible.match(/[\u4e00-\u9fffA-Za-z0-9，。！？；：、（）《》“”‘’【】—,.!?;:()[\]<>/%+-]/g) || []
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

const countChars = (text: string): number => [...text].length;

const cutChars = (text: string, maxChars: number): string => {
  const chars = [...text];
  return chars.slice(0, maxChars).join('');
};

const normalizeSummaryText = (input: string): string => {
  return stripBrokenChars(input)
    .replace(/[#*_`>]/g, '')
    .replace(/[ \t]+/g, '')
    .replace(/\n+/g, '')
    .replace(/^[：:;；，,。.!！？]+/, '')
    .trim();
};

const sentenceSplit = (text: string): string[] => {
  return (text.match(/[^。！？!?；;\n]+[。！？!?；;]?/g) || [])
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 2);
};

const enforceSummaryLength = (summary: string, sourceText: string): string => {
  let current = normalizeSummaryText(summary);
  const compactSource = normalizeSummaryText(sourceText);

  if (countChars(current) > SUMMARY_MAX) {
    current = cutChars(current, SUMMARY_MAX);
    const cutAt = Math.max(
      current.lastIndexOf('。'),
      current.lastIndexOf('！'),
      current.lastIndexOf('？'),
      current.lastIndexOf(';'),
      current.lastIndexOf('；'),
    );
    if (cutAt >= SUMMARY_MIN - 1) {
      current = current.slice(0, cutAt + 1);
    }
  }

  if (countChars(current) < SUMMARY_MIN) {
    const missing = SUMMARY_MIN - countChars(current);
    const appendPart = cutChars(compactSource, missing + 32);
    current = normalizeSummaryText(`${current}${appendPart}`);
  }

  if (countChars(current) > SUMMARY_MAX) {
    current = cutChars(current, SUMMARY_MAX);
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

const scoreHeadline = (item: NewsItem): number => {
  const text = `${item.title} ${item.description}`.toLowerCase();
  const positive = ['评测', '体验', '深度', '解读', '首发', '发布', '芯片', '影像', '折叠', 'ai', '大模型'];
  const negative = ['补贴', '抽奖', '话费', '促销', '福利', '优惠'];

  let score = 0;
  for (const kw of positive) {
    if (text.includes(kw)) score += 2;
  }
  for (const kw of negative) {
    if (text.includes(kw)) score -= 2;
  }
  if (item.title.length >= 20) score += 1;

  const pub = Date.parse(item.pubDate);
  if (!Number.isNaN(pub)) {
    const ageHours = (Date.now() - pub) / 3_600_000;
    score += Math.max(0, 48 - ageHours) / 16;
  }

  return score;
};

const fallbackItems = (): NewsItem[] => [
  {
    title: '暂无可用资讯，请检查网络连接',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '请确认 Google News RSS 地址可访问',
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
  {
    title: '可在 web/.env 修改 RSS 搜索关键词',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '建议使用中文科技关键词获取更稳定结果',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '示例：数码 手机 AI 芯片 可穿戴',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '保持页面仅展示 headlines 可减少截断',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
  {
    title: '当前页面已按全屏填充排版',
    url: '',
    pubDate: '',
    source: '',
    description: '',
  },
];

const errorNews = (): NewsData => ({
  headlines: fallbackItems(),
});

const parseNewsItems = async (): Promise<NewsItem[]> => {
  let response = '';
  try {
    response = await fetchNews();
  } catch (error) {
    console.error('news fetch error:', error);
    return fallbackItems();
  }

  const parser = new XMLParser();
  const xml = parser.parse(response);
  const rawItems = xml?.rss?.channel?.item;

  if (!rawItems) {
    return fallbackItems();
  }

  const items = (Array.isArray(rawItems) ? rawItems : [rawItems])
    .slice(0, 16)
    .map(
      (item: {
        title?: string;
        link?: string;
        pubDate?: string;
        description?: string;
        source?: { '#text'?: string } | string;
      }) => toNewsItem(item),
    );

  return items;
};

const tryDecodeGoogleNewsLink = async (url: string): Promise<string> => {
  try {
    const host = new URL(url).hostname;
    if (!host.includes(GOOGLE_NEWS_HOST)) return url;
    const decoded = await decoder.decode(url);
    if (decoded?.status && decoded.decoded_url) {
      return decoded.decoded_url;
    }
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

const buildFallbackFeatureBody = (items: NewsItem[]): string => {
  const merged = items
    .slice(0, 8)
    .map((item, index) => `${index + 1}. ${item.title}`)
    .join('\n');

  return normalizeArticleText(
    `今日数码资讯重点如下：\n${merged}\n\n以上内容基于最新 RSS 头条自动生成，系统将在下次刷新尝试抓取单篇原文全文。`,
  );
};

const keywordSetFromTitle = (title: string): string[] => {
  const words = title
    .toLowerCase()
    .match(/[a-z0-9]{2,}|[\u4e00-\u9fff]{2,}/g);
  if (!words) return [];
  return Array.from(new Set(words)).slice(0, 12);
};

const extractiveSummary = (title: string, body: string): string => {
  const normalizedBody = normalizeSummaryText(body);
  const sentences = sentenceSplit(normalizedBody);
  if (!sentences.length) {
    return cutChars(normalizedBody, SUMMARY_MAX);
  }

  const keywords = keywordSetFromTitle(title);
  const scored = sentences.map((sentence, index) => {
    const keywordHits = keywords.reduce(
      (sum, keyword) => (sentence.includes(keyword) ? sum + 1 : sum),
      0,
    );
    const len = countChars(sentence);
    const lengthScore = len >= 18 && len <= 48 ? 1.4 : len <= 60 ? 1 : 0.2;
    return {
      sentence,
      index,
      score: keywordHits * 2 + lengthScore + (index <= 1 ? 0.6 : 0),
    };
  });

  const picked = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.sentence);

  let summary = '';
  for (const sentence of picked) {
    if (countChars(summary) >= SUMMARY_MAX) break;
    summary = `${summary}${sentence}`;
  }

  return enforceSummaryLength(summary, normalizedBody);
};

const summarizeWithGemini = async (title: string, source: string): Promise<string> => {
  const apiKey = import.meta.env.GEMINI_API_KEY;
  if (!apiKey) return '';

  const prompt = [
    '请把下面这篇数码新闻摘要为简体中文，必须满足：',
    '1) 只输出一段正文，不要标题，不要序号，不要项目符号。',
    `2) 字数必须在${SUMMARY_MIN}-${SUMMARY_MAX}字之间。`,
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
            maxOutputTokens: 380,
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
    return enforceSummaryLength(text, source);
  } catch {
    return '';
  }
};

export const getGoogleHeadlines = async (): Promise<NewsData> => {
  const items = await parseNewsItems();
  const headlines = items.slice(0, 8);

  if (!headlines.length) {
    return errorNews();
  }

  return { headlines };
};

export const getFeaturedArticle = async (): Promise<FeaturedArticle> => {
  const items = await parseNewsItems();
  const ranked = [...items].sort((a, b) => scoreHeadline(b) - scoreHeadline(a));
  const selected = ranked[0] || fallbackItems()[0];
  const fallbackBody = buildFallbackFeatureBody(items);

  const decodedUrl = selected.url ? await tryDecodeGoogleNewsLink(selected.url) : '';
  let body = '';

  if (decodedUrl) {
    try {
      const html = await fetchTextWithTimeout(decodedUrl, 15_000);
      body = extractReadableBody(html, decodedUrl);
    } catch (error) {
      console.error('featured article fetch error:', error);
    }

    if (body.length < 260) {
      try {
        body = await extractViaJinaProxy(decodedUrl);
      } catch (error) {
        console.error('featured article proxy error:', error);
      }
    }
  }

  if (body.length < 260 || isLikelyCorruptedText(body)) {
    body = fallbackBody;
  }

  const aiSummary = await summarizeWithGemini(selected.title, body);
  let summary = aiSummary || extractiveSummary(selected.title, body);
  summary = enforceSummaryLength(summary, body);

  if (isLikelyCorruptedText(summary)) {
    summary = extractiveSummary(selected.title, fallbackBody);
  }

  return {
    title: selected.title,
    source: selected.source || 'Google News',
    pubDate: selected.pubDate,
    url: decodedUrl || selected.url,
    summary,
    body,
  };
};
