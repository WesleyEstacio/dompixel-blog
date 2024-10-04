'use client'
import { Button, FileInput, Modal, Textarea, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { toast } from 'react-toastify'
import { z } from 'zod'

const postSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'The title must be at least 5 characters long' }),
  content: z
    .string()
    .min(10, { message: 'The content must be at least 10 characters long' }),
  coverImage: z.instanceof(File).refine((file) => file instanceof File, {
    message: 'Cover image is required',
  }),
})

type PostData = {
  title: string
  content: string
  coverImage: File | null
}

export function CreatePostButton() {
  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm({
    validate: zodResolver(postSchema),
    initialValues: {
      title: '',
      content: '',
      coverImage: null,
    },
  })

  const handleCreatePost = async (values: PostData) => {
    if (!values.coverImage) {
      alert('Cover image is required')
      return
    }

    console.log(values)

    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('content', values.content)
      formData.append('coverImage', values.coverImage)

      // await api.post('https://jsonplaceholder.typicode.com/posts', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })

      toast.success('Post created successfully!')
      form.reset()
      close()
    } catch (error) {
      console.log(error)
      alert('Failed to create post.')
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create a New Blog Post"
        centered
      >
        <form onSubmit={form.onSubmit(handleCreatePost)}>
          <TextInput
            label="Title"
            placeholder="Enter the post title"
            {...form.getInputProps('title')}
          />

          <Textarea
            label="Content"
            placeholder="Enter the post content"
            {...form.getInputProps('content')}
            minRows={4}
            mt="md"
          />

          <FileInput
            label="Cover Image"
            placeholder="Select a cover image"
            {...form.getInputProps('coverImage')}
            mt="md"
            accept="image/*"
          />

          <Button type="submit" mt="md" w="100%">
            Create Post
          </Button>
        </form>
      </Modal>

      <Button onClick={open}>Create Post</Button>
    </>
  )
}
