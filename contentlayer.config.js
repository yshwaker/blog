import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: 'posts/*.mdx',
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    summary: { type: 'string', required: true },
    updatedOn: { type: 'date', required: false },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    // rehypePlugins: [highlight],
  },
})
