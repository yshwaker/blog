import { c as create_ssr_component, f as add_attribute } from "./ssr.js";
const metadata = {
  "title": "如何保证同域名下的 router 后退操作",
  "date": "2021-06-26",
  "summary": "如何使用`history.goBack()`并保持页面在相同域名下",
  "updatedOn": "2025-08-16T15:41:37.972Z"
};
const { title, date, summary, updatedOn } = metadata;
const Better_back_button_using_react_router = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p data-svelte-h="svelte-1sqqos3">在做自己的 Side Project 需要每个页面添加类似于 native app 的后退按钮，返回到之前已访问的页面。</p> <img src="/blog-images/nav.png"${add_attribute("width", 852 / 2, 0)}${add_attribute("height", 124 / 2, 0)} alt="导航栏截图" style="margin: 0 auto; display: block;"> <p data-svelte-h="svelte-h777qg">因为使用了 <code>react-router</code>，自然的想法是使用<code>history.goBack()</code>。</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic">import</span><span style="color:#89DDFF"> {</span><span style="color:#BABED8"> useHistory</span><span style="color:#89DDFF"> }</span><span style="color:#89DDFF;font-style:italic"> from</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">react-router-dom</span><span style="color:#89DDFF">'</span><span style="color:#89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA">const</span><span style="color:#BABED8"> App </span><span style="color:#89DDFF">=</span><span style="color:#89DDFF"> ()</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#C792EA">  const</span><span style="color:#BABED8"> history</span><span style="color:#89DDFF"> =</span><span style="color:#82AAFF"> useHistoy</span><span style="color:#F07178">()</span><span style="color:#89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">  return</span><span style="color:#F07178"> (</span></span>
<span class="line"><span style="color:#89DDFF">    &#x3C;</span><span style="color:#F07178">button</span><span style="color:#C792EA"> onClick</span><span style="color:#89DDFF">={()</span><span style="color:#C792EA"> =></span><span style="color:#BABED8"> history</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">goBack</span><span style="color:#BABED8">()</span><span style="color:#89DDFF">}</span></span>
<span class="line"><span style="color:#89DDFF">  )</span></span>
<span class="line"><span style="color:#89DDFF">}</span></span></code></pre>`}<!-- HTML_TAG_END --> <p data-svelte-h="svelte-1rzwi99">Easy！但是在浏览器中这样的问题是：如果用户是从别的页面（比如 google.com）通过链接点击或者地址栏输入我们的页面地址的，此时当点击后退按钮，用户会回到 google.com，这显然不是一个 SPA 多期望的。我们希望用户始终处于我们的 web app 中。</p> <p data-svelte-h="svelte-9bnl1i"><a href="https://stackoverflow.com/questions/34720626/how-to-ensure-that-router-goback-wont-navigate-outside-of-my-app-domain" rel="nofollow">Stackoverflow</a>上的答案并不能解决这一问题，直到我找到这个<a href="https://github.com/ReactTraining/history/issues/582#issuecomment-379271092" rel="nofollow">issue</a>。我们可以通过判断 <code>location</code> 的 <code>key</code> 是否有值来判断当前页面是否是我们 app 的初始页面。</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic">import</span><span style="color:#89DDFF"> {</span><span style="color:#BABED8"> useHistory</span><span style="color:#89DDFF">,</span><span style="color:#BABED8"> useLocation</span><span style="color:#89DDFF"> }</span><span style="color:#89DDFF;font-style:italic"> from</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">react-router-dom</span><span style="color:#89DDFF">'</span><span style="color:#89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA">const</span><span style="color:#BABED8"> App </span><span style="color:#89DDFF">=</span><span style="color:#89DDFF"> ()</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#C792EA">  const</span><span style="color:#BABED8"> history</span><span style="color:#89DDFF"> =</span><span style="color:#82AAFF"> useHistory</span><span style="color:#F07178">()</span><span style="color:#89DDFF">;</span></span>
<span class="line"><span style="color:#C792EA">  const</span><span style="color:#BABED8"> location</span><span style="color:#89DDFF"> =</span><span style="color:#82AAFF"> useLocation</span><span style="color:#F07178">()</span><span style="color:#89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // go back to the previous page</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // fallback to home page if we are on the initial page</span></span>
<span class="line"><span style="color:#C792EA">  const</span><span style="color:#BABED8"> goBack</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> ()</span><span style="color:#C792EA"> =></span><span style="color:#F07178"> (</span><span style="color:#BABED8">location</span><span style="color:#89DDFF">.</span><span style="color:#BABED8">key</span><span style="color:#89DDFF"> ?</span><span style="color:#BABED8"> history</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">goBack</span><span style="color:#F07178">() </span><span style="color:#89DDFF">:</span><span style="color:#BABED8"> history</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">push</span><span style="color:#F07178">(</span><span style="color:#89DDFF">'</span><span style="color:#C3E88D">/</span><span style="color:#89DDFF">'</span><span style="color:#F07178">))</span><span style="color:#89DDFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">  return</span><span style="color:#F07178"> (</span></span>
<span class="line"><span style="color:#89DDFF">    &#x3C;</span><span style="color:#F07178">button</span><span style="color:#C792EA"> onClick</span><span style="color:#89DDFF">={()</span><span style="color:#C792EA"> =></span><span style="color:#BABED8"> history</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">goBack</span><span style="color:#BABED8">()</span><span style="color:#89DDFF">}</span></span>
<span class="line"><span style="color:#89DDFF">  )</span></span>
<span class="line"><span style="color:#89DDFF">}</span></span></code></pre>`}<!-- HTML_TAG_END -->`;
});
export {
  Better_back_button_using_react_router as default,
  metadata
};
