import { g as getAllPosts } from "../../chunks/posts.js";
const heptabaseLinks = [
  {
    url: "https://app.heptabase.com/w/305fdc68dcb64ac62b1d8b6dc7eb782ec5235943da4b14a0fe6a3fc4f92651cb",
    date: "2023-11-23",
    title: "探究styled-components的内部实现"
  }
];
async function load() {
  const posts = await getAllPosts();
  return {
    posts,
    heptabaseLinks
  };
}
export {
  load
};
