import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { OpenWeatherService } from './OpenWeatherService';
import 'dotenv/config';

const server = new McpServer({
  name: 'Weather',
  version: '0.0.1',
});

const ows = new OpenWeatherService(process.env.OPENWEATHER_API_KEY!);

server.tool('position', {
  query: z.string(),
}, async ({ query }) => {
  const position = await ows.getPosition(query);

  return {
    content: [{
      type: 'text',
      text: JSON.stringify(position, null, 2),
    }],
  };
});

server.tool('weather', {
  lat: z.number(),
  lon: z.number(),
}, async ({ lat, lon }) => {
  const weather = await ows.getWeather({ lat, lon });

  return {
    content: [{
      type: 'text',
      text: JSON.stringify(weather, null, 2),
    }],
  };
});

server.tool('forecast', {
  lat: z.number(),
  lon: z.number(),
}, async ({ lat, lon }) => {
  const forecast = await ows.getForecast({ lat, lon });

  return {
    content: [{
      type: 'text',
      text: JSON.stringify(forecast, null, 2),
    }],
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Weather MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
