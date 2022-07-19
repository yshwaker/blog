import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import { getAllPosts } from '../../lib/mdx'

export default function BlogPage({ title, date, content }) {
  return (
    <div>
      <Head>
        <title>{title} - ShioY&apos;s Blog</title>
        <meta name="description" content="Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <article>
          <header className="py-20">
            <h2 className="text-4xl font-bold">{title}</h2>
            <p className="text-sm">{date}</p>
          </header>
          <div className="prose">
            <MDXRemote {...content} />
          </div>
        </article>
      </main>
      <footer className="mt-20 text-4xl text-right">𝄇</footer>
    </div>
  )
}

export async function getStaticProps(context) {
  const posts = getAllPosts()
  const { params } = context
  const post = posts.find((post) => post.slug === params.slug)
  const content = await serialize(post.content)

  return {
    props: {
      ...post,
      content,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false, // false or 'blocking'
  }
}
