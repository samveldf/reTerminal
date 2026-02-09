import dayjs from 'dayjs';
import { fetchWeather, type OwmForecastEntry } from '../apis/weather';

export interface WeatherDay {
  label: string;
  date: string;
  icon: string;
  symbol: string;
  description: string;
  minTemp: string;
  maxTemp: string;
  humidity: string;
}

export interface WeatherData {
  cityLabel: string;
  days: WeatherDay[];
}

const iconToSymbol = (icon: string): string => {
  const code = icon.slice(0, 2);
  if (code === '01') return 'SUN';
  if (code === '02') return 'PARTLY';
  if (code === '03' || code === '04') return 'CLOUD';
  if (code === '09' || code === '10') return 'RAIN';
  if (code === '11') return 'STORM';
  if (code === '13') return 'SNOW';
  if (code === '50') return 'MIST';
  return 'N/A';
};

const iconToEmoji = (icon: string): string => {
  const code = icon.slice(0, 2);
  if (code === '01') return '☀';
  if (code === '02') return '⛅';
  if (code === '03' || code === '04') return '☁';
  if (code === '09' || code === '10') return '☂';
  if (code === '11') return '⚡';
  if (code === '13') return '❄';
  if (code === '50') return '🌫';
  return '○';
};

const dayLabel = (index: number): string => {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  if (index === 2) return 'Day +2';
  if (index === 3) return 'Day +3';
  return `Day +${index}`;
};

const errorData = (): WeatherData => ({
  cityLabel: import.meta.env.WEATHER_CITY_LABEL || 'Tokyo',
  days: Array.from({ length: 4 }, (_, i) => ({
    label: dayLabel(i),
    date: dayjs().add(i, 'day').format('MM/DD'),
    icon: '○',
    symbol: 'N/A',
    description: 'N/A',
    minTemp: '--',
    maxTemp: '--',
    humidity: '--',
  })),
});

const summarizeDay = (entries: OwmForecastEntry[], index: number): WeatherDay => {
  const date = dayjs.unix(entries[0].dt).format('MM/DD');
  const minTemp = Math.min(...entries.map((entry) => entry.main.temp_min));
  const maxTemp = Math.max(...entries.map((entry) => entry.main.temp_max));
  const humidity =
    entries.reduce((sum, entry) => sum + entry.main.humidity, 0) / (entries.length || 1);

  const middle = entries[Math.floor(entries.length / 2)] || entries[0];
  const weather = middle.weather?.[0] || { icon: '', description: 'N/A' };

  return {
    label: dayLabel(index),
    date,
    icon: iconToEmoji(weather.icon),
    symbol: iconToSymbol(weather.icon),
    description: weather.description,
    minTemp: Math.round(minTemp).toString(),
    maxTemp: Math.round(maxTemp).toString(),
    humidity: Math.round(humidity).toString(),
  };
};

export const getWeather = async (): Promise<WeatherData> => {
  try {
    const response = await fetchWeather();
    const cityLabel = import.meta.env.WEATHER_CITY_LABEL || 'Tokyo';

    const dayMap = new Map<string, OwmForecastEntry[]>();
    for (const entry of response.list) {
      const key = dayjs.unix(entry.dt).format('YYYY-MM-DD');
      const list = dayMap.get(key) || [];
      list.push(entry);
      dayMap.set(key, list);
    }

    const dayEntries = Array.from(dayMap.entries())
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .slice(0, 4)
      .map(([, entries], index) => summarizeDay(entries, index));

    while (dayEntries.length < 4) {
      const i = dayEntries.length;
      dayEntries.push({
        label: dayLabel(i),
        date: dayjs().add(i, 'day').format('MM/DD'),
        icon: '○',
        symbol: 'N/A',
        description: 'N/A',
        minTemp: '--',
        maxTemp: '--',
        humidity: '--',
      });
    }

    return {
      cityLabel,
      days: dayEntries,
    };
  } catch (error) {
    console.error('weather error:', error);
    return errorData();
  }
};
