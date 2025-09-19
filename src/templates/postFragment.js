import { Tree } from "@weborigami/async-tree";

// A single blog post, on its own or in a list
export default async (post, key) => Tree.indent`
  <section>
    <a href="/posts/${key}">
      <h2>${post.title}</h2>
    </a>
    ${post.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
    ${post.body}
  </section>
`;
