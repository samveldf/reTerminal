const buildWeatherUrl = (): string => {
  const lat = import.meta.env.OWM_LAT;
  const lon = import.meta.env.OWM_LON;
  const apiKey = import.meta.env.OWM_API_KEY;

  if (!lat || !lon || !apiKey) {
    throw new Error('OWM_API_KEY / OWM_LAT / OWM_LON are required');
  }

  // Use free 5-day/3-hour forecast endpoint to avoid One Call subscription requirements.
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;
};

export interface OwmForecastEntry {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{ icon: string; description: string }>;
}

export interface OwmForecastResponse {
  cod: string;
  list: OwmForecastEntry[];
  city?: {
    sunrise?: number;
    sunset?: number;
    timezone?: number;
  };
}

export const fetchWeather = async (): Promise<OwmForecastResponse> => {
  const response = await fetch(buildWeatherUrl());
  if (!response.ok) {
    throw new Error(`Failed to fetch weather: ${response.status}`);
  }

  const data = (await response.json()) as OwmForecastResponse;
  if (!data?.list?.length) {
    throw new Error('Forecast list is empty');
  }

  return data;
};
