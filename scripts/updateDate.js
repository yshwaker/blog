import { promises as fs } from 'fs'
import matter from 'gray-matter'

const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv

  mdFilePaths.forEach(async (path) => {
    const file = matter.read(path)
    const { data: currentFrontmatter } = file

    if (currentFrontmatter.draft !== true) {
      const updatedFrontmatter = {
        ...currentFrontmatter,
        updatedOn: new Date().toISOString(),
      }
      file.data = updatedFrontmatter
      const updatedFileContent = matter.stringify(file)
      fs.writeFile(path, updatedFileContent)
    }
  })
}

updateFrontmatter()
