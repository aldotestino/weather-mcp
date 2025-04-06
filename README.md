# 🌤️ Weather MCP

*Weather MCP* is a modular, MCP-compatible service that delivers real-time weather and geolocation data using the OpenWeather API. Built with the Model Context Protocol (MCP) SDK, it’s designed for seamless integration with AI-native environments like Claude Desktop and Ollama (with Qwen 2.5), enabling context-aware applications to access live weather insights effortlessly.

## 🚀 Prerequisites

Before getting started, make sure the following tools are installed on your system:

- 📦 [Node.js](https://nodejs.org/)
- 🔁 [pnpm](https://pnpm.io/)
- 🛠️ [Go](https://go.dev/) (required for `mcphost` with Ollama + Qwen 2.5)

## ⚙️ Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/aldotestino/weather-mcp.git
cd weather-mcp
```

### 2. Install Dependencies

Install all necessary packages using `pnpm`:

```
pnpm install
```

### 3. 🔐 Add Your OpenWeather API Key

Weather MCP requires a valid [OpenWeather API key](https://openweathermap.org/api). To configure it:

1. Create a `.env` file at the root of the project.
2. Add the following line:

```
OPENWEATHER_API_KEY=your_api_key_here
```

> 💡 Tip: Use the provided `.env.example` file as a template.

### 4. Build the Project

Compile the TypeScript source code:

```
pnpm run build
```

## 🧠 Integration with Claude Desktop

### 1. Locate Your Configuration File

- **macOS**

```
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

- **Windows**

```
code $env:AppData\Claude\claude_desktop_config.json
```

### 2. Register the Weather MCP Server

Add or modify the `"mcpServers"` section like so:

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": [
        "/absolute/path/to/weather-mcp/build/index.js"
      ]
    }
  }
}
```

> 📁 Replace `/absolute/path/to/...` with the actual path to your local project directory.

### 3. Restart Claude Desktop

Save the file and restart Claude Desktop for changes to take effect.

## 🤖 Integration with Ollama + Qwen 2.5

### 1. Install MCP Host

```
go install github.com/mark3labs/mcphost@latest
```

### 2. Start the MCP Host

Run the server with your local config:

```
mcphost -m ollama:qwen2.5 --config "./local.mcp.config.json"
```
