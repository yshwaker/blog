import { allPosts, type Post } from 'contentlayer/generated'
import dayjs from 'dayjs'
import type { MDXComponents } from 'mdx/types'
import { type GetStaticProps, type InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

import { VisuallyHidden } from '../../components/VisuallyHidden'

function goTop() {
  window.scrollTo(0, 0)
}

export default function BlogPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXContent = useMDXComponent(post.body.code)
  return (
    <>
      <Head>
        <title>{`${post.title} - Shio Y. Blog`}</title>
        <meta name="description" content="Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-20">
        <h2 className="text-4xl md:text-5xl font-bold">{post.title}</h2>
      </div>
      <main className="prose max-w-none">
        <MDXContent />
      </main>
      <p className="text-sm mt-10 text-gray-500 text-right">
        写于 {dayjs(post.date).format('YYYY年MM月DD日')}
      </p>
      <div className="mt-20 text-4xl flex justify-end">
        <div className="group">
          <button
            role="button"
            className="group-hover:rotate-90 px-4 py-2 transition-transform"
            onClick={goTop}
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

export const getStaticProps: GetStaticProps<{
  post: Post
}> = ({ params }) => {
  const post = allPosts.find((post) => post.slug === params?.slug)

  if (!post) {
    return { notFound: true }
  }

  return { props: { post } }
}

export function getStaticPaths() {
  return {
    paths: allPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false, // false or 'blocking'
  }
}
