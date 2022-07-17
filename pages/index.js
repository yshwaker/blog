import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../lib/mdx'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>ShioY&apos;s Blog</title>
        <meta name="description" content="Personal Blog by ShioY" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2 className="text-5xl font-bold mb-6">Latest</h2>
        {posts.map((item) => (
          <div key={item.slug} className="py-3">
            <div>
              <Link href={`/blog/${item.slug}`}>
                <a className="text-2xl font-bold text-gray-600">{item.title}</a>
              </Link>
            </div>
            <div className="text-sm text-gray-600">{item.date}</div>
            <div className="text-gray-500">{item.summary}</div>
          </div>
        ))}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: {
      posts,
    }, // will be passed to the page component as props
  }
}
