import { useState } from 'react'
import MemeCard from '../MemeCard/MemeCard.jsx'
import {
  Actions,
  AdminBadge,
  AdminSection,
  AdminTitle,
  Button,
  CloseButton,
  Description,
  Dialog,
  EmptyState,
  ErrorMessage,
  Form,
  HeadingRow,
  Input,
  Label,
  LikedList,
  Overlay,
  PasswordForm,
  ProfileAvatar,
  ProfileHeader,
  ScopeNote,
  SecurityNote,
  SectionTitle,
  StatCard,
  StatLabel,
  Stats,
  StatValue,
  Title,
} from './ProfileDialog.styles.js'
import { isAdminName } from '../../data/memes.js'

function ProfileDialog({
  profile,
  community,
  adminCredential,
  isAdminUnlocked,
  onClose,
  onRegister,
  onToggleLike,
  onUnlockAdmin,
  onSetAdminPassword,
  onDeleteMeme,
  error,
}) {
  const [name, setName] = useState('')
  const [formError, setFormError] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [adminFormError, setAdminFormError] = useState('')
  const [adminStatus, setAdminStatus] = useState('')
  const isAdmin = isAdminName(profile?.name)

  function validateNewPassword() {
    if (newPassword.length < 8) {
      setAdminFormError('Пароль должен содержать не менее 8 символов.')
      return false
    }

    if (newPassword !== confirmPassword) {
      setAdminFormError('Пароли не совпадают.')
      return false
    }

    return true
  }

  async function handleAdminSubmit(event) {
    event.preventDefault()
    setAdminFormError('')
    setAdminStatus('')

    if (adminCredential && !isAdminUnlocked) {
      const unlocked = await onUnlockAdmin(adminPassword)
      if (unlocked) {
        setAdminPassword('')
        setAdminStatus('Вход администратора выполнен.')
      }
      return
    }

    if (!validateNewPassword()) return

    const saved = await onSetAdminPassword({
      currentPassword: adminCredential ? currentPassword : '',
      newPassword,
    })

    if (saved) {
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setAdminStatus(adminCredential ? 'Пароль администратора изменён.' : 'Пароль администратора задан.')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedName = name.trim()

    if (!trimmedName) {
      setFormError('Укажи имя профиля.')
      return
    }

    if (trimmedName.length > 32) {
      setFormError('Имя должно быть короче 33 символов.')
      return
    }

    onRegister(trimmedName)
  }

  const ownMemes = profile
    ? community.memes.filter((meme) => meme.authorId === profile.id)
    : []
  const totalLikes = ownMemes.reduce((sum, meme) => sum + (Number(meme.likes) || 0), 0)
  const likedMemes = community.memes.filter((meme) => community.likedMemeIds.includes(meme.id))

  return (
    <Overlay>
      <Dialog role="dialog" aria-modal="true" aria-labelledby="profile-dialog-title">
        <HeadingRow>
          <div>
            <Title id="profile-dialog-title">{profile ? 'Твой профиль' : 'Регистрация'}</Title>
            <Description>
              {profile ? 'Твоя мемная статистика и сохранённые реакции.' : 'Создай локальный профиль, чтобы отмечать свои мемы.'}
            </Description>
          </div>
          <CloseButton type="button" aria-label="Закрыть" onClick={onClose}>×</CloseButton>
        </HeadingRow>

        {profile ? (
          <>
            <ProfileHeader>
              <ProfileAvatar $admin={isAdmin} aria-hidden="true">
                {isAdmin ? 'А' : profile.name.slice(0, 1).toLocaleUpperCase('ru')}
              </ProfileAvatar>
              <div>
                <Title>
                  {profile.name}
                  {isAdmin && <AdminBadge title="Администратор" aria-label="Администратор">А</AdminBadge>}
                </Title>
                <Description>Участник мемной команды</Description>
              </div>
            </ProfileHeader>
            {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
            <Stats>
              <StatCard>
                <StatValue>{ownMemes.length}</StatValue>
                <StatLabel>создано мемов</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{totalLikes}</StatValue>
                <StatLabel>лайков на твоих мемах</StatLabel>
              </StatCard>
            </Stats>
            <SectionTitle>Мемы, которые ты лайкнул</SectionTitle>
            {likedMemes.length ? (
              <LikedList>
                {likedMemes.map((meme) => (
                  <MemeCard
                    key={meme.id}
                    meme={meme}
                    isLiked
                    isAdminAuthor={isAdminName(meme.author)}
                    canDelete={isAdminUnlocked}
                    onDelete={() => onDeleteMeme(meme.id)}
                    onToggleLike={() => onToggleLike(meme.id)}
                  />
                ))}
              </LikedList>
            ) : (
              <EmptyState>Пока нет лайков. Отметь сердечком мемы, которые тебе понравились.</EmptyState>
            )}
            {isAdmin && (
              <AdminSection>
                <AdminTitle>Настройки администратора</AdminTitle>
                <Description>
                  {adminCredential
                    ? isAdminUnlocked
                      ? 'Админ-доступ активен. Для смены пароля укажи предыдущий.'
                      : 'Введи пароль, чтобы получить права администратора.'
                    : 'Задай пароль, чтобы включить права администратора.'}
                </Description>
                <PasswordForm onSubmit={handleAdminSubmit}>
                  {adminCredential && isAdminUnlocked && (
                    <Label>
                      Текущий пароль
                      <Input
                        type="password"
                        autoComplete="current-password"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        required
                      />
                    </Label>
                  )}
                  {adminCredential && !isAdminUnlocked ? (
                    <Label>
                      Пароль администратора
                      <Input
                        type="password"
                        autoComplete="current-password"
                        value={adminPassword}
                        onChange={(event) => setAdminPassword(event.target.value)}
                        required
                      />
                    </Label>
                  ) : (
                    <>
                      <Label>
                        Новый пароль
                        <Input
                          type="password"
                          autoComplete="new-password"
                          value={newPassword}
                          onChange={(event) => setNewPassword(event.target.value)}
                          minLength={8}
                          required
                        />
                      </Label>
                      <Label>
                        Повтори пароль
                        <Input
                          type="password"
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          minLength={8}
                          required
                        />
                      </Label>
                    </>
                  )}
                  {adminFormError && <ErrorMessage role="alert">{adminFormError}</ErrorMessage>}
                  {adminStatus && <Description role="status">{adminStatus}</Description>}
                  <Actions>
                    <Button type="submit">
                      {adminCredential
                        ? isAdminUnlocked ? 'Изменить пароль' : 'Войти как администратор'
                        : 'Задать пароль'}
                    </Button>
                  </Actions>
                </PasswordForm>
                <SecurityNote>
                  Пароль хранится в виде хеша в этом браузере. Это локальная защита интерфейса, не серверная авторизация.
                </SecurityNote>
              </AdminSection>
            )}
            <ScopeNote>Профиль и статистика сохранены только в этом браузере — аккаунт не синхронизируется между устройствами.</ScopeNote>
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Label>
              Как тебя называть?
              <Input
                autoFocus
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setFormError('')
                }}
                maxLength={32}
                autoComplete="nickname"
                placeholder="Например, Саша"
              />
            </Label>
            {(formError || error) && <ErrorMessage role="alert">{formError || error}</ErrorMessage>}
            <Actions>
              <Button type="submit">Создать профиль</Button>
            </Actions>
            <ScopeNote>Это локальная регистрация без пароля и сервера; имя будет видно рядом с созданными мемами в этом браузере.</ScopeNote>
          </Form>
        )}
      </Dialog>
    </Overlay>
  )
}

export default ProfileDialog
