import { promises as fs } from 'fs'

const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv

  await Promise.all(
    mdFilePaths.map(async (path) => {
      const fileContent = await fs.readFile(path, 'utf8')
      const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n?/)

      if (!frontmatterMatch) {
        return
      }

      const frontmatter = frontmatterMatch[1]

      if (/^draft:\s*true\s*$/m.test(frontmatter)) {
        return
      }

      const updatedOn = `updatedOn: '${new Date().toISOString()}'`
      const updatedFrontmatter = /^updatedOn:/m.test(frontmatter)
        ? frontmatter.replace(/^updatedOn:.*$/m, updatedOn)
        : `${frontmatter}\n${updatedOn}`

      await fs.writeFile(
        path,
        fileContent.replace(frontmatterMatch[0], `---\n${updatedFrontmatter}\n---\n`),
      )
    }),
  )
}

await updateFrontmatter()
