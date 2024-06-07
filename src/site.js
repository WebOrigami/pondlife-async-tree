import { invokeFunctions } from "@weborigami/async-tree";
import about from "./routes/about.html.js";
import assets from "./routes/assets.js";
import feedJson from "./routes/feed.json.js";
import images from "./routes/images.js";
import indexHtml from "./routes/index.html.js";
import posts from "./routes/posts.js";
import rssXml from "./routes/rss.xml.js";

export default invokeFunctions({
  "about.html": about,
  assets,
  images,
  "index.html": indexHtml,
  "feed.json": feedJson,
  posts,
  "rss.xml": rssXml,
});
