import { createServerFn } from '@tanstack/react-start'

export const getAllPostsFn = createServerFn().handler(async () => {
  const { getAllPosts } = await import('./posts.server')

  return getAllPosts()
})

export const getPostFn = createServerFn()
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const [{ getPost }, { renderPostMarkdown }] = await Promise.all([
      import('./posts.server'),
      import('./render-markdown.server'),
    ])
    const post = getPost(slug)

    if (!post) {
      return null
    }

    const { content, ...metadata } = post

    return {
      ...metadata,
      parts: await renderPostMarkdown(content),
    }
  })
