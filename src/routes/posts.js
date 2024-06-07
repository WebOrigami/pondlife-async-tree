import { map } from "@weborigami/async-tree";
import data from "../data.js";
import singlePostPage from "../templates/singlePostPage.js";

/**
 * The posts area contains one page for each post.
 */
export default async () => {
  const postData = await data();
  return map(postData, (value, key, tree) => singlePostPage(value, key, tree));
};
