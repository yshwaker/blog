import { createFileRoute, notFound } from '@tanstack/react-router'
import dayjs from 'dayjs'

import { KMP } from '../../lib/components/KMP'
import { VisuallyHidden } from '../../lib/components/VisuallyHidden'
import { getPostFn } from '../../lib/post-functions'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = await getPostFn({ data: params.slug })

    if (!post) {
      throw notFound()
    }

    return post
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? 'Post'} - Shio Y. Blog` },
      { name: 'description', content: loaderData?.summary ?? '' },
    ],
  }),
  component: Post,
})

function Post() {
  const post = Route.useLoaderData()

  return (
    <>
      <div className="py-20">
        <h2 className="text-4xl md:text-5xl font-bold">{post.title}</h2>
      </div>

      <main className="prose max-w-none">
        {post.parts.map((part, index) => {
          if (part.type === 'kmp') {
            return <KMP key={index} demo={part.demo} />
          }

          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: part.html }}
            />
          )
        })}
      </main>

      <p className="text-sm mt-10 text-gray-500 text-right">
        写于 {dayjs(post.date).format('YYYY年MM月DD日')}
      </p>

      <div className="mt-20 text-4xl flex justify-end">
        <div className="group">
          <button
            className="group-hover:rotate-90 px-4 py-2 transition-transform"
            type="button"
            onClick={() => window.scrollTo(0, 0)}
            title="回到顶部"
          >
            𝄇
            <VisuallyHidden>回到顶部</VisuallyHidden>
          </button>
        </div>
      </div>
    </>
  )
}
