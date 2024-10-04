'use client'
import { Card, Grid, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

import { GetPostsResponse } from '../http/get-posts'

interface PostCardProps {
  post: GetPostsResponse
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Grid.Col span={{ base: 12, xs: 12, sm: 6, lg: 3 }}>
      <Link href={'post/1'} passHref>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={post.coverImage} alt="" width={750} height={475} />
          </Card.Section>

          <Text size={'lg'} mt={'md'} lineClamp={1} fw={500}>
            {post.title}
          </Text>

          <Text lineClamp={2} mt={'xs'} fw={400} ta={'justify'}>
            {post.content}
          </Text>

          <Text lineClamp={1} mt={'xs'} fw={300}>
            {new Intl.DateTimeFormat('pt-BR', {
              timeZone: 'America/Sao_Paulo',
              dateStyle: 'short',
            }).format(new Date(post.publishedAt))}
          </Text>
        </Card>
      </Link>
    </Grid.Col>
  )
}
