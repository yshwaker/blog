import Head from 'next/head'
import Link from 'next/link'
import { blogPosts } from '../lib/data'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Posts</title>
        <meta name="description" content="Personal Blog by ShioY" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-6xl font-bold mb-6">Posts</h1>
        {blogPosts.map((item) => (
          <div key={item.slug} className="py-3">
            <div>
              <Link href={`/blog/${item.slug}`}>
                <a className="text-2xl font-bold">{item.title}</a>
              </Link>
            </div>
            <div className="text-sm">{item.date.toString()}</div>
          </div>
        ))}
      </main>
    </div>
  )
}
