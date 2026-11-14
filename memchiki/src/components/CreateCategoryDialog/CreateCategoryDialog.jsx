import { 
  Button,
  Actions,
  ErrorMessage,
  Description,
  Input,
  Label,
  Form,
  CloseButton,
  Title,
  HeadingRow,
  Dialog,
  Overlay } from './CreateCategoryDialog.styles.js'
import { useState } from 'react'


function CreateCategoryDialog({ categories, onClose, onCreate }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedName = name.trim()

    if (!trimmedName) {
      setError('Введи название категории.')
      return
    }

    if (trimmedName.length > 32) {
      setError('Название должно быть короче 33 символов.')
      return
    }

    if (categories.some((category) => category.toLocaleLowerCase('ru') === trimmedName.toLocaleLowerCase('ru'))) {
      setError('Такая категория уже есть.')
      return
    }

    onCreate(trimmedName)
  }

  return (
    <Overlay>
      <Dialog role="dialog" aria-modal="true" aria-labelledby="category-dialog-title">
        <HeadingRow>
          <div>
            <Title id="category-dialog-title">Новая категория</Title>
            <Description>Придумай название — мемы в ней появятся после публикации.</Description>
          </div>
          <CloseButton type="button" aria-label="Закрыть" onClick={onClose}>×</CloseButton>
        </HeadingRow>
        <Form onSubmit={handleSubmit}>
          <Label>
            Название
            <Input
              autoFocus
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setError('')
              }}
              maxLength={32}
              placeholder="Например, «Наши релизы»"
            />
          </Label>
          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
          <Actions>
            <Button type="button" onClick={onClose}>Отмена</Button>
            <Button type="submit" $primary>Создать категорию</Button>
          </Actions>
        </Form>
      </Dialog>
    </Overlay>
  )
}

export default CreateCategoryDialog
