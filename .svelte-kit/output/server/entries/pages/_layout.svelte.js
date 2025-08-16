import { c as create_ssr_component } from "../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1ff9oqu_START -->${$$result.title = `<title>Shio Y. Blog</title>`, ""}<meta name="description" content="Personal blog of Shio Y."><!-- HEAD_svelte-1ff9oqu_END -->`, ""} <div class="font-sans max-w-3xl mx-5vw md:mx-auto py-8"><h1 class="font-lora text-xl" data-svelte-h="svelte-124as08"><a href="/" class="text-gray-700 hover:text-black">Shio Y. Blog</a></h1> ${slots.default ? slots.default({}) : ``} <footer class="mt-28 text-gray-500" data-svelte-h="svelte-155sm72">All rights reserved © Shio Y. 2023</footer></div>`;
});
export {
  Layout as default
};
