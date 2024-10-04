import { Container, Image, Stack, Text, Title } from '@mantine/core'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { getPostById } from '@/app/http/get-post-by-id'

interface PostPageProps {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostById(params.id)

  // Formatação da data com Intl API
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
  }).format(new Date(post.publishedAt))

  return (
    <Container size="md" my="lg">
      <Image
        src={post.coverImage}
        alt={post.title}
        radius="md"
        mx={'auto'}
        mb="lg"
        width={800}
      />

      <Stack>
        <Title order={2}>{post.title}</Title>
        <Text color="dimmed" size="sm">
          {formattedDate} — Por {post.author}
        </Text>
      </Stack>

      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <Title order={1} mt="lg">
              {children}
            </Title>
          ),
          h2: ({ children }) => (
            <Title order={2} mt="lg">
              {children}
            </Title>
          ),
          h3: ({ children }) => (
            <Title order={3} mt="lg">
              {children}
            </Title>
          ),
          p: ({ children }) => (
            <Text mt="md" size="md" style={{ lineHeight: 1.6 }}>
              {children}
            </Text>
          ),
          ul: ({ children }) => (
            <ul style={{ margin: '16px 0' }}>{children}</ul>
          ),
          li: ({ children }) => (
            <li style={{ marginLeft: '20px' }}>{children}</li>
          ),
          code: ({ children, className }) => {
            const language = className?.replace('language-', '')
            return language ? (
              <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
              >
                {children as string}
              </SyntaxHighlighter>
            ) : (
              <Text
                component="code"
                style={{
                  background: '#f5f5f5',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.9em',
                  color: '#e01e5a',
                }}
              >
                {children}
              </Text>
            )
          },
        }}
      >
        {post.content}
      </ReactMarkdown>
    </Container>
  )
}
