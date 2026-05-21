import { Link, createFileRoute } from '@tanstack/react-router'
import dayjs from 'dayjs'

import heptabaseLinks from '../lib/heptabase-links.json'
import { getAllPostsFn } from '../lib/post-functions'

export const Route = createFileRoute('/')({
  loader: async () => ({
    posts: await getAllPostsFn(),
    heptabaseLinks,
  }),
  head: () => ({
    meta: [{ title: 'Shio Y. Blog' }, { name: 'description', content: 'Personal Blog by ShioY' }],
  }),
  component: Home,
})

function Home() {
  const { posts, heptabaseLinks } = Route.useLoaderData()

  return (
    <main>
      <h2 className="text-5xl text-shadow shadow-gray-400 font-bold text-gray-800 py-16">Post</h2>
      <div className="space-y-12">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="group block"
          >
            <h3>
              <span className="text-2xl font-bold text-gray-600 bg-clip-text transition duration-1000 group-hover:text-opacity-0 group-hover:duration-100 bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500">
                {post.title}
              </span>
            </h3>
            <p className="text-sm text-gray-600">{dayjs(post.date).format('YYYY年MM月DD日')}</p>
            <p className="text-gray-500">{post.summary}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-5xl text-shadow shadow-gray-400 font-bold text-gray-800 py-16">Note</h2>
      <div className="space-y-12">
        {heptabaseLinks.map((note) => (
          <a key={note.url} href={note.url} className="group block">
            <h3>
              <span className="text-2xl font-bold text-gray-600 bg-clip-text transition duration-1000 group-hover:text-opacity-0 group-hover:duration-100 bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500">
                {note.title}
              </span>
            </h3>
            <p className="text-sm text-gray-600">{dayjs(note.date).format('YYYY年MM月DD日')}</p>
          </a>
        ))}
      </div>
    </main>
  )
}
