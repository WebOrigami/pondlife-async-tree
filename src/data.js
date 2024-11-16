import { map, pipeline, reverse } from "@weborigami/async-tree";
import { addNextPrevious, mdHandler, mdHtml } from "@weborigami/origami";
import buffers from "./markdown.js";

/**
 * This pipeline processes the collection of Buffer objects representing the
 * markdown files to a set of data objects that are ready for rendering by
 * templates.
 */
export default await pipeline(
  // Pipeline starts with buffers holding markdown.
  buffers,

  // Convert the markdown buffers to objects with a `title` property and a
  // `@text` property that contains the markdown text.
  (_) => map(_, mdHandler.unpack),

  // Change the keys from `.md` names to `.html` names, and the `@text`
  // properties from markdown to HTML.
  (_) => map(_, mdHtml),

  // Add a `date` field parsed from the filename.
  (_) =>
    map(_, (post, fileName) => ({
      ...post,
      date: parseDate(fileName),
    })),

  // Add `nextKey`/`previousKey` properties so the post pages can be linked.
  // The posts are already in chronological order because their names start
  // with a YYYY-MM-DD date, so we can determine the next and previous posts
  // by looking at the adjacent posts in the list. We need to do this before
  // reversing the order in the next step; we want "next" to mean the next
  // post in chronological order, not display order.
  (withDate) => addNextPrevious.call(null, withDate),

  // Finally, reverse to get posts in reverse chronological order.
  reverse
);

// Parse a YYYY-MM-DD date from the start of the text.
function parseDate(text) {
  const match = text.match(/^(?<date>\d\d\d\d-\d\d-\d\d)/);
  // Dates will end up in GMT, so we shift the date to the desired time zone.
  // This sample content uses noon in U.S. Eastern Time, which is UTC minus 5
  // hours. See https://en.wikipedia.org/wiki/List_of_UTC_offsets for a list of
  // UTC offsets; replace with the time zone you want for your posts.
  return new Date(`${match.groups.date}T12:00-05:00`);
}
