import { getAllPosts } from '$lib/posts.js'
import heptabaseLinks from '$lib/heptabase-links.json'

export async function load() {
  const posts = await getAllPosts()
  
  return {
    posts,
    heptabaseLinks
  }
}