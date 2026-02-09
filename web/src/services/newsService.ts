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
  body: string;
}

const GOOGLE_NEWS_HOST = 'news.google.com';
const decoder = new GoogleDecoder();

const cleanTitle = (title: string): string => {
  return title
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
  const text = raw
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

  if (body.length < 260) {
    body = buildFallbackFeatureBody(items);
  }

  return {
    title: selected.title,
    source: selected.source || 'Google News',
    pubDate: selected.pubDate,
    url: decodedUrl || selected.url,
    body,
  };
};
