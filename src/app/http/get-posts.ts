import { api } from '../lib/api'

export interface GetPostsResponse {
  id: number
  title: string
  publishedAt: string
  coverImage: string
  content: string
  author: string
}

export async function getPosts() {
  const response = await api.get('/posts')
  const posts: GetPostsResponse[] = response.data

  return posts
}
