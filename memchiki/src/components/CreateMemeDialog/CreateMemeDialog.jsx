import { Button, Actions, ErrorMessage, Hint, Preview, HiddenFileInput, UploadArea, Textarea, Select, Input, Label, FieldGrid, Form, CloseButton, Description, Title, HeadingRow, Dialog, Overlay } from './CreateMemeDialog.styles.js'
import { useEffect, useState } from 'react'







































const MAX_IMAGE_SIZE = 2 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Не удалось прочитать изображение.'))
    reader.readAsDataURL(file)
  })
}

function CreateMemeDialog({ categories, selectedCategory, profile, onClose, onCreate }) {
  const [category, setCategory] = useState(selectedCategory || categories[0] || '')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [author, setAuthor] = useState(profile?.name || '')
  const [tag, setTag] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [error, setError] = useState('')

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
  }, [imagePreview])

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    setError('')

    if (!file) {
      setImageFile(null)
      setImagePreview('')
      return
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageFile(null)
      setImagePreview('')
      setError('Подойдут изображения JPG, PNG, WebP или GIF.')
      event.target.value = ''
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageFile(null)
      setImagePreview('')
      setError('Размер картинки не должен превышать 2 МБ.')
      event.target.value = ''
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!category) {
      setError('Сначала создай категорию.')
      return
    }

    if (!title.trim()) {
      setError('Добавь заголовок мема.')
      return
    }

    try {
      const image = imageFile ? await readImage(imageFile) : ''
      onCreate({
        id: crypto.randomUUID(),
        category,
        title: title.trim(),
        text: text.trim(),
        author: author.trim() || profile?.name || '',
        authorId: profile?.id || '',
        tag: tag.trim() ? `#${tag.trim().replace(/^#+/, '')}` : '',
        image,
        createdAt: new Date().toISOString(),
        likes: 0,
      })
    } catch (readError) {
      setError(readError.message)
    }
  }

  return (
    <Overlay>
      <Dialog role="dialog" aria-modal="true" aria-labelledby="meme-dialog-title">
        <HeadingRow>
          <div>
            <Title id="meme-dialog-title">Создать мем</Title>
            <Description>Добавь подпись, картинку или и то и другое.</Description>
          </div>
          <CloseButton type="button" aria-label="Закрыть" onClick={onClose}>×</CloseButton>
        </HeadingRow>
        <Form onSubmit={handleSubmit}>
          <Label>
            Категория
            <Select value={category} onChange={(event) => setCategory(event.target.value)} required>
              <option value="" disabled>Выбери категорию</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </Select>
          </Label>
          <Label>
            Заголовок мема
            <Input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} required placeholder="Коротко: в чём шутка?" />
          </Label>
          <Label>
            Текст или подпись
            <Textarea value={text} onChange={(event) => setText(event.target.value)} maxLength={500} placeholder="Можно добавить контекст или текст для мема" />
          </Label>
          <UploadArea>
            {imagePreview && <Preview src={imagePreview} alt="Предпросмотр мема" />}
            {imageFile ? imageFile.name : '＋ Нажми, чтобы добавить картинку'}
            <Hint>JPG, PNG, WebP или GIF · до 2 МБ</Hint>
            <HiddenFileInput type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileChange} />
          </UploadArea>
          <FieldGrid>
            <Label>
              Автор
              <Input value={author} onChange={(event) => setAuthor(event.target.value)} maxLength={40} placeholder="Необязательно" />
            </Label>
            <Label>
              Тег
              <Input value={tag} onChange={(event) => setTag(event.target.value)} maxLength={24} placeholder="Например, жиза" />
            </Label>
          </FieldGrid>
          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
          <Actions>
            <Button type="button" onClick={onClose}>Отмена</Button>
            <Button type="submit" $primary>Опубликовать мем</Button>
          </Actions>
        </Form>
      </Dialog>
    </Overlay>
  )
}

export default CreateMemeDialog
