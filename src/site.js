import { FileTree, map, paginate } from "@weborigami/async-tree";
import jsonFeedToRss from "@weborigami/json-feed-to-rss";
import jsonFeed from "./jsonFeed.js";
import posts from "./posts.js";
import aboutPage from "./templates/aboutPage.js";
import multiPostPage from "./templates/multiPostPage.js";
import singlePostPage from "./templates/singlePostPage.js";

// Group posts into pages of 10
const pages = map(await paginate(posts, 10), {
  extension: "->.html", // Add `.html` to the numeric keys
  value: multiPostPage, // Apply template to the set of 10 posts
});

// Convert posts to a feed object in JSON Feed schema
const feed = await jsonFeed(posts);

//
// This is the primary representation of the site as an object. Some properties
// are async promises for a single result, others are async trees of promises.
//
export default {
  "about.html": aboutPage(),
  assets: new FileTree(new URL("assets", import.meta.url)),
  images: new FileTree(new URL("../images", import.meta.url)),
  "index.html": pages.get("1.html"), // same as first page in pages area
  "feed.json": JSON.stringify(feed, null, 2),
  "feed.xml": jsonFeedToRss(feed),
  pages,
  posts: map(posts, singlePostPage),
};
