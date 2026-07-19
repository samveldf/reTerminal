export const DEFAULT_GENERAL_NEWS_RSS =
  'https://news.google.com/rss?hl=zh-CN&gl=CN&ceid=CN:zh-Hans';
export const DEFAULT_GENERAL_NEWS_FEEDS = [
  { topic: 'general', url: DEFAULT_GENERAL_NEWS_RSS },
  {
    topic: 'world',
    url: 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
  },
  {
    topic: 'business',
    url: 'https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
  },
  {
    topic: 'science',
    url: 'https://news.google.com/rss/headlines/section/topic/SCIENCE?hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
  },
  {
    topic: 'health',
    url: 'https://news.google.com/rss/headlines/section/topic/HEALTH?hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
  },
  {
    topic: 'culture',
    url: 'https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
  },
  {
    topic: 'sports',
    url: 'https://news.google.com/rss/headlines/section/topic/SPORTS?hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
  },
] as const;
export const DEFAULT_GADGET_NEWS_RSS =
  'https://news.google.com/rss/search?q=(gadget%20OR%20%E6%95%B0%E7%A0%81%20OR%20%E6%99%BA%E8%83%BD%E7%A1%AC%E4%BB%B6)%20when:7d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans';
export const DEFAULT_GADGET_NEWS_FEEDS = [
  DEFAULT_GADGET_NEWS_RSS,
  'https://news.google.com/rss/search?q=(%E7%9B%B8%E6%9C%BA%20OR%20%E6%91%84%E5%BD%B1%E5%99%A8%E6%9D%90%20OR%20%E6%97%A0%E4%BA%BA%E6%9C%BA)%20when:7d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
  'https://news.google.com/rss/search?q=(AI%E7%A1%AC%E4%BB%B6%20OR%20%E6%9C%BA%E5%99%A8%E4%BA%BA%20OR%20%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85%20OR%20%E5%8F%AF%E7%A9%BF%E6%88%B4)%20when:7d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
  'https://news.google.com/rss/search?q=(%E6%B8%B8%E6%88%8F%E4%B8%BB%E6%9C%BA%20OR%20%E6%8E%8C%E6%9C%BA%20OR%20%E7%AC%94%E8%AE%B0%E6%9C%AC%20OR%20%E8%80%B3%E6%9C%BA)%20when:7d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
] as const;

export const fetchNews = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'reterminal-weather-news/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }

  return await response.text();
};
