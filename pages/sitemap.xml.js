import { getPostList } from '../lib/mdx'

const Sitemap = () => {}

export const getServerSideProps = ({ res }) => {
  const baseUrl = {
    development: 'http://localhost:5000',
    production: 'https://shioyu.dev',
  }[process.env.NODE_ENV]

  const paths = getPostList().map(({ slug }) => `${baseUrl}/${slug}`)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paths
    .map(
      (url) => `
  <url>
  <loc>${url}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
  </url> 
  `
    )
    .join('')}
  </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
