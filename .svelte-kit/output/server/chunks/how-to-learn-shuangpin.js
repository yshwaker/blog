import { c as create_ssr_component, f as add_attribute } from "./ssr.js";
const metadata = {
  "title": "如何学习双拼（一图流）",
  "date": "2021-05-02",
  "summary": "A swift and brutal way",
  "updatedOn": "2025-08-16T15:41:37.973Z"
};
const { title, date, summary, updatedOn } = metadata;
const How_to_learn_shuangpin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p data-svelte-h="svelte-onahg4">学习双拼已逾半年。当初学习双拼时也是在网上查找了各种学习方法，亲测对我来说最有效的方式就是将韵母和键位字母对应的表做成便利贴，贴在显示器或者笔记本上。在平时的日常电脑使用中，使用双拼作为输入方式。</p> <p data-svelte-h="svelte-tatwma">刚开始不需要有任何负担，也不需要提前背诵。每当遇到不会打的字，就查便利贴上的对照表。这样反复几次，使用频率最高的几个韵母很快就能记住，然后慢慢扩展到不常用的。对我来说我最不常用的韵母应该是「iong」。如果一上来就背这些不常用的韵母很容易就会遗忘，得不偿失。</p> <p data-svelte-h="svelte-gian9">小鹤双拼韵母表：</p> <img src="/blog-images/post-it.jpg"${add_attribute("width", 640, 0)}${add_attribute("height", 480, 0)} alt="post-it" style="margin: 0 auto; display: block;">`;
});
export {
  How_to_learn_shuangpin as default,
  metadata
};
