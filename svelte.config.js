import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md', '.mdx'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const { codeToHtml } = await import('shiki')
      const html = await codeToHtml(code, {
        lang,
        theme: 'material-theme-palenight'
      })
      // Escape template literals for Svelte
      const escapedHtml = html.replace(/\$\{/g, '\\${').replace(/`/g, '\\`')
      return `{@html \`${escapedHtml}\`}`
    }
  },
  remarkPlugins: [],
  rehypePlugins: []
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.mdx'],
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexOptions)
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
}

export default config