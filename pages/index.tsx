import { allPosts, type Post } from 'contentlayer/generated'
import dayjs from 'dayjs'
import { type GetStaticProps, type InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import heptabaseLinks from '../static/heptabase-links.json'

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Shio Y. Blog</title>
        <meta name="description" content="Personal Blog by ShioY" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2 className="text-5xl text-shadow shadow-gray-400 font-bold text-gray-800 py-16 ">
          Post
        </h2>
        <div className="space-y-12">
          {posts.map(({ title, date, summary, slug }) => (
            <Link key={slug} href={`/blog/${slug}`} className="group block">
              <h3>
                <span className="text-2xl font-bold text-gray-600 bg-clip-text transition duration-1000 group-hover:text-opacity-0 group-hover:duration-100 bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500">
                  {title}
                </span>
              </h3>
              <p className="text-sm text-gray-600">
                {dayjs(date).format('YYYY年MM月DD日')}
              </p>
              <p className="text-gray-500">{summary}</p>
            </Link>
          ))}
        </div>
        <h2 className="text-5xl text-shadow shadow-gray-400 font-bold text-gray-800 py-16 ">
          Note
        </h2>
        <div className="space-y-12">
          {heptabaseLinks.map(({ title, date, url }) => (
            <Link key={url} href={url} className="group block">
              <h3>
                <span className="text-2xl font-bold text-gray-600 bg-clip-text transition duration-1000 group-hover:text-opacity-0 group-hover:duration-100 bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500">
                  {title}
                </span>
              </h3>
              <p className="text-sm text-gray-600">
                {dayjs(date).format('YYYY年MM月DD日')}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  posts: Post[]
}> = () => {
  return {
    props: {
      posts: allPosts.sort((a, b) => (a.date > b.date ? -1 : 1)),
    },
  }
}
