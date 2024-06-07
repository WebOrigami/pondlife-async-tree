import { mapFn, pipeline, reverse } from "@weborigami/async-tree";
import { addNextPrevious, mdHandler, mdHtml } from "@weborigami/origami";
import buffers from "./markdown.js";

export default async () =>
  pipeline(
    // Pipeline starts with strings/buffers holding markdown.
    buffers,

    // Convert the markdown buffers to objects with a markdown `@text` property.
    mapFn(mdHandler.unpack),

    // Convert the markdown to HTML, changing the extension from `md` to `html`.
    mapFn(mdHtml),

    // Add a `date` field parsed from the filename.
    mapFn((post, fileName) => ({
      ...post,
      date: parseDate(fileName),
    })),

    // Add next/previous keys. The posts are already in chronological order
    // because their names start with a YYYY-MM-DD date, so we can determine the
    // next and previous posts by looking at the adjacent posts in the list. We
    // need to do this before reversing the order in the next step; we want
    // "next" to go to the next post in chronological order, not display order.
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
