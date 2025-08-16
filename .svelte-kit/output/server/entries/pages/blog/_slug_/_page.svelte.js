import { c as create_ssr_component, e as escape, v as validate_component, f as add_attribute, m as missing_component } from "../../../../chunks/ssr.js";
import dayjs from "dayjs";
const css = {
  code: ".sr-only.svelte-js1prl{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}",
  map: null
};
const VisuallyHidden = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<span class="sr-only svelte-js1prl">${slots.default ? slots.default({}) : ``} </span>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { post } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-13ki4h2_START -->${$$result.title = `<title>${escape(post.title)} - Shio Y. Blog</title>`, ""}<meta name="description"${add_attribute("content", post.summary, 0)}><!-- HEAD_svelte-13ki4h2_END -->`, ""} <div class="py-20"><h2 class="text-4xl md:text-5xl font-bold">${escape(post.title)}</h2></div> <main class="prose max-w-none">${validate_component(post.default || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</main> <p class="text-sm mt-10 text-gray-500 text-right">写于 ${escape(dayjs(post.date).format("YYYY年MM月DD日"))}</p> <div class="mt-20 text-4xl flex justify-end"><div class="group"><button class="group-hover:rotate-90 px-4 py-2 transition-transform" title="回到顶部">𝄇
      ${validate_component(VisuallyHidden, "VisuallyHidden").$$render($$result, {}, {}, {
    default: () => {
      return `回到顶部`;
    }
  })}</button></div></div>`;
});
export {
  Page as default
};
