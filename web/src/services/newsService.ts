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
const GADGET_BRIEF_MIN = 160;
const GADGET_BRIEF_MAX = 195;
const decoder = new GoogleDecoder();

const stripBrokenChars = (input: string): string => {
  return input
    .replace(/[�□]/g, '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '');
};

const stripScriptLikeFragments = (input: string): string => {
  return input
    .replace(/!\[[^\]]*\]\((?:https?:\/\/|www\.|mailto:|\b(?:javascript|vbscript|data)\s*:)[^)]*\)/gi, '')
    .replace(/\[([^\]]{1,80})\]\((?:https?:\/\/|www\.|mailto:|\b(?:javascript|vbscript|data)\s*:)[^)]*\)/gi, '$1')
    .replace(/\[\]\((?:https?:\/\/|www\.|mailto:|\b(?:javascript|vbscript|data)\s*:)[^)]*\)/gi, '')
    .replace(/\((?:\s*\b(?:javascript|vbscript|data)\s*:)[^)]*\)/gi, '')
    .replace(/\b(?:javascript|vbscript|data)\s*:[^\s）)\]]+/gi, '')
    .replace(/!\[\]/g, '')
    .replace(/\[\]/g, '');
};

const escapeRegExp = (input: string): string => {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const stripTimestampNoise = (input: string): string => {
  return input
    .replace(/\b20\d{2}[./-]\d{1,2}[./-]\d{1,2}\d{1,2}:\d{2}(?::\d{2})?\b/g, '')
    .replace(/\b20\d{2}[年./-]\d{1,2}[月./-]\d{1,2}(?:日)?(?:\s*\d{1,2}:\d{2}(?::\d{2})?)?\b/g, '')
    .replace(/\b\d{1,2}月\d{1,2}日(?:\s*\d{1,2}:\d{2}(?::\d{2})?)?\b/g, '')
    .replace(/\b\d{1,2}:\d{2}(?::\d{2})?\b/g, '');
};

const normalizeLooseComparable = (input: string): string => {
  return input.toLowerCase().replace(/[\s\-_.,，。:：;；!！?？'"“”‘’`~()[\]{}<>|/\\]/g, '');
};

const stripLeadingTitleNoise = (summary: string, title: string): string => {
  const titleCompact = cleanTitle(title).replace(/\s+/g, '');
  if (titleCompact.length < 6) return summary;

  const loosePattern = [...titleCompact]
    .slice(0, 72)
    .map((ch) => escapeRegExp(ch))
    .join('[\\s，。,:：;；\\-—|｜_]*');

  let text = summary.replace(
    new RegExp(`^(?:${loosePattern})[\\s，。,:：;；\\-—|｜_]*`, 'i'),
    '',
  );

  const normalizedTitle = normalizeLooseComparable(titleCompact).replace(/\d+/g, '');
  if (normalizedTitle.length >= 8) {
    const firstSentence = (text.match(/^[^。！？!?；;]{1,90}/) || [''])[0].trim();
    const firstNorm = normalizeLooseComparable(firstSentence).replace(/\d+/g, '');
    const key = normalizedTitle.slice(0, Math.min(16, normalizedTitle.length));
    if (key && firstNorm.includes(key)) {
      text = text.slice(firstSentence.length);
    }
  }

  return text.replace(/^[，,。;；:：\-\s]+/, '');
};

const stripTitleEchoSentence = (summary: string, title: string): string => {
  const normalizedTitle = normalizeLooseComparable(cleanTitle(title)).replace(/\d+/g, '');
  if (normalizedTitle.length < 8) return summary;

  const sentences = sentenceSplit(summary);
  if (sentences.length < 2) return summary;

  const first = sentences[0];
  const firstNormalized = normalizeLooseComparable(first).replace(/\d+/g, '');
  const firstSimilarity = jaccard(
    buildSimilarityTokensFromText(firstNormalized),
    buildSimilarityTokensFromText(normalizedTitle),
  );
  const titleHead = normalizedTitle.slice(0, Math.min(14, normalizedTitle.length));
  const isEcho = firstSimilarity >= 0.38 || (titleHead.length >= 8 && firstNormalized.includes(titleHead));
  if (!isEcho) return summary;

  const compactRest = sentences.slice(1).join('');
  if ([...compactRest].length < 36) return summary;
  return compactRest.replace(/^[，,。;；:：\-\s]+/, '');
};

const stripSourceNoise = (summary: string, source: string): string => {
  const sourceCompact = cleanSource(source)
    .replace(/\s+/g, '')
    .replace(/[|｜]/g, '')
    .trim();
  if (sourceCompact.length < 2) return summary;

  const sourcePattern = escapeRegExp(sourceCompact);
  return summary
    .replace(new RegExp(sourcePattern, 'gi'), '')
    .replace(
      new RegExp(`(?:${sourcePattern}[，,。:：;；\\-—|｜\\s]*){2,}`, 'gi'),
      `${sourceCompact}，`,
    )
    .replace(new RegExp(`^${sourcePattern}[，,。:：;；\\-—|｜\\s]*`, 'i'), '');
};

const cleanupBriefNoise = (summary: string, title: string, source: string): string => {
  return stripTitleEchoSentence(
    stripLeadingTitleNoise(stripSourceNoise(stripTimestampNoise(summary), source), title),
    title,
  )
    .replace(/([\u4e00-\u9fffA-Za-z0-9]{3,16})\1{1,}/g, '$1')
    .replace(/([A-Za-z0-9\u4e00-\u9fff]{2,20})(?:-\1){1,}/g, '$1')
    .replace(/[，,]{2,}/g, '，')
    .replace(/[。．]{2,}/g, '。')
    .replace(/^[，,。;；:：\-\s]+/, '')
    .trim();
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

const cleanSource = (source: string): string => {
  const compact = stripBrokenChars(source || '')
    .replace(/\s+/g, '')
    .replace(/[|｜]/g, '-')
    .replace(/[—–]+/g, '-')
    .replace(/[()（）【】[\]]/g, '')
    .trim();
  if (!compact) return '';

  const deduped = compact
    .replace(/([A-Za-z0-9\u4e00-\u9fff]{2,20})(?:-\1)+/gi, '$1')
    .replace(/([A-Za-z0-9\u4e00-\u9fff]{2,20})\1{1,}/gi, '$1')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');

  const parts = deduped.split('-').filter(Boolean);
  const unique: string[] = [];
  for (const part of parts) {
    if (!unique.includes(part)) unique.push(part);
  }
  const merged = unique.length ? unique.join('-') : deduped;
  return merged.length > 18 ? merged.slice(0, 18) : merged;
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
  const text = stripTimestampNoise(stripScriptLikeFragments(stripBrokenChars(raw)))
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
  return stripTimestampNoise(stripScriptLikeFragments(stripBrokenChars(input)))
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/www\.\S+/gi, '')
    .replace(/mailto:\S+/gi, '')
    .replace(/\([^)]{0,120}(?:https?:\/\/|www\.|mailto:)[^)]*\)/gi, '')
    .replace(/\[[^\]]{1,24}\]/g, '')
    .replace(/[=_]{2,}/g, '')
    .replace(/\s*\([^)]*https?:\/\/[^)]*\)/gi, '')
    .replace(/[|｜]/g, '，')
    .replace(/[#*_`>]/g, '')
    .replace(/[ \t]+/g, '')
    .replace(/\n+/g, '')
    .replace(/[，,]{2,}/g, '，')
    .replace(/[。．]{2,}/g, '。')
    .replace(/^[，,;；:：\-\s]+/, '')
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
  source: cleanSource(typeof item.source === 'string' ? item.source : item.source?.['#text'] || ''),
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

const normalizeComparable = (input: string): string => {
  return input.toLowerCase().replace(/[\s\-_.,，。:：;；!！?？'"“”‘’`~()[\]{}<>|/\\]/g, '');
};

const buildSimilarityTokensFromText = (text: string): Set<string> => {
  const tokens = new Set<string>();
  const base = normalizeComparable(text);

  for (const word of base.match(/[a-z0-9]{3,}/g) || []) {
    tokens.add(word);
  }

  const cjk = (base.match(/[\u4e00-\u9fff]/g) || []).join('');
  for (let i = 0; i <= cjk.length - 3; i += 1) {
    tokens.add(cjk.slice(i, i + 3));
  }

  return tokens;
};

const DEVICE_PATTERNS = [
  /(?:iphone|ipad|macbook|galaxy|pixel|xperia|xiaomi|redmi|huawei|honor|oppo|vivo|iqoo|oneplus|realme|meizu|lenovo|thinkpad|surface)[\s-]*[a-z0-9]+(?:[\s-]*(?:ultra|pro|max|plus|mini|fold|flip|se))*/gi,
  /(?:小米|红米|华为|荣耀|魅族|一加|真我|联想|苹果|三星|OPPO|vivo|iQOO|realme)[A-Za-z0-9]{1,12}(?:Ultra|Pro|Max|Plus|Mini|Fold|Flip|SE)?/gi,
  /\biqoo[\s-]*15[\s-]*ultra\b/gi,
];

const extractDeviceKeysFromText = (text: string): Set<string> => {
  const keys = new Set<string>();
  const compact = text.replace(/\s+/g, '');

  for (const pattern of DEVICE_PATTERNS) {
    for (const hit of text.match(pattern) || []) {
      keys.add(normalizeComparable(hit));
    }
    for (const hit of compact.match(pattern) || []) {
      keys.add(normalizeComparable(hit));
    }
  }

  return keys;
};

const buildSimilarityTokens = (item: NewsItem): Set<string> => {
  return buildSimilarityTokensFromText(`${item.title} ${item.description}`);
};

const extractDeviceKeys = (item: NewsItem): Set<string> => {
  return extractDeviceKeysFromText(`${item.title} ${item.description}`);
};

const jaccard = (a: Set<string>, b: Set<string>): number => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const token of a) {
    if (b.has(token)) inter += 1;
  }
  const union = a.size + b.size - inter;
  return union > 0 ? inter / union : 0;
};

const isHighlySimilar = (
  candidate: NewsItem,
  selected: NewsItem,
  candidateTokens: Set<string>,
  selectedTokens: Set<string>,
  candidateDeviceKeys: Set<string>,
  selectedDeviceKeys: Set<string>,
): boolean => {
  for (const key of candidateDeviceKeys) {
    if (selectedDeviceKeys.has(key)) return true;
  }

  const candTitle = normalizeComparable(candidate.title);
  const selectedTitle = normalizeComparable(selected.title);
  if (
    candTitle.length >= 12 &&
    selectedTitle.length >= 12 &&
    (candTitle.includes(selectedTitle) || selectedTitle.includes(candTitle))
  ) {
    return true;
  }

  return jaccard(candidateTokens, selectedTokens) >= 0.5;
};

const selectDiverseGadgetItems = (rankedItems: NewsItem[], count: number): NewsItem[] => {
  const selected: NewsItem[] = [];
  const tokenMap = new Map<NewsItem, Set<string>>();
  const deviceMap = new Map<NewsItem, Set<string>>();

  for (const item of rankedItems) {
    tokenMap.set(item, buildSimilarityTokens(item));
    deviceMap.set(item, extractDeviceKeys(item));
  }

  for (const candidate of rankedItems) {
    if (selected.length >= count) break;

    const candidateTokens = tokenMap.get(candidate) || new Set<string>();
    const candidateDeviceKeys = deviceMap.get(candidate) || new Set<string>();
    const hasNearDuplicate = selected.some((picked) =>
      isHighlySimilar(
        candidate,
        picked,
        candidateTokens,
        tokenMap.get(picked) || new Set<string>(),
        candidateDeviceKeys,
        deviceMap.get(picked) || new Set<string>(),
      ),
    );

    if (!hasNearDuplicate) {
      selected.push(candidate);
    }
  }

  if (selected.length < count) {
    for (const item of rankedItems) {
      if (selected.length >= count) break;
      if (!selected.includes(item)) selected.push(item);
    }
  }

  return selected.slice(0, count);
};

const isBriefHighlySimilar = (candidate: GadgetBrief, selected: GadgetBrief): boolean => {
  const candidateText = `${candidate.title} ${candidate.summary}`;
  const selectedText = `${selected.title} ${selected.summary}`;

  const candidateDeviceKeys = extractDeviceKeysFromText(candidateText);
  const selectedDeviceKeys = extractDeviceKeysFromText(selectedText);
  for (const key of candidateDeviceKeys) {
    if (selectedDeviceKeys.has(key)) return true;
  }

  const candidateTitle = normalizeComparable(candidate.title);
  const selectedTitle = normalizeComparable(selected.title);
  if (
    candidateTitle.length >= 12 &&
    selectedTitle.length >= 12 &&
    (candidateTitle.includes(selectedTitle) || selectedTitle.includes(candidateTitle))
  ) {
    return true;
  }

  const titleSimilarity = jaccard(
    buildSimilarityTokensFromText(candidate.title),
    buildSimilarityTokensFromText(selected.title),
  );
  if (titleSimilarity >= 0.32) return true;

  const bodySimilarity = jaccard(
    buildSimilarityTokensFromText(candidateText),
    buildSimilarityTokensFromText(selectedText),
  );
  return bodySimilarity >= 0.34;
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
  return import.meta.env.GENERAL_NEWS_RSS_URL || DEFAULT_GENERAL_NEWS_RSS;
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
  const paddingSource = stripLeadingTitleNoise(normalizeSummaryText(body), item.title);

  const aiSummary = await summarizeWithGemini(item.title, body, GADGET_BRIEF_MIN, GADGET_BRIEF_MAX);
  let summary = aiSummary || extractiveSummary(item.title, body, GADGET_BRIEF_MIN, GADGET_BRIEF_MAX);
  summary = cleanupBriefNoise(summary, item.title, item.source || '');
  summary = enforceTextLength(summary, paddingSource, GADGET_BRIEF_MIN, GADGET_BRIEF_MAX);
  summary = cleanupBriefNoise(summary, item.title, item.source || '');
  summary = enforceTextLength(summary, paddingSource, GADGET_BRIEF_MIN, GADGET_BRIEF_MAX);
  summary = cleanupBriefNoise(summary, item.title, item.source || '');

  if (isLikelyCorruptedText(summary)) {
    summary = extractiveSummary(item.title, buildFallbackBriefBody(item, allItems), GADGET_BRIEF_MIN, GADGET_BRIEF_MAX);
    summary = cleanupBriefNoise(summary, item.title, item.source || '');
    summary = enforceTextLength(summary, paddingSource, GADGET_BRIEF_MIN, GADGET_BRIEF_MAX);
    summary = cleanupBriefNoise(summary, item.title, item.source || '');
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
  const headlines = items.slice(0, 8);

  if (!headlines.length) {
    return { headlines: fallbackGeneralItems() };
  }

  return { headlines };
};

export const getGadgetBriefs = async (): Promise<GadgetBriefData> => {
  const items = await parseNewsItems(resolveGadgetRssUrl(), fallbackGadgetItems());
  const ranked = [...items].sort((a, b) => scoreGadgetHeadline(b) - scoreGadgetHeadline(a));

  if (!ranked.length) {
    return { briefs: [toFallbackBrief(0), toFallbackBrief(1), toFallbackBrief(2)] };
  }

  const candidatePool = ranked.slice(0, 10);
  const cache = new Map<string, GadgetBrief>();
  const getCacheKey = (item: NewsItem) => `${item.title}|${item.url}`;
  const getOrBuildBrief = async (item: NewsItem): Promise<GadgetBrief> => {
    const key = getCacheKey(item);
    const cached = cache.get(key);
    if (cached) return cached;
    const built = await buildGadgetBrief(item, ranked);
    cache.set(key, built);
    return built;
  };

  const briefs: GadgetBrief[] = [];
  const preSelected = selectDiverseGadgetItems(candidatePool, Math.min(8, candidatePool.length));
  for (const item of preSelected) {
    const brief = await getOrBuildBrief(item);
    const duplicated = briefs.some((picked) => isBriefHighlySimilar(brief, picked));
    if (!duplicated) {
      briefs.push(brief);
    }
    if (briefs.length >= 3) break;
  }

  if (briefs.length < 3) {
    for (const item of candidatePool) {
      if (briefs.length >= 3) break;
      const brief = await getOrBuildBrief(item);
      if (!briefs.some((picked) => isBriefHighlySimilar(brief, picked))) {
        briefs.push(brief);
      }
    }
  }

  if (briefs.length < 3) {
    for (const item of candidatePool) {
      if (briefs.length >= 3) break;
      const brief = await getOrBuildBrief(item);
      if (!briefs.some((picked) => picked.title === brief.title && picked.source === brief.source)) {
        briefs.push(brief);
      }
    }
  }

  while (briefs.length < 3) {
    briefs.push(toFallbackBrief(briefs.length));
  }

  return { briefs };
};
