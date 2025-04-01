import { FileTree, map } from "@weborigami/async-tree";
import { rss } from "@weborigami/origami";
import data from "./data.js";
import jsonFeed from "./jsonFeed.js";
import aboutPage from "./templates/aboutPage.js";
import multiPostPage from "./templates/multiPostPage.js";
import singlePostPage from "./templates/singlePostPage.js";

const feed = await jsonFeed(data);

/**
 * This is the main entry point for the site.
 */
export default {
  "about.html": aboutPage(),
  assets: new FileTree(new URL("../src/assets", import.meta.url)),
  images: new FileTree(new URL("../images", import.meta.url)),
  "index.html": multiPostPage(data),
  "feed.json": JSON.stringify(feed, null, 2),
  "feed.xml": rss.call(null, feed),
  posts: map(data, (value, key, tree) => singlePostPage(value, key, tree)),
};
