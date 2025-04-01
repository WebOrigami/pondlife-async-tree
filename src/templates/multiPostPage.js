import { Tree, map } from "@weborigami/async-tree";
import siteInfo from "../siteInfo.js";
import page from "./page.js";
import postFragment from "./postFragment.js";

// A page showing multiple posts
export default async (posts) => {
  const postFragmentsTree = await map(posts, postFragment);
  const postFragments = await Tree.values(postFragmentsTree);
  return page({
    title: siteInfo.title,
    area: "home",
    body: `
      <h1>${siteInfo.title}</h1>
      <p>${siteInfo.description}</p>
      ${postFragments.join("\n")}
      <footer>
        <a href="/feed.xml">RSS feed</a>
        <a href="/feed.json">JSON feed</a>
        <a href="https://github.com/WebOrigami/origami-blog-start">View source</a>
      </footer>
    `,
  });
};
