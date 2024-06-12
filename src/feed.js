import { Tree, map } from "@weborigami/async-tree";
import data from "./data.js";
import siteInfo from "./siteInfo.js";

/**
 * Generate an object representing the feed in JSON Feed format.
 */
export default async () => {
  const itemTree = map(data, (post, slug) => ({
    content_html: post["@text"],
    date_published: post.date,
    id: `${siteInfo.url}/posts/${slug}`,
    title: post.title,
    url: `${siteInfo.url}/posts/${slug}`,
  }));
  const items = await Tree.values(itemTree);

  return {
    version: "https://jsonfeed.org/version/1.1",
    title: siteInfo.title,
    description: siteInfo.description,
    feed_url: `${siteInfo.url}/feed.json`,
    home_page_url: siteInfo.url,
    items,
  };
};
