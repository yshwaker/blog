import dayjs from 'dayjs'
import Head from 'next/head'
import Link from 'next/link'
import { getPostList } from '../lib/mdx'

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Shio Y. Blog</title>
        <meta name="description" content="Personal Blog by ShioY" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2 className="text-5xl text-shadow shadow-gray-400 font-bold text-gray-800 py-16 ">
          Latest
        </h2>
        <div className="space-y-12">
          {posts.map(({ frontmatter, slug }) => (
            <Link key={slug} href={`/blog/${slug}`}>
              <a className="group block">
                <h3>
                  <span className="text-2xl font-bold text-gray-600 bg-clip-text transition duration-1000 group-hover:text-opacity-0 group-hover:duration-100 bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500">
                    {frontmatter.title}
                  </span>
                </h3>
                <p className="text-sm text-gray-600">
                  {dayjs(frontmatter.date).format('YYYY年MM月DD日')}
                </p>
                <p className="text-gray-500">{frontmatter.summary}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const posts = getPostList().sort((a, b) =>
    a.frontmatter.date > b.frontmatter.date ? -1 : 1
  )
  return {
    props: {
      posts,
    }, // will be passed to the page component as props
  }
}
