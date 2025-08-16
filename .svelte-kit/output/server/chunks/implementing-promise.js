import { c as create_ssr_component } from "./ssr.js";
const metadata = {
  "title": "从 0 实现一个 Promise",
  "date": "2022-07-29",
  "summary": "Learn to implement a Promise from scratch",
  "updatedOn": "2025-08-16T15:41:37.974Z"
};
const { title, date, summary, updatedOn } = metadata;
const Implementing_promise = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p data-svelte-h="svelte-h3vlnz">本文旨在通过实现一个 Promise 类来深入理解 Promise 的运行机制，虽然会提到一些 Promise 的基本概念，但最好先有一定了解， 可通过 MDN 进行查询</p> <h2 data-svelte-h="svelte-31ld0y">术语</h2> <p data-svelte-h="svelte-1dto5ck">由于对 Reolve、Fulfill、Reject 之类的术语并没有十分统一的中文译名，本文将保留其英文名</p> <h2 data-svelte-h="svelte-a9rsyl">Promise 的本质是一个状态机</h2> <p data-svelte-h="svelte-1oxcamp">Promise 总共具有三个状态：Pending、Fulfilled、Rejected。在创建 Promise 对象时，会传入一个由开发者定义的函数 fn。开发者在其中自由的编写业务逻辑，可以是文件读取、网络请求，并通过调用 fn 的两个参数来控制 Promise 改变状态的实际。 Promise 本质就是一个这样的辅助工具，让开发者专注于业务逻辑。</p> <p data-svelte-h="svelte-1b3xvpa">我们可以在 Chrome Devtool 中 print promise 对象来查看它当前的状态和终值（Eventual Value）</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#FFCB6B">Promise</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">resolve</span><span style="color:#BABED8">(</span><span style="color:#F78C6C">1</span><span style="color:#BABED8">)</span></span>
<span class="line"><span style="color:#89DDFF">></span><span style="color:#FFCB6B"> Promise</span><span style="color:#89DDFF"> {&#x3C;</span><span style="color:#F07178">fulfilled</span><span style="color:#89DDFF">></span><span style="color:#BABED8">: 1}</span></span></code></pre>`}<!-- HTML_TAG_END --> <p data-svelte-h="svelte-5wxr15">所以实现 Promise 第一步就是实现一个状态机，定义这些状态，与转换状态的方法</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#C792EA">class</span><span style="color:#FFCB6B"> MyPromise</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#F07178">  #state</span></span>
<span class="line"><span style="color:#BABED8">  #val </span><span style="color:#676E95;font-style:italic">// promise</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA">  constructor</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">fn</span><span style="color:#89DDFF">)</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">pending</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">val</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF">    fn</span><span style="color:#F07178">(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#fulfill</span><span style="color:#89DDFF">,</span><span style="color:#89DDFF"> this.</span><span style="color:#BABED8">#reject</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178">  #fulfill</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">value</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">fulfilled</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">val</span><span style="color:#89DDFF"> =</span><span style="color:#BABED8"> value</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178">  #reject</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">value</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">rejected</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">val</span><span style="color:#89DDFF"> =</span><span style="color:#BABED8"> value</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"><span style="color:#89DDFF">}</span></span></code></pre>`}<!-- HTML_TAG_END --> <h2 data-svelte-h="svelte-ljuwsl"><code>.then</code> 函数</h2> <p data-svelte-h="svelte-112nglp">Promise 允许开发者在任意时间添加对 Promise 状态改变的监听，通过调用<code>.then(onFullfilled, OnRejected)</code>并传入两个回调函数实现。</p> <p data-svelte-h="svelte-1vlfnz8">注意开发者可多次调用<code>.then()</code>函数，如：</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#C792EA">const</span><span style="color:#BABED8"> p </span><span style="color:#89DDFF">=</span><span style="color:#FFCB6B"> Promise</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">resolve</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">'</span><span style="color:#C3E88D">resolved</span><span style="color:#89DDFF">'</span><span style="color:#BABED8">)</span></span>
<span class="line"><span style="color:#BABED8">p</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">then</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">v</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#BABED8"> console</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">log</span><span style="color:#BABED8">(v))</span></span>
<span class="line"><span style="color:#BABED8">p</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">then</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">v</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#BABED8"> console</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">log</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">'</span><span style="color:#C3E88D">Yeah!</span><span style="color:#89DDFF">'</span><span style="color:#BABED8">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF">></span><span style="color:#BABED8"> resolved</span></span>
<span class="line"><span style="color:#89DDFF">></span><span style="color:#BABED8"> Yeah</span><span style="color:#89DDFF">!</span></span></code></pre>`}<!-- HTML_TAG_END --> <p data-svelte-h="svelte-749p91">因此我们需要就这些 Handler 一次存储起来，在状态改变时依次调用。</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic">// mark</span></span>
<span class="line"><span style="color:#C792EA">function</span><span style="color:#82AAFF"> addToTaskQueue</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">fn</span><span style="color:#89DDFF">)</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // mark</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // link[11:14] https://zh.javascript.info/microtask-queue</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // 模拟浏览器微任务</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // mark</span></span>
<span class="line"><span style="color:#82AAFF">  setTimeout</span><span style="color:#F07178">(</span><span style="color:#BABED8">fn</span><span style="color:#89DDFF">,</span><span style="color:#F78C6C"> 0</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // mark</span></span>
<span class="line"><span style="color:#89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA">class</span><span style="color:#FFCB6B"> MyPromise</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#F07178">  #state</span></span>
<span class="line"><span style="color:#BABED8">  #value </span><span style="color:#676E95;font-style:italic">// promise</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // mark</span></span>
<span class="line"><span style="color:#F07178">  #handlers</span><span style="color:#89DDFF"> =</span><span style="color:#BABED8"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA">  constructor</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">fn</span><span style="color:#89DDFF">)</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">pending</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#value</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF">    fn</span><span style="color:#F07178">(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#fulfill</span><span style="color:#89DDFF">,</span><span style="color:#89DDFF"> this.</span><span style="color:#BABED8">#reject</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178">  #fulfill</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">value</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">fulfilled</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#value</span><span style="color:#89DDFF"> =</span><span style="color:#BABED8"> value</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF">.</span><span style="color:#F07178">forEach(</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">handler</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#BABED8">      handler</span><span style="color:#89DDFF">.</span><span style="color:#F07178">onFulfilled(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#val</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#89DDFF">    }</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> null</span><span style="color:#676E95;font-style:italic"> // garbage collecting</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178">  #reject</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">value</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">rejected</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#value</span><span style="color:#89DDFF"> =</span><span style="color:#BABED8"> value</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF">.</span><span style="color:#F07178">forEach(</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">handler</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#BABED8">      handler</span><span style="color:#89DDFF">.</span><span style="color:#F07178">onRejected(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#val</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#89DDFF">    }</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> null</span><span style="color:#676E95;font-style:italic"> // garbage collecting</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // mark</span></span>
<span class="line"><span style="color:#F07178">  then</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">onFulfilled</span><span style="color:#89DDFF">,</span><span style="color:#BABED8;font-style:italic"> onRejected</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#F07178">    addToTaskQueue(</span><span style="color:#89DDFF">()</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">      if</span><span style="color:#F07178"> (</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> ===</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">pending</span><span style="color:#89DDFF">'</span><span style="color:#F07178">) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">        // mark</span></span>
<span class="line"><span style="color:#89DDFF">        this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF">.</span><span style="color:#F07178">push(</span><span style="color:#89DDFF">{</span><span style="color:#BABED8"> onFulfilled</span><span style="color:#89DDFF">,</span><span style="color:#BABED8"> onRejected</span><span style="color:#89DDFF"> }</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">        // mark</span></span>
<span class="line"><span style="color:#89DDFF">      }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">      if</span><span style="color:#F07178"> (</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> ===</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">fulfilled</span><span style="color:#89DDFF">'</span><span style="color:#F07178">) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">        // mark</span></span>
<span class="line"><span style="color:#F07178">        onFulfilled(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#value</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">        // mark</span></span>
<span class="line"><span style="color:#89DDFF">      }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">      if</span><span style="color:#F07178"> (</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> ===</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">rejected</span><span style="color:#89DDFF">'</span><span style="color:#F07178">) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">        // mark</span></span>
<span class="line"><span style="color:#F07178">        onRejected(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#value</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">        // mark</span></span>
<span class="line"><span style="color:#89DDFF">      }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#89DDFF">    }</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"><span style="color:#89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic">// Test Code</span></span>
<span class="line"><span style="color:#C792EA">const</span><span style="color:#BABED8"> p </span><span style="color:#89DDFF">=</span><span style="color:#89DDFF"> new</span><span style="color:#82AAFF"> MyPromise</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">resolve</span><span style="color:#89DDFF">,</span><span style="color:#BABED8;font-style:italic"> reject</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#82AAFF">  setTimeout</span><span style="color:#F07178">(</span><span style="color:#89DDFF">()</span><span style="color:#C792EA"> =></span><span style="color:#82AAFF"> resolve</span><span style="color:#F07178">(</span><span style="color:#89DDFF">'</span><span style="color:#C3E88D">resolved!</span><span style="color:#89DDFF">'</span><span style="color:#F07178">)</span><span style="color:#89DDFF">,</span><span style="color:#F78C6C"> 1000</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">}</span><span style="color:#BABED8">)</span></span>
<span class="line"><span style="color:#BABED8">p</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">then</span><span style="color:#BABED8">(</span></span>
<span class="line"><span style="color:#89DDFF">  (</span><span style="color:#BABED8;font-style:italic">res</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#BABED8">    console</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">log</span><span style="color:#F07178">(</span><span style="color:#BABED8">res</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">  },</span></span>
<span class="line"><span style="color:#89DDFF">  (</span><span style="color:#BABED8;font-style:italic">err</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#BABED8">    console</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">log</span><span style="color:#F07178">(</span><span style="color:#BABED8">err</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"><span style="color:#BABED8">)</span></span>
<span class="line"><span style="color:#BABED8">console</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">log</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">'</span><span style="color:#C3E88D">global</span><span style="color:#89DDFF">'</span><span style="color:#BABED8">)</span></span></code></pre>`}<!-- HTML_TAG_END --> <p data-svelte-h="svelte-17j7g5s">由于 Promise 状态的改变可能在调用<code>then</code>之前或之后，所以需要在多处进行判断。</p> <p data-svelte-h="svelte-dbo6he">在进行下一步之前，对代码的通用部分进行复用，添加类型检查：</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#C792EA">class</span><span style="color:#FFCB6B"> MyPromise</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#F07178">  #state</span></span>
<span class="line"><span style="color:#F07178">  #value</span></span>
<span class="line"><span style="color:#F07178">  #handlers</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA">  constructor</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">fn</span><span style="color:#89DDFF">)</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">pending</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#value</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> null</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF"> =</span><span style="color:#F07178"> []</span></span>
<span class="line"><span style="color:#82AAFF">    fn</span><span style="color:#F07178">(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#fulfill</span><span style="color:#89DDFF">,</span><span style="color:#89DDFF"> this.</span><span style="color:#BABED8">#reject</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178">  #fulfill</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">value</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">fulfilled</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#value</span><span style="color:#89DDFF"> =</span><span style="color:#BABED8"> value</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF">.</span><span style="color:#F07178">forEach(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#handle</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> null</span><span style="color:#676E95;font-style:italic"> // garbage collecting</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178">  #reject</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">err</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">rejected</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#value</span><span style="color:#89DDFF"> =</span><span style="color:#BABED8"> err</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF">.</span><span style="color:#F07178">forEach(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#handle</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> null</span><span style="color:#676E95;font-style:italic"> // garbage collecting</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // mark</span></span>
<span class="line"><span style="color:#F07178">  #handle</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">handler</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">    if</span><span style="color:#F07178"> (</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> ===</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">pending</span><span style="color:#89DDFF">'</span><span style="color:#F07178">) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#89DDFF">      this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF">.</span><span style="color:#F07178">push(</span><span style="color:#BABED8">handler</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    }</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">    if</span><span style="color:#F07178"> (</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> ===</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">fulfilled</span><span style="color:#89DDFF">'</span><span style="color:#F07178">) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#BABED8">      handler</span><span style="color:#89DDFF">.</span><span style="color:#F07178">onFulfilled(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#value</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    }</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">    if</span><span style="color:#F07178"> (</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> ===</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">rejected</span><span style="color:#89DDFF">'</span><span style="color:#F07178">) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#BABED8">      handler</span><span style="color:#89DDFF">.</span><span style="color:#F07178">onRejected(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#value</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    }</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178">  then</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">onFulfilled</span><span style="color:#89DDFF">,</span><span style="color:#BABED8;font-style:italic"> onRejected</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#F07178">    addToTaskQueue(</span><span style="color:#89DDFF">()</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#89DDFF">      this.</span><span style="color:#F07178">#handle(</span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#BABED8">        onFulfilled</span><span style="color:#89DDFF">,</span></span>
<span class="line"><span style="color:#BABED8">        onRejected</span><span style="color:#89DDFF">,</span></span>
<span class="line"><span style="color:#89DDFF">      }</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    }</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"><span style="color:#89DDFF">}</span></span></code></pre>`}<!-- HTML_TAG_END --> <h3 data-svelte-h="svelte-lcaddu"><code>.then</code>的链式调用</h3> <p data-svelte-h="svelte-1car7sk">Promise 的一个重要特性，就是允许链式的调用，从而一定程度上避免了<a href="http://callbackhell.com/" rel="nofollow">回调地狱</a>的发生。为了做到这一点，我们需要将回调函数 onFulfilled/OnRejected 的返回值穿透到最外层，即创建并返回一个以回调函数返回值为内部状态的 Promise，以便进一步调用后续的<code>.then</code>方法。</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#82AAFF">then</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">onFulfilled</span><span style="color:#89DDFF">,</span><span style="color:#BABED8;font-style:italic"> onRejected</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // mark</span></span>
<span class="line"><span style="color:#C792EA">  const</span><span style="color:#BABED8"> nextPromise</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> new</span><span style="color:#82AAFF"> MyPromise</span><span style="color:#F07178">(</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">resolve</span><span style="color:#89DDFF">,</span><span style="color:#BABED8;font-style:italic"> reject</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#C792EA">    const</span><span style="color:#BABED8"> fullfillmentTask</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> ()</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#C792EA">      const</span><span style="color:#BABED8"> value</span><span style="color:#89DDFF"> =</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">        // mark</span></span>
<span class="line"><span style="color:#89DDFF">        typeof</span><span style="color:#BABED8"> onFulfilled</span><span style="color:#89DDFF"> ===</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">function</span><span style="color:#89DDFF">'</span><span style="color:#89DDFF"> ?</span><span style="color:#82AAFF"> onFulfilled</span><span style="color:#F07178">(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#value</span><span style="color:#F07178">) </span><span style="color:#89DDFF">:</span><span style="color:#89DDFF"> this.</span><span style="color:#BABED8">#value</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#82AAFF">      resolve</span><span style="color:#F07178">(</span><span style="color:#BABED8">value</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#89DDFF">    }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#C792EA">    const</span><span style="color:#BABED8"> rejectionTask</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> ()</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#C792EA">      const</span><span style="color:#BABED8"> value</span><span style="color:#89DDFF"> =</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">        // mark</span></span>
<span class="line"><span style="color:#89DDFF">        typeof</span><span style="color:#BABED8"> onRejected</span><span style="color:#89DDFF"> ===</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">function</span><span style="color:#89DDFF">'</span><span style="color:#89DDFF"> ?</span><span style="color:#82AAFF"> onRejected</span><span style="color:#F07178">(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#value</span><span style="color:#F07178">) </span><span style="color:#89DDFF">:</span><span style="color:#89DDFF"> this.</span><span style="color:#BABED8">#value</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#82AAFF">      resolve</span><span style="color:#F07178">(</span><span style="color:#BABED8">value</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF">    addToTaskQueue</span><span style="color:#F07178">(</span><span style="color:#89DDFF">()</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">      this.</span><span style="color:#82AAFF">#handle</span><span style="color:#F07178">(</span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#F07178">        onFulfilled</span><span style="color:#89DDFF">:</span><span style="color:#BABED8"> fullfillmentTask</span><span style="color:#89DDFF">,</span></span>
<span class="line"><span style="color:#F07178">        onRejected</span><span style="color:#89DDFF">:</span><span style="color:#BABED8"> rejectionTask</span><span style="color:#89DDFF">,</span></span>
<span class="line"><span style="color:#89DDFF">      }</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    }</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">  }</span><span style="color:#F07178">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // mark</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">  return</span><span style="color:#BABED8"> nextPromise</span></span>
<span class="line"><span style="color:#89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic">// test</span></span>
<span class="line"><span style="color:#C792EA">const</span><span style="color:#BABED8"> p </span><span style="color:#89DDFF">=</span><span style="color:#89DDFF"> new</span><span style="color:#82AAFF"> MyPromise</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">resolve</span><span style="color:#89DDFF">,</span><span style="color:#BABED8;font-style:italic"> reject</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#82AAFF">  setTimeout</span><span style="color:#F07178">(</span><span style="color:#89DDFF">()</span><span style="color:#C792EA"> =></span><span style="color:#82AAFF"> resolve</span><span style="color:#F07178">(</span><span style="color:#89DDFF">'</span><span style="color:#C3E88D">resolved!</span><span style="color:#89DDFF">'</span><span style="color:#F07178">)</span><span style="color:#89DDFF">,</span><span style="color:#F78C6C"> 1000</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">}</span><span style="color:#BABED8">)</span></span>
<span class="line"><span style="color:#BABED8">p</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">then</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">res</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">  return</span><span style="color:#BABED8"> res</span><span style="color:#89DDFF"> +</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">!!</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">}</span><span style="color:#BABED8">)</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">then</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">res</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#BABED8">  console</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">log</span><span style="color:#F07178">(</span><span style="color:#BABED8">res</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">}</span><span style="color:#BABED8">)</span></span>
<span class="line"><span style="color:#BABED8">console</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">log</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">'</span><span style="color:#C3E88D">global</span><span style="color:#89DDFF">'</span><span style="color:#BABED8">)</span></span></code></pre>`}<!-- HTML_TAG_END --> <h3 data-svelte-h="svelte-z93gxs">允许<code>.then</code>回调函数返回 Promise</h3> <p data-svelte-h="svelte-18d93yu">有的时候我们会希望回调函数返回一个 Promise，并当它 resolved 之后再触发之后 then 链中的函数回调，比如我们需要先发起一个请求获取一个 Id，再根据返回的 Id 请求其他数据。如：</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#C792EA">const</span><span style="color:#BABED8"> follower </span><span style="color:#89DDFF">=</span><span style="color:#82AAFF"> fetch</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">'</span><span style="color:#C3E88D">/followers</span><span style="color:#89DDFF">'</span><span style="color:#BABED8">)</span></span>
<span class="line"><span style="color:#C792EA">const</span><span style="color:#BABED8"> p </span><span style="color:#89DDFF">=</span><span style="color:#BABED8"> follower</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">then</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">ids</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#C792EA">  const</span><span style="color:#BABED8"> user</span><span style="color:#89DDFF"> =</span><span style="color:#82AAFF"> fetch</span><span style="color:#F07178">(</span><span style="color:#89DDFF">\`</span><span style="color:#C3E88D">/api/user/</span><span style="color:#89DDFF">\${</span><span style="color:#BABED8">id[</span><span style="color:#F78C6C">0</span><span style="color:#BABED8">]</span><span style="color:#89DDFF">}\`</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">  return</span><span style="color:#BABED8"> user</span></span>
<span class="line"><span style="color:#89DDFF">}</span><span style="color:#BABED8">)</span></span></code></pre>`}<!-- HTML_TAG_END --> <p data-svelte-h="svelte-qa22ip">此时，除<code>follower</code>外存在着两个 Promise，一个是<code>user</code> ，一个是<code>.then</code>方法需要返回并赋值给 p 的 Promise。它们的状态和终值应该是相互锁定的，即当第一个 Promise 状态改变时，第二个 Promise 也随之发生相同变化。因此我们需要扩展一下我们的<code>fulfill</code>方法</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#C792EA">class</span><span style="color:#FFCB6B"> MyPromise</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#C792EA">  constructor</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">fn</span><span style="color:#89DDFF">)</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">pending</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#value</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> null</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF"> =</span><span style="color:#F07178"> []</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#82AAFF">    fn</span><span style="color:#F07178">(</span><span style="color:#89DDFF">this.</span><span style="color:#BABED8">#resolve</span><span style="color:#89DDFF">,</span><span style="color:#89DDFF"> this.</span><span style="color:#BABED8">#reject</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic">  // mark</span></span>
<span class="line"><span style="color:#F07178">  #resolve</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">value</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">    if</span><span style="color:#F07178"> (isPromise(</span><span style="color:#BABED8">value</span><span style="color:#F07178">)) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#BABED8">      value</span><span style="color:#89DDFF">.</span><span style="color:#F07178">then(</span></span>
<span class="line"><span style="color:#89DDFF">        (</span><span style="color:#BABED8;font-style:italic">val</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">          this.</span><span style="color:#F07178">#resolve(</span><span style="color:#BABED8">val</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">        },</span></span>
<span class="line"><span style="color:#89DDFF">        (</span><span style="color:#BABED8;font-style:italic">err</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">          this.</span><span style="color:#F07178">#reject(</span><span style="color:#BABED8">err</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">        }</span></span>
<span class="line"><span style="color:#F07178">      )</span></span>
<span class="line"><span style="color:#89DDFF">    }</span><span style="color:#89DDFF;font-style:italic"> else</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">      this.</span><span style="color:#F07178">#fulfill(</span><span style="color:#BABED8">value</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    }</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"><span style="color:#89DDFF">}</span></span></code></pre>`}<!-- HTML_TAG_END --> <p data-svelte-h="svelte-1fohu5d">让我们来捋一捋当<code>user</code>的这个 Promise 从服务器得到数据，状态改变前后都发生了什么：</p> <ol data-svelte-h="svelte-1k3ppl4"><li>调用<code>.then</code>，将 fullfillmentTask 加入微任务队列， 返回新 Promise p。</li> <li>浏览器执行完主函数，开始执行微任务 fullfillmentTask。假设此时<code>follower</code>已完成，则立即执行<code>.then</code>传入的回调函数<code>(ids) =&gt; { return fetch(\`/api/user/\${id[0]}\`) } </code>，并将返回值传给 p 的<code>resolve</code>方法执行</li> <li>由于返回值是一个 Promise，于是给它挂上回调函数，来监控其状态变化。注意此时 this 的上下文为 p</li> <li>某一时刻，<code>user</code> fetch 从服务器得到数据</li> <li>执行 3 中挂上的回调 <code>(val) =&gt; { this.#revolve(val) }</code>, 调用 p 的<code>this.#revolve</code></li> <li>由于 p 没有后续的 then 链，所以无后续回调函数需要执行，p 内部状态变为<code>fulfilled</code>, 终值为 <code>user</code>的终值</li></ol> <h4 data-svelte-h="svelte-aggf5e">Note</h4> <p data-svelte-h="svelte-15p7fat">对于实际的 Promise 来说，返回值不仅可以是 Promise 对象，还可以是更广泛意义上的 Thenable Object，即任何带有<code>then</code>方法的对象</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#C792EA">function</span><span style="color:#82AAFF"> isThenable</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">value</span><span style="color:#89DDFF">)</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">  return</span><span style="color:#89DDFF"> typeof</span><span style="color:#BABED8"> value</span><span style="color:#89DDFF">?.</span><span style="color:#BABED8">then</span><span style="color:#89DDFF"> ===</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">function</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">}</span></span></code></pre>`}<!-- HTML_TAG_END --> <h3 data-svelte-h="svelte-1mkb4ol">异常的集中处理</h3> <p data-svelte-h="svelte-1wch15e">Promise 相比之前的一大优势，就是不再需要对每一步异步操作添加异常处理。只需要在 then 链的末尾添加就可以集中处理整个链上的异常</p> <p data-svelte-h="svelte-12pa04f">另外，由于在内部 Promise 会调用外部的函数，所以在使用的过程中应该进行一些保护，如异常处理。同时对于<code>resolve</code>和<code>reject</code>，最多只允许其中之一执行一次</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#C792EA">class</span><span style="color:#FFCB6B"> MyPromise</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#C792EA">  constructor</span><span style="color:#89DDFF">(</span><span style="color:#BABED8;font-style:italic">fn</span><span style="color:#89DDFF">)</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#state</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> '</span><span style="color:#C3E88D">pending</span><span style="color:#89DDFF">'</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#value</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> null</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#BABED8">#handlers</span><span style="color:#89DDFF"> =</span><span style="color:#F07178"> []</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // mark</span></span>
<span class="line"><span style="color:#89DDFF">    this.</span><span style="color:#82AAFF">#safeRun</span><span style="color:#F07178">(</span><span style="color:#BABED8">fn</span><span style="color:#89DDFF">,</span><span style="color:#89DDFF"> this.</span><span style="color:#BABED8">#resolve</span><span style="color:#89DDFF">,</span><span style="color:#89DDFF"> this.</span><span style="color:#BABED8">#reject</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178">  #safeRun</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">fn</span><span style="color:#89DDFF">,</span><span style="color:#BABED8;font-style:italic"> onFulfilled</span><span style="color:#89DDFF">,</span><span style="color:#BABED8;font-style:italic"> onRejected</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#C792EA">    let</span><span style="color:#BABED8"> done</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">    try</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#F07178">      fn(</span></span>
<span class="line"><span style="color:#89DDFF">        (</span><span style="color:#BABED8;font-style:italic">val</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">          if</span><span style="color:#F07178"> (</span><span style="color:#BABED8">done</span><span style="color:#F07178">) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">            return</span></span>
<span class="line"><span style="color:#89DDFF">          }</span></span>
<span class="line"><span style="color:#BABED8">          done</span><span style="color:#89DDFF"> =</span><span style="color:#FF9CAC"> true</span></span>
<span class="line"><span style="color:#F07178">          onFulfilled(</span><span style="color:#BABED8">val</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">        },</span></span>
<span class="line"><span style="color:#89DDFF">        (</span><span style="color:#BABED8;font-style:italic">val</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">          if</span><span style="color:#F07178"> (</span><span style="color:#BABED8">done</span><span style="color:#F07178">) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">            return</span></span>
<span class="line"><span style="color:#89DDFF">          }</span></span>
<span class="line"><span style="color:#BABED8">          done</span><span style="color:#89DDFF"> =</span><span style="color:#FF9CAC"> true</span></span>
<span class="line"><span style="color:#F07178">          onRejected(</span><span style="color:#BABED8">val</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">        }</span></span>
<span class="line"><span style="color:#F07178">      )</span></span>
<span class="line"><span style="color:#89DDFF">    }</span><span style="color:#89DDFF;font-style:italic"> catch</span><span style="color:#F07178"> (</span><span style="color:#BABED8">err</span><span style="color:#F07178">) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">      if</span><span style="color:#F07178"> (</span><span style="color:#BABED8">done</span><span style="color:#F07178">) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">        return</span></span>
<span class="line"><span style="color:#89DDFF">      }</span></span>
<span class="line"><span style="color:#BABED8">      done</span><span style="color:#89DDFF"> =</span><span style="color:#FF9CAC"> true</span></span>
<span class="line"><span style="color:#F07178">      onRejected(</span><span style="color:#BABED8">err</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    }</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178">  #resolve</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> (</span><span style="color:#BABED8;font-style:italic">value</span><span style="color:#89DDFF">)</span><span style="color:#C792EA"> =></span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic">    if</span><span style="color:#F07178"> (isThenable(</span><span style="color:#BABED8">value</span><span style="color:#F07178">)) </span><span style="color:#89DDFF">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">      // mark</span></span>
<span class="line"><span style="color:#89DDFF">      this.</span><span style="color:#F07178">#safeRun(</span><span style="color:#BABED8">value</span><span style="color:#89DDFF">.</span><span style="color:#BABED8">then</span><span style="color:#89DDFF">,</span><span style="color:#89DDFF"> this.</span><span style="color:#BABED8">#resolve</span><span style="color:#89DDFF">,</span><span style="color:#89DDFF"> this.</span><span style="color:#BABED8">#reject</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    }</span><span style="color:#89DDFF;font-style:italic"> else</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#89DDFF">      this.</span><span style="color:#F07178">#fulfill(</span><span style="color:#BABED8">value</span><span style="color:#F07178">)</span></span>
<span class="line"><span style="color:#89DDFF">    }</span></span>
<span class="line"><span style="color:#89DDFF">  }</span></span>
<span class="line"><span style="color:#89DDFF">}</span></span></code></pre>`}<!-- HTML_TAG_END --> <h3 data-svelte-h="svelte-xzg5rm">总结</h3> <p data-svelte-h="svelte-dfxw64">到此，我们实现一个 Promise 所需的核心功能，完整代码请参见<a href="https://gist.github.com/yshwaker/aea34aa9b44ca20187010e3b4ecf9b0b" rel="nofollow">gist</a>。</p> <h3 data-svelte-h="svelte-1of9858">推荐阅读</h3> <ul data-svelte-h="svelte-1l6jalr"><li><a href="https://www.promisejs.org/implementing/" rel="nofollow">Promises</a></li> <li><a href="https://exploringjs.com/deep-js/ch_implementing-promises.html" rel="nofollow">Exploring Promises by implementing them</a></li></ul>`;
});
export {
  Implementing_promise as default,
  metadata
};
