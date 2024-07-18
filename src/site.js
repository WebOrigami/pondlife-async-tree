import { invokeFunctions } from "@weborigami/async-tree";
import about from "./routes/about.html.js";
import assets from "./routes/assets.js";
import feedJson from "./routes/feed.json.js";
import feedXml from "./routes/feed.xml.js";
import images from "./routes/images.js";
import indexHtml from "./routes/index.html.js";
import posts from "./routes/posts.js";

/**
 * This is the main entry point for the site.
 *
 * This defines the site's top level routes as a dictionary of module exports.
 * If an export is a function (like `about`), it will be invoked when requested.
 * If the export is an object (like `assets`), it will be returned as is.
 */
export default invokeFunctions({
  "about.html": about,
  assets,
  images,
  "index.html": indexHtml,
  "feed.json": feedJson,
  "feed.xml": feedXml,
  posts,
});
