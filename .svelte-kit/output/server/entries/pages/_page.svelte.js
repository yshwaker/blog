import { c as create_ssr_component, d as each, e as escape, f as add_attribute } from "../../chunks/ssr.js";
import dayjs from "dayjs";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { posts, heptabaseLinks } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1yz89e6_START -->${$$result.title = `<title>Shio Y. Blog</title>`, ""}<meta name="description" content="Personal Blog by ShioY"><!-- HEAD_svelte-1yz89e6_END -->`, ""} <main><h2 class="text-5xl text-shadow shadow-gray-400 font-bold text-gray-800 py-16" data-svelte-h="svelte-g9hy6r">Post</h2> <div class="space-y-12">${each(posts, (post) => {
    return `<a href="${"/blog/" + escape(post.slug, true)}" class="group block"><h3><span class="text-2xl font-bold text-gray-600 bg-clip-text transition duration-1000 group-hover:text-opacity-0 group-hover:duration-100 bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500">${escape(post.title)} </span></h3> <p class="text-sm text-gray-600">${escape(dayjs(post.date).format("YYYY年MM月DD日"))}</p> <p class="text-gray-500">${escape(post.summary)}</p> </a>`;
  })}</div> <h2 class="text-5xl text-shadow shadow-gray-400 font-bold text-gray-800 py-16" data-svelte-h="svelte-1cehgql">Note</h2> <div class="space-y-12">${each(heptabaseLinks, (note) => {
    return `<a${add_attribute("href", note.url, 0)} class="group block"><h3><span class="text-2xl font-bold text-gray-600 bg-clip-text transition duration-1000 group-hover:text-opacity-0 group-hover:duration-100 bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500">${escape(note.title)} </span></h3> <p class="text-sm text-gray-600">${escape(dayjs(note.date).format("YYYY年MM月DD日"))}</p> </a>`;
  })}</div></main>`;
});
export {
  Page as default
};
