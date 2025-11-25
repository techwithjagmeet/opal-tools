import {
  ToolsService,
  tool,
  ParameterType,
  type AuthData,
} from "@optimizely-opal/opal-tools-sdk";
import express from "express";
import dotenv from "dotenv";
import { getNews, type NewsParams } from "./get-news.js";


dotenv.config();

const app = express();
app.use(express.json());

const toolsService = new ToolsService(app);
const newsApiKey = process.env.NEWS_API_KEY;

/* ------------------- News API Tool ------------------- */
tool({
  name: "get_news",
  description:
    "Fetch latest news articles based on a search query and optional filters.",
  parameters: [
    {
      name: "query",
      type: ParameterType.String,
      required: true,
      description: "Search query, e.g., 'technology'",
    },
    {
      name: "language",
      type: ParameterType.String,
      required: false,
      description: "Language code (default: en)",
    },
    {
      name: "pageSize",
      type: ParameterType.Number,
      required: false,
      description: "Number of articles per page (default: 5)",
    },
    {
      name: "page",
      type: ParameterType.Number,
      required: false,
      description: "Page number (default: 1)",
    },
    {
      name: "sortBy",
      type: ParameterType.String,
      required: false,
      description:
        "Sort by relevancy, popularity, or publishedAt (default: publishedAt)",
    },
  ],
  authRequirements: {
    provider: "newsapi",
    scopeBundle: "articles.read",
    required: true,
  },
})(async (params: NewsParams, authData?: AuthData) => {
  if (!newsApiKey) {
    throw new Error("NEWS_API_KEY environment variable is not set");
  }

  if (!authData?.credentials?.access_token) {
    throw new Error(
      "Opal must supply a News API credential before this tool can run."
    );
  }

  return await getNews(params, newsApiKey);
});

  /* // Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Opal Tools Service listening on port ${port}`);
    console.log(`Discovery endpoint: http://localhost:${port}/discovery`);
    console.log(`Try calling the tool: POST http://localhost:${port}/tools/get_news with JSON body: { "query": "technology" }`);
}); */

export default app;