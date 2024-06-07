import data from "../data.js";
import multiPostPage from "../templates/multiPostPage.js";

export default async () => {
  const posts = await data();
  return multiPostPage(posts);
};
