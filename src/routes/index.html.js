import data from "../data.js";
import multiPostPage from "../templates/multiPostPage.js";

/**
 * Generate the index page.
 */
export default async () => {
  const posts = await data();
  return multiPostPage(posts);
};
