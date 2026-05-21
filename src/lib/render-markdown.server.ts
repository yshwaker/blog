import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export type MarkdownPart = { type: 'html'; html: string } | { type: 'kmp'; demo: 1 | 2 }

const kmpPattern = /<KMP\s+demo=\{([12])\}\s*\/>/g

export async function renderPostMarkdown(content: string): Promise<MarkdownPart[]> {
  const parts: MarkdownPart[] = []
  let cursor = 0

  for (const match of content.matchAll(kmpPattern)) {
    if (match.index > cursor) {
      parts.push(await renderHtmlPart(content.slice(cursor, match.index)))
    }

    parts.push({ type: 'kmp', demo: Number(match[1]) as 1 | 2 })
    cursor = match.index + match[0].length
  }

  if (cursor < content.length) {
    parts.push(await renderHtmlPart(content.slice(cursor)))
  }

  return parts.filter((part) => part.type !== 'html' || part.html.trim() !== '')
}

async function renderHtmlPart(content: string): Promise<MarkdownPart> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['anchor'] },
    })
    .use(rehypeStringify)
    .process(content)

  return { type: 'html', html: String(result) }
}
