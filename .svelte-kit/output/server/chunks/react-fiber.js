import { c as create_ssr_component, f as add_attribute } from "./ssr.js";
const metadata = {
  "title": "谈谈 React Fiber",
  "date": "2022-10-22",
  "summary": "React Fiber 的原理",
  "updatedOn": "2025-08-16T15:41:37.975Z"
};
const { title, date, summary, updatedOn } = metadata;
const React_fiber = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h2 data-svelte-h="svelte-7oxs4e">什么是 React Fiber</h2> <p data-svelte-h="svelte-vru35">React 16 起开始使用的 reconciler</p> <h2 data-svelte-h="svelte-9rymoy">新特性</h2> <ul data-svelte-h="svelte-2v8ci0"><li>将 reconciliation 变成<strong>可中断</strong>的工作方式</li> <li>React 可以可以按照不同更新任务的优先级来安排工作</li></ul> <h2 data-svelte-h="svelte-tptjs8">解决了什么问题</h2> <p data-svelte-h="svelte-12fjmnc">之前不可中断的更新方式容易导致 JS 引擎运行时间过长，导致页面渲染流程被阻塞。
因为 React 16 使用的是 Stack Reconciler, 使用递归的方式遍历 Virtual DOM，整个工作在遍历完之前无法中断</p> <h2 data-svelte-h="svelte-wdip0c">实现细节</h2> <h3 data-svelte-h="svelte-1wp0vu1">引入 fiber 节点</h3> <p data-svelte-h="svelte-16pl530">fiber 节点时一种 React 中的数据结构，每个 fiber 对应每个单独的 React Element, Virtual DOM 上的一个节点</p> <!-- HTML_TAG_START -->${`<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#C792EA">type</span><span style="color:#FFCB6B"> Fiber</span><span style="color:#89DDFF"> =</span><span style="color:#89DDFF"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // 当前 Fiber 处理完成后返回的 Fiber 节点</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // 也就是父亲节点</span></span>
<span class="line"><span style="color:#F07178">    return</span><span style="color:#89DDFF">:</span><span style="color:#FFCB6B"> Fiber</span><span style="color:#89DDFF"> |</span><span style="color:#FFCB6B"> null</span><span style="color:#89DDFF">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // 执行当前的节点的孩子节点和兄弟节点</span></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // 因此 Fiber 兄弟之间、父子之间形成了链表</span></span>
<span class="line"><span style="color:#F07178">    child</span><span style="color:#89DDFF">:</span><span style="color:#FFCB6B"> Fiber</span><span style="color:#89DDFF"> |</span><span style="color:#FFCB6B"> null</span><span style="color:#89DDFF">,</span></span>
<span class="line"><span style="color:#F07178">    sibling</span><span style="color:#89DDFF">:</span><span style="color:#FFCB6B"> Fiber</span><span style="color:#89DDFF"> |</span><span style="color:#FFCB6B"> null</span><span style="color:#89DDFF">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // 与 Fiber 相关联的 React 实例</span></span>
<span class="line"><span style="color:#F07178">    stateNode</span><span style="color:#89DDFF">:</span><span style="color:#FFCB6B"> any</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // 指向 effect list 链表中的下一个具有 side effect 的 Fiber</span></span>
<span class="line"><span style="color:#F07178">    nextEffect</span><span style="color:#89DDFF">:</span><span style="color:#FFCB6B"> Fiber</span><span style="color:#89DDFF"> |</span><span style="color:#FFCB6B"> null</span><span style="color:#89DDFF">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic">    // ...</span></span>
<span class="line"><span style="color:#89DDFF">}</span></span></code></pre>`}<!-- HTML_TAG_END --> <p data-svelte-h="svelte-sq0izv">可以看到单个 fiber 包含指向 <code>child</code>, <code>parent</code>, <code>sibling</code> 的指针，因此可以理解为添加了链表的树，或图</p> <h3 data-svelte-h="svelte-7vrnet">Fiber 的遍历方式</h3> <blockquote data-svelte-h="svelte-veox4u"><p>TL;DR <strong>非递归</strong>的 DFS</p></blockquote> <p data-svelte-h="svelte-150ho7i">由于每个 fiber 包含上述相关 fiber 的指针，因此每个 fiber 处理结束后可以返回下一个需要处理的 fiber 是什么。这为 Fiber 树更新阶段的<strong>可中断</strong>特性提供基础。程序不再需要依靠调用栈来跟踪它在树中的位置以供回溯 ( 递归遍历树的原理 )</p> <h3 data-svelte-h="svelte-1qiq7gr">页面初始渲染时期</h3> <p data-svelte-h="svelte-kufldf">DFS 遍历为每个 React element 创建 fiber，形成 Fiber Tree</p> <img src="/blog-images/fiber-tree.png"${add_attribute("width", 1295 / 2, 0)}${add_attribute("height", 1065 / 2, 0)} alt="fiber tree" style="margin: 0 auto; display: block;"> <h3 data-svelte-h="svelte-1l10cck">页面更新时期</h3> <p data-svelte-h="svelte-161plz4">与之前不同的是，对于每一个更新任务，React Fiber 将更新过程分为两个阶段：渲染阶段和提交 commit 阶段</p> <h4 data-svelte-h="svelte-13hg7xt">渲染阶段 ( reconcilation )</h4> <ul data-svelte-h="svelte-1ty844a"><li>可中断</li></ul> <p data-svelte-h="svelte-16lbz47">Fiber 对树进行遍历，并根据需要做的更新生成新的 wip ( work-in-progress ) 树。树的遍历与二叉树的先序遍历很像</p> <ol data-svelte-h="svelte-1a7i3uv"><li>从根节点开始遍历</li> <li>处理当前节点</li> <li>如果有数据结构中的 <code>child</code> 属性判断是否存在孩子节点，有则跳转都孩子节点，并重复 2</li> <li>如果已经是叶子节点了，则判断是否存在兄弟节点，有则跳转到兄弟节点，并重复 2</li> <li>如果没有未访问的兄弟节点和孩子节点了，则宣布该节点已完成，返回父亲节点</li></ol> <p data-svelte-h="svelte-1kcy8c2">在处理节点的过程中，如果该节点需要更新，则对该节点打上标记。
当节点为已完成状态时，如果它身上有标记，则将它添加到名为 <code>effect list</code> 的链表中，等待 commit 阶段统一更新。</p> <h4 data-svelte-h="svelte-m2gots">commit 阶段</h4> <ul data-svelte-h="svelte-xt5il1"><li>不可中断</li></ul> <p data-svelte-h="svelte-1ewpo41">在这一阶段，React 首先按照 <code>effect list</code> 中的顺序将所有变更更新到 DOM 上，并执行相应的生命周期函数 ( 对于 class component 是这样 ) 。</p> <p data-svelte-h="svelte-1dd6ada">总结以上两个阶段，对于一个更新任务来说，我们可以这样理解：</p> <p data-svelte-h="svelte-15k4t32">一个任务可分为 fiber1|fiber2|fiber3|…|fiberX| ( commit ) 这样的工作单元序列。
在所有 <code>|</code> 的地方，都是可中断的 ( 注意：不是一定会中断 ) 。</p> <h4 data-svelte-h="svelte-jtggqs">分配优先级</h4> <p data-svelte-h="svelte-1k2s9pf">页面运行过程中的更新任务被依次加入在 <code>update queue</code> 中。React 中每一种任务有不同的优先级：</p> <ul data-svelte-h="svelte-1bf0c2q"><li>Synchronous，
与 Stack Reconciliation 类似</li> <li>Task，
需要在下一个事件循环周期前完成</li> <li>Animation ( 动画 ) ，
需要在下一帧重绘前完成</li> <li>High，
高优先级的任务可以插队到低优先级任务之前</li> <li>Low，
如远程数据请求，更新的略微延迟 ( 几百毫秒 ) 相比于之前的网络传输可以忽略不记</li> <li>Offscreen，对隐藏的元素或者暂时不在屏幕中的元素进行更新，为将来的显示做准备</li></ul> <h4 data-svelte-h="svelte-1q0wxea">如何调度</h4> <p data-svelte-h="svelte-18dnt40">对于 High, Low, Offscreen 任务，React 会调用 <code>requestIdleCallback</code>，告诉浏览器在每一帧的空闲时间执行。</p> <p data-svelte-h="svelte-cc18e2">拿低优先级的更新任务举例，每执行完一个工作单元 ( 也就是一个 fiber ) 后，调度器都会查看下一帧开始前的剩余时间。如果还有时间，则会执行下一个工作单元。此时假设有其他高优先级的任务出现，调度器并不会立即执行它，而是仍会执行当前任务，直到剩余时间用尽。</p> <p data-svelte-h="svelte-1s4nw7o">如果时间用尽前，当前任务仍然没有完成，那么 React 会在结束前继续调用 <code>requestIdCallback</code>, 在下一个空闲时段继续剩下的工作</p> <p data-svelte-h="svelte-z0pwrz">当剩余时间用尽后，调度器根据 <code>update queue</code> 中的认识的优先级选择更新任务执行。此前出现的高优先级任务此时会被优先执行。执行时，调度会丢弃进行到一半的低优先级任务的工作成果，并在高优先级任务结束后再重新执行原先的低等级任务。</p> <h5 data-svelte-h="svelte-d26eo">更新</h5> <p data-svelte-h="svelte-1lgqzwy">React已经不再使用<code>requestIdleCallback</code>，而是使用自己的<a href="https://github.com/facebook/react/tree/main/packages/scheduler" rel="nofollow">scheduler</a></p> <h2 data-svelte-h="svelte-1jqwil4">总结</h2> <p data-svelte-h="svelte-1ej9hpj">React Fiber 本质上就是使用非递归的方式更新 fiber 树，使得 React 不再为了遍历完整棵树而一直霸占 Main Thread。同时吸取了与显卡渲染中的双缓存机制类似的概念，在可中断的同时保证页面的一致性。</p> <h2 data-svelte-h="svelte-1088wxh">参考</h2> <p data-svelte-h="svelte-swki4c"><a href="https://www.velotio.com/engineering-blog/react-fiber-algorithm" rel="nofollow">An Introduction to React Fiber - The Algorithm Behind React</a> \\
<a href="https://www.youtube.com/watch?v=ZCuYPiUIONs" rel="nofollow">A Cartoon Intro To Fiber - React Conf 2017</a></p>`;
});
export {
  React_fiber as default,
  metadata
};
