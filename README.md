# Opal Tools

An Opal Tools service that provides a news API integration tool.

## Features

- **get_news**: Fetch latest news articles based on search queries with optional filters

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Add your News API key to `.env`:

   ```env
   NEWS_API_KEY=your_actual_api_key_here
   ```

You can get a free API key from [NewsAPI.org](https://newsapi.org/)

## Development

Run the development server:

```bash
npm run dev
```

The service will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Endpoints

- **Discovery**: `GET http://localhost:3000/discovery` - Lists all available tools
- **Tool Execution**: `POST http://localhost:3000/tools/get_news` - Execute the get_news tool

## Authentication

The `get_news` tool requires callers to supply an authenticated News API
connection via Opal. When Opal invokes your service it includes an `auth`
object in the request body that contains the provider, scope bundle, and the
user's credential. This service enforces that the credential is present before
calling NewsAPI.

For local testing you can mimic the Opal payload by sending both `parameters`
and `auth` fields in the body:

```json
{
  "parameters": { "query": "technology" },
  "auth": {
    "provider": "newsapi",
    "scopeBundle": "articles.read",
    "credentials": {
      "access_token": "dummy-token",
      "customer_id": "local-testing",
      "instance_id": "local",
      "product_sku": "newsapi"
    }
  }
}
```

## Tool: get_news

Fetches news articles from NewsAPI.

### Parameters

- `query` (required): Search query, e.g., "technology"
- `language` (optional): Language code (default: "en")
- `pageSize` (optional): Number of articles per page (default: 5)
- `page` (optional): Page number (default: 1)
- `sortBy` (optional): Sort by "relevancy", "popularity", or "publishedAt" (default: "publishedAt")

### Example Request

```bash
curl -X POST http://localhost:3000/tools/get_news \
  -H "Content-Type: application/json" \
  -d '{
        "parameters": { "query": "technology", "pageSize": 10 },
        "auth": {
          "provider": "newsapi",
          "scopeBundle": "articles.read",
          "credentials": {
            "access_token": "dummy-token",
            "customer_id": "local-testing",
            "instance_id": "local",
            "product_sku": "newsapi"
          }
        }
      }'
```

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.
