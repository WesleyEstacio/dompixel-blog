import { Grid, Title } from '@mantine/core'
import { Suspense } from 'react'

import { PostCard } from './components/Post'
import { getPosts } from './http/get-posts'

export default async function Home() {
  const posts = await getPosts()

  return (
    <>
      <Title>Posts</Title>

      <Grid gutter="md" mt={'md'}>
        <Suspense fallback={'Carregando...'}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Suspense>
      </Grid>
    </>
  )
}
