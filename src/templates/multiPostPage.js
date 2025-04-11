import { concatTrees, map } from "@weborigami/async-tree";
import siteInfo from "../siteInfo.js";
import page from "./page.js";
import postFragment from "./postFragment.js";

// A page showing multiple posts
export default async ({ items: posts, nextPage, previousPage }) =>
  page({
    title: siteInfo.title,
    area: "home",
    // concatTrees template literal reduces the tree of post fragments to text
    body: await concatTrees`
      <h1>${siteInfo.title}</h1>
      <p>${siteInfo.description}</p>
      ${map(posts, postFragment)}
      <p>
        ${
          nextPage
            ? `
              <a class="next" href="/pages/${nextPage}.html"><strong>Older posts</strong></a>
              <span>&nbsp;</span>
            `
            : ""
        }
        ${
          previousPage
            ? `
              <a class="previous" href="${
                previousPage == 1 ? "/" : `/pages/${previousPage}.html`
              }"><strong>Newer posts</strong></a>
            `
            : ""
        }
       </p>
       <footer>
       <a href="/feed.xml">RSS feed</a>
       <a href="/feed.json">JSON feed</a>
       <a href="https://github.com/WebOrigami/origami-blog-start">View source</a>
      </footer>
    `,
  });
