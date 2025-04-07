interface Coordinates {
  lat: number;
  lon: number;
}

interface Position {
  city: string;
  coordinates: Coordinates;
}

export class OpenWeatherService {
  private apiKey: string;
  private apiUrl = 'https://api.openweathermap.org';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, params: Record<string, any>): Promise<any> {
    const searhParams = new URLSearchParams();
    searhParams.append('appid', this.apiKey);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searhParams.append(key, value.toString());
      }
    });

    const url = `${this.apiUrl}/${endpoint}?${searhParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    return response.json();
  };

  async getPosition(query: string): Promise<Position> {
    const [data] = await this.makeRequest('geo/1.0/direct', { q: query, limit: 1 });

    return {
      city: data.name,
      coordinates: {
        lat: data.lat,
        lon: data.lon,
      },
    };
  }

  async getWeather(coordinates: Coordinates): Promise<any> {
    return this.makeRequest('data/2.5/weather', {
      ...coordinates,
      units: 'metric',
    });
  }

  async getForecast(coordinates: Coordinates): Promise<any> {
    return this.makeRequest('data/2.5/forecast', {
      ...coordinates,
      units: 'metric',
    });
  }
}
