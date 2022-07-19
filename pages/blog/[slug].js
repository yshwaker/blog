import React from 'react'
import Head from 'next/head'
import { getMDXComponent } from 'mdx-bundler/client'
import { getPostList, getPostBySlug } from '../../lib/mdx'

export default function BlogPage({ frontmatter, code }) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <div>
      <Head>
        <title>{`${frontmatter.title} - Shio Y. Blog`}</title>
        <meta name="description" content="Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <article>
          <header className="py-20">
            <h2 className="text-5xl font-bold">{frontmatter.title}</h2>
            <p className="text-sm pt-2 text-gray-500">{frontmatter.date}</p>
          </header>
          <div className="prose max-w-none">
            <Component />
          </div>
        </article>
      </main>
      <footer className="mt-20 text-4xl text-right">𝄇</footer>
    </div>
  )
}

export async function getStaticProps(context) {
  const { params } = context
  const post = await getPostBySlug(params.slug)

  return {
    props: post,
  }
}

export async function getStaticPaths() {
  const posts = getPostList()
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false, // false or 'blocking'
  }
}
