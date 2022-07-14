import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const contentDir = path.join(process.cwd(), 'content')

export function getAllPosts() {
  const allPosts = fs.readdirSync(contentDir)
  console.log(allPosts)

  return allPosts
    .filter((filename) => filename.includes('.md') || filename.includes('.mdx'))
    .map((filename) => {
      const slug = filename.replace('.md', '')
      const fileContents = fs.readFileSync(
        path.join(contentDir, filename),
        'utf8'
      )

      const { data, content } = matter(fileContents)

      return {
        ...data,
        slug,
        content,
      }
    })
}
