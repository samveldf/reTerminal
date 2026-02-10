export const DEFAULT_GENERAL_NEWS_RSS = 'https://news.google.com/rss?hl=zh-CN&gl=CN&ceid=CN:zh-Hans';
export const DEFAULT_GADGET_NEWS_RSS =
  'https://news.google.com/rss/search?q=(gadget%20OR%20%E6%95%B0%E7%A0%81%20OR%20%E6%99%BA%E8%83%BD%E7%A1%AC%E4%BB%B6%20OR%20%E6%89%8B%E6%9C%BA)%20when:7d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans';

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
