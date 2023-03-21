import dayjs from 'dayjs'
import Head from 'next/head'
import Link from 'next/link'
import { getPostList } from '../lib/mdx'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Shio Y. Blog</title>
        <meta name="description" content="Personal Blog by ShioY" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2 className="text-5xl font-bold py-16">Latest</h2>
        <div className="space-y-12">
          {posts.map(({ frontmatter, slug }) => (
            <div key={slug}>
              <h3>
                <Link href={`/blog/${slug}`}>
                  <a className="text-2xl font-bold text-gray-600 bg-clip-text transition ease-in-out duration-500 hover:text-opacity-0 bg-gradient-to-r from-violet-400 to-blue-400">
                    {frontmatter.title}
                  </a>
                </Link>
              </h3>
              <div className="text-sm text-gray-600">
                {dayjs(frontmatter.date).format('YYYY年MM月DD日')}
              </div>
              <div className="text-gray-500">{frontmatter.summary}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
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
