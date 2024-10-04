import { api } from '../lib/api'

interface GetPostByIdResponse {
  id: number
  title: string
  publishedAt: string
  coverImage: string
  content: string
  author: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getPostById(id: string) {
  // Caso for utilizar um back-end real, adicionar o ID depois de post
  const response = await api.get(`/post`)
  const post: GetPostByIdResponse = response.data

  return post
}
