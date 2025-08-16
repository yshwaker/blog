import { a as getPost } from "../../../../chunks/posts.js";
import { e as error } from "../../../../chunks/index.js";
async function load({ params }) {
  const post = await getPost(params.slug);
  if (!post) {
    throw error(404, "Post not found");
  }
  return {
    post
  };
}
export {
  load
};
