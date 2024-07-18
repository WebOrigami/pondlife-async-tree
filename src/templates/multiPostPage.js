import { Tree, map } from "@weborigami/async-tree";
import siteInfo from "../siteInfo.js";
import page from "./page.js";
import singlePost from "./singlePost.js";

// A page showing multiple posts
export default async (posts) => {
  const postsHtmlTree = await map(posts, singlePost);
  const postsHtml = await Tree.values(postsHtmlTree);
  return page({
    title: siteInfo.title,
    area: "home",
    "@text": `
      <h1>${siteInfo.title}</h1>
      <p>${siteInfo.description}</p>

      ${postsHtml.join("\n")}

      <footer>
        <a href="/feed.xml">RSS feed</a>
        <a href="/feed.json">JSON feed</a>
        <a href="https://github.com/WebOrigami/origami-blog-start">View source</a>
      </footer>
    `,
  });
};
