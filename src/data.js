import {
  addNextPrevious,
  extensionKeyFunctions,
  FileTree,
  map,
  reverse,
} from "@weborigami/async-tree";
import { marked } from "marked";
import markdownDocument from "./markdownDocument.js";
import parseDate from "./parseDate.js";

/**
 * This pipeline reads in a collection of Buffer objects representing the
 * markdown files, applies a number of transformations, and produces a
 * reverse-chronological ordered collection of document objects ready for
 * rendering in various forms.
 */

// Start with all the markdown files as a tree of Buffers
const buffers = new FileTree(new URL("../markdown", import.meta.url));

// Convert the markdown buffers to objects with a `title` property and a `body`
// property that contains the markdown text.
const markdownDocuments = await map(buffers, markdownDocument);

// Transform and add properties
const htmlDocuments = await map(markdownDocuments, {
  // Change the keys from `.md` names to `.html` names
  ...extensionKeyFunctions(".md", ".html"),
  value: (post, key) => ({
    ...post,
    // Parse date from filename
    date: parseDate(key),
    // Transform the body from markdown to HTML
    body: marked(post.body),
  }),
});

// Add `nextKey`/`previousKey` properties so the post pages can be linked.
// The posts are already in chronological order because their names start
// with a YYYY-MM-DD date, so we can determine the next and previous posts
// by looking at the adjacent posts in the list. We need to do this before
// reversing the order in the next step; we want "next" to mean the next
// post in chronological order, not display order.
const crossLinked = await addNextPrevious(htmlDocuments);

// Finally, reverse to get posts in reverse chronological order.
const reversed = reverse(crossLinked);

export default reversed;
