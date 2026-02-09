import { XMLParser } from 'fast-xml-parser';
import { fetchNews } from '../apis/news';

export interface NewsItem {
  title: string;
  url: string;
  pubDate: string;
}

export interface NewsData {
  headlines: NewsItem[];
}

const cleanTitle = (title: string): string => {
  return title
    .replace(/\s+-\s+[^-]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();
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

const errorNews = (): NewsData => ({
  headlines: [
    { title: '暂无可用资讯，请检查网络连接', url: '', pubDate: '' },
    { title: '请确认 Google News RSS 地址可访问', url: '', pubDate: '' },
    { title: '系统会在下次刷新时自动重试', url: '', pubDate: '' },
    { title: '可在 web/.env 修改 RSS 搜索关键词', url: '', pubDate: '' },
    { title: '建议使用中文科技关键词获取更稳定结果', url: '', pubDate: '' },
    { title: '示例：数码 手机 AI 芯片 可穿戴', url: '', pubDate: '' },
    { title: '保持页面仅展示 headlines 可减少截断', url: '', pubDate: '' },
    { title: '当前页面已按全屏填充排版', url: '', pubDate: '' },
  ],
});

export const getGoogleHeadlines = async (): Promise<NewsData> => {
  let response = '';
  try {
    response = await fetchNews();
  } catch (error) {
    console.error('news fetch error:', error);
    return errorNews();
  }

  const parser = new XMLParser();
  const xml = parser.parse(response);
  const rawItems = xml?.rss?.channel?.item;

  if (!rawItems) {
    return errorNews();
  }

  const items = (Array.isArray(rawItems) ? rawItems : [rawItems])
    .slice(0, 16)
    .map((item: { title?: string; link?: string; pubDate?: string }) => ({
      title: cleanTitle(item.title || 'N/A'),
      url: sanitizeLink(item.link || ''),
      pubDate: item.pubDate || '',
    }));

  const headlines = items.slice(0, 8);

  if (!headlines.length) {
    return errorNews();
  }

  return { headlines };
};
