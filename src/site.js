import {
  extensionKeyFunctions,
  FileTree,
  map,
  paginate,
} from "@weborigami/async-tree";
import jsonFeedToRss from "@weborigami/json-feed-to-rss";
import jsonFeed from "./jsonFeed.js";
import posts from "./posts.js";
import aboutPage from "./templates/aboutPage.js";
import multiPostPage from "./templates/multiPostPage.js";
import singlePostPage from "./templates/singlePostPage.js";

// Group posts into pages of 10
const pages = map(await paginate(posts, 10), {
  ...extensionKeyFunctions("", ".html"), // Add `.html` to keys
  value: multiPostPage,
});

// Convert posts to a feed object in JSON Feed schema
const feed = await jsonFeed(posts);

//
// This is the primary representation of the site as an object, some of whose
// properties are async promise for a single result, and others of which are
// async trees of promises.
//
export default {
  "about.html": aboutPage(),
  assets: new FileTree(new URL("../src/assets", import.meta.url)),
  images: new FileTree(new URL("../images", import.meta.url)),
  "index.html": pages.get("1.html"), // same as first page in pages area
  "feed.json": JSON.stringify(feed, null, 2),
  "feed.xml": jsonFeedToRss(feed),
  pages,
  posts: map(posts, (value, key, tree) => singlePostPage(value, key, tree)),
};
