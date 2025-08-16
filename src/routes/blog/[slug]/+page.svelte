<script lang="ts">
  import dayjs from 'dayjs'
  import VisuallyHidden from '$lib/components/VisuallyHidden.svelte'
  import type { PageData } from './$types'
  
  export let data: PageData
  const { post } = data
  
  function goTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }
</script>

<svelte:head>
  <title>{post.title} - Shio Y. Blog</title>
  <meta name="description" content={post.summary} />
</svelte:head>

<div class="py-20">
  <h2 class="text-4xl md:text-5xl font-bold">{post.title}</h2>
</div>

<main class="prose max-w-none">
  <svelte:component this={post.default} />
</main>

<p class="text-sm mt-10 text-gray-500 text-right">
  写于 {dayjs(post.date).format('YYYY年MM月DD日')}
</p>

<div class="mt-20 text-4xl flex justify-end">
  <div class="group">
    <button
      class="group-hover:rotate-90 px-4 py-2 transition-transform"
      on:click={goTop}
      title="回到顶部"
    >
      𝄇
      <VisuallyHidden>回到顶部</VisuallyHidden>
    </button>
  </div>
</div>