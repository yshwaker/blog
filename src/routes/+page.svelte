<script lang="ts">
  import dayjs from 'dayjs'
  import type { PageData } from './$types'
  
  export let data: PageData
  const { posts, heptabaseLinks } = data
</script>

<svelte:head>
  <title>Shio Y. Blog</title>
  <meta name="description" content="Personal Blog by ShioY" />
</svelte:head>

<main>
  <h2 class="text-5xl text-shadow shadow-gray-400 font-bold text-gray-800 py-16">
    Post
  </h2>
  <div class="space-y-12">
    {#each posts as post}
      <a href="/blog/{post.slug}" class="group block">
        <h3>
          <span class="text-2xl font-bold text-gray-600 bg-clip-text transition duration-1000 group-hover:text-opacity-0 group-hover:duration-100 bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500">
            {post.title}
          </span>
        </h3>
        <p class="text-sm text-gray-600">
          {dayjs(post.date).format('YYYY年MM月DD日')}
        </p>
        <p class="text-gray-500">{post.summary}</p>
      </a>
    {/each}
  </div>
  
  <h2 class="text-5xl text-shadow shadow-gray-400 font-bold text-gray-800 py-16">
    Note
  </h2>
  <div class="space-y-12">
    {#each heptabaseLinks as note}
      <a href={note.url} class="group block">
        <h3>
          <span class="text-2xl font-bold text-gray-600 bg-clip-text transition duration-1000 group-hover:text-opacity-0 group-hover:duration-100 bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500">
            {note.title}
          </span>
        </h3>
        <p class="text-sm text-gray-600">
          {dayjs(note.date).format('YYYY年MM月DD日')}
        </p>
      </a>
    {/each}
  </div>
</main>