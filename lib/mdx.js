import fs from 'fs'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import path from 'path'
import theme from 'shiki/themes/rose-pine-dawn.json'

import { remarkCodeHike } from '@code-hike/mdx'

const POST_PATH = path.join(process.cwd(), 'content')

export function getPostList() {
  return fs
    .readdirSync(POST_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((filename) => {
      const source = fs.readFileSync(path.join(POST_PATH, filename))
      const slug = filename.replace(/\.mdx?$/, '')
      const { data } = matter(source)

      return {
        frontmatter: data,
        slug,
      }
    })
}

export async function getPostBySlug(slug) {
  const { code, frontmatter } = await bundleMDX({
    file: path.join(POST_PATH, `${slug}.mdx`),
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [remarkCodeHike, { theme, showCopyButton: true }],
      ]
      return options
    },
  })

  return {
    frontmatter,
    code,
  }
}
