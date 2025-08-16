export interface Post {
  slug: string
  title: string
  date: Date
  updatedOn?: Date
  summary: string
  draft?: boolean
}

export interface PostWithContent extends Post {
  content: string
  default: any
}

// This function dynamically imports all MDX files from the posts directory
export async function getAllPosts(): Promise<Post[]> {
  const postModules = import.meta.glob('./posts/*.mdx')
  const posts: Post[] = []

  for (const path in postModules) {
    try {
      const mod = await postModules[path]() as any
      const slug = path.split('/').pop()?.replace('.mdx', '') || ''
      
      // mdsvex puts frontmatter in metadata property
      const frontmatter = mod.metadata
      
      if (frontmatter && frontmatter.title && !frontmatter.draft) {
        posts.push({
          slug,
          title: frontmatter.title,
          date: new Date(frontmatter.date),
          updatedOn: frontmatter.updatedOn ? new Date(frontmatter.updatedOn) : undefined,
          summary: frontmatter.summary,
          draft: frontmatter.draft
        })
      }
    } catch (error) {
      console.error(`Error loading post from ${path}:`, error)
    }
  }

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime())
}

export async function getPost(slug: string): Promise<PostWithContent | null> {
  try {
    const post = await import(`./posts/${slug}.mdx`)
    const frontmatter = post.metadata
    if (frontmatter && frontmatter.title && !frontmatter.draft) {
      return {
        slug,
        title: frontmatter.title,
        date: new Date(frontmatter.date),
        updatedOn: frontmatter.updatedOn ? new Date(frontmatter.updatedOn) : undefined,
        summary: frontmatter.summary,
        draft: frontmatter.draft,
        content: '',
        default: post.default
      }
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
  }
  
  return null
}