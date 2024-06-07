import { map } from "@weborigami/async-tree";
import data from "../data.js";
import singlePostPage from "../templates/singlePostPage.js";

export default async () => {
  const postData = await data();
  return map(postData, (value, key, tree) => singlePostPage(value, key, tree));
};
