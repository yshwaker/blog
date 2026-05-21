export interface Post {
  slug: string
  title: string
  date: string
  updatedOn?: string
  summary: string
  draft?: boolean
}

export interface PostWithContent extends Post {
  content: string
}

type Frontmatter = {
  title?: string
  date?: string
  updatedOn?: string
  summary?: string
  draft?: boolean
}

const postModules = import.meta.glob<string>('./posts/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const posts: PostWithContent[] = Object.entries(postModules)
  .flatMap(([path, rawPost]) => {
    const slug = path.split('/').pop()?.replace('.mdx', '') ?? ''
    const { frontmatter, content } = parseFrontmatter(rawPost)

    if (!frontmatter.title || !frontmatter.date || frontmatter.draft) {
      return []
    }

    return [{
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      updatedOn: frontmatter.updatedOn,
      summary: frontmatter.summary ?? '',
      draft: frontmatter.draft,
      content: normalizeMdsvexContent(content),
    }]
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getAllPosts(): Post[] {
  return posts.map(({ content: _content, ...post }) => post)
}

export function getPost(slug: string): PostWithContent | null {
  return posts.find((post) => post.slug === slug) ?? null
}

function normalizeMdsvexContent(content: string) {
  return content
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/\s(?:width|height)=\{[^}]+\}/g, '')
}

function parseFrontmatter(rawPost: string): {
  frontmatter: Frontmatter
  content: string
} {
  const match = rawPost.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    return { frontmatter: {}, content: rawPost }
  }

  return {
    frontmatter: parseYamlSubset(match[1]),
    content: match[2],
  }
}

function parseYamlSubset(source: string): Frontmatter {
  const lines = source.split('\n')
  const frontmatter: Record<string, string | boolean> = {}

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const match = line.match(/^([A-Za-z][\w-]*):(?:\s*(.*))?$/)

    if (!match) {
      continue
    }

    const [, key, rawValue = ''] = match

    if (rawValue === '>-' || rawValue === '>') {
      const block: string[] = []

      while (index + 1 < lines.length && /^\s+/.test(lines[index + 1])) {
        index += 1
        block.push(lines[index].trim())
      }

      frontmatter[key] = block.join(' ')
      continue
    }

    frontmatter[key] = parseScalar(rawValue)
  }

  return frontmatter as Frontmatter
}

function parseScalar(value: string) {
  const trimmed = value.trim()

  if (trimmed === 'true') return true
  if (trimmed === 'false') return false

  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}
