<script lang="ts">
  import '../app.css'
  import { onMount } from 'svelte'
  import { inject } from '@vercel/analytics'

  onMount(() => {
    if (import.meta.env.PROD) {
      inject()
    }
  })
</script>

<svelte:head>
  <title>Shio Y. Blog</title>
  <meta name="description" content="Personal blog of Shio Y." />
</svelte:head>

<div class="font-sans max-w-3xl mx-5vw md:mx-auto py-8">
  <h1 class="font-lora text-xl">
    <a href="/" class="text-gray-700 hover:text-black">
      Shio Y. Blog
    </a>
  </h1>
  
  <slot />
  
  <footer class="mt-28 text-gray-500">
    All rights reserved © Shio Y. 2025
  </footer>
</div>
