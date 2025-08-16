<script lang="ts">
  import { onMount } from 'svelte'
  
  export let demo: 1 | 2 = 1
  
  let offset = 0
  
  function Box(char: string, className = '') {
    return `<div class="-ml-0.5 w-9 h-9 text-sm md:text-base min-w-0 border-2 border-black flex justify-center gap items-center bg-gray-50 ${className}">${char}</div>`
  }
</script>

{#if demo === 1}
  <div class="border-2 border-dashed rounded-lg border-gray-400 p-4">
    <div class="flex flex-row">
      {#each Array.from('abcabx?') as char, i}
        <div class="-ml-0.5 w-9 h-9 text-sm md:text-base min-w-0 border-2 border-black flex justify-center gap items-center bg-gray-50">
          {char}
        </div>
      {/each}
    </div>
    <div
      class="inline-flex flex-row mt-2 relative"
      style="left: {(offset * 8.5) / 4}rem"
    >
      {#each Array.from('abcabd') as char, i}
        {@const T = 'abcabx?'}
        {@const color = T[i + offset] === char ? 'bg-green-300' : 'bg-red-300'}
        <div class="-ml-0.5 w-9 h-9 text-sm md:text-base min-w-0 border-2 border-black flex justify-center gap items-center bg-gray-50 {color}">
          {char}
        </div>
      {/each}
    </div>
    <div class="mt-2">
      <button
        type="button"
        class="btn-small"
        on:click={() => offset > 0 && (offset = offset - 1)}
      >
        向左移动
      </button>
      <button
        type="button"
        class="btn-small ml-2"
        on:click={() => offset < 3 && (offset = offset + 1)}
      >
        向右移动
      </button>
    </div>
  </div>
{:else if demo === 2}
  {@const T = 'abcabdddabcabc'}
  {@const index = Array.from(Array(14)).map((_, i) => i + 1)}
  {@const indexWithMarkers = [...index]}
  <!-- index[5] = 'now', index[13] = 'x' -->
  {@const next = '0001200012345?'}
  
  <div class="border-2 border-dashed rounded-lg border-gray-400 p-2 md:p-4">
    <div class="flex flex-row items-center">
      <label class="w-20 hidden md:block">主串 T：</label>
      <label class="w-4 text-sm md:hidden">T：</label>
      {#each Array.from(T) as char, i}
        {@const color = (i < 5 || (i >= 8 && i <= 12)) ? 'bg-green-300' : (i === 5 || i === 13) ? 'bg-red-300' : ''}
        <div class="-ml-0.5 w-9 h-9 text-sm md:text-base min-w-0 border-2 border-black flex justify-center gap items-center bg-gray-50 {color}">
          {char}
        </div>
      {/each}
    </div>
    <div class="flex flex-row mt-2 items-center">
      <label class="w-20 hidden md:block">Index：</label>
      <label class="w-4 text-sm md:hidden">I：</label>
      {#each indexWithMarkers as char, i}
        {@const displayChar = i === 5 ? 'now' : i === 13 ? 'x' : char}
        <div class="-ml-0.5 w-9 h-9 text-sm md:text-base min-w-0 border-2 border-black flex justify-center gap items-center bg-gray-50">
          {displayChar}
        </div>
      {/each}
    </div>
    <div class="flex flex-row mt-2 items-center">
      <label class="w-20 hidden md:block">模式串 P：</label>
      <label class="w-4 text-sm md:hidden">P：</label>
      {#each Array.from(next) as char}
        <div class="-ml-0.5 w-9 h-9 text-sm md:text-base min-w-0 border-2 border-black flex justify-center gap items-center bg-gray-50">
          {char}
        </div>
      {/each}
    </div>
  </div>
{/if}