import Head from 'next/head'
import Link from 'next/link'
import { blogPosts } from '../../lib/data'

export default function BlogPage({ title, date, content }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Link href="/">
            <a>Back</a>
          </Link>
        </div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="text-sm">{date}</div>
        <div>{content}</div>
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  const { params } = context
  return {
    props: blogPosts.find((post) => post.slug === params.slug), // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  return {
    paths: blogPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: true, // false or 'blocking'
  }
}
