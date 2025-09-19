import { Tree } from "@weborigami/async-tree";
import page from "./page.js";
import postFragment from "./postFragment.js";

// A page showing a single post
export default async (post, key, tree) =>
  page({
    title: post.title,
    body: await Tree.indent`
      ${postFragment(post, key)}
      <p>
        ${
          post.previousKey
            ? await Tree.indent`
          <a class="previous" href="${post.previousKey}">Previous: ${
                (
                  await tree.get(post.previousKey)
                ).title
              }</a>
          &nbsp;
        `
            : ""
        }
        ${
          post.nextKey
            ? await Tree.indent`
            <a class="next" href="${post.nextKey}">Next: ${
                (
                  await tree.get(post.nextKey)
                ).title
              }</a>
          `
            : await Tree.indent`
            <a class="next" href="/">
              Back to home
            </a>
          `
        }
      </p>
    `,
  });
