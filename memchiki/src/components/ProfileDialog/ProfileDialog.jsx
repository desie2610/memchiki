import { useState } from 'react'
import MemeCard from '../MemeCard/MemeCard.jsx'
import { Actions, Button, CloseButton, Description, Dialog, EmptyState, ErrorMessage, Form, HeadingRow, Input, Label, LikedList, Overlay, ProfileAvatar, ProfileHeader, ScopeNote, SectionTitle, StatCard, StatLabel, Stats, StatValue, Title } from './ProfileDialog.styles.js'

function ProfileDialog({ profile, community, onClose, onAuthenticate, onSignOut, onToggleLike, error }) {
  const [mode, setMode] = useState('register')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)
  const ownMemes = profile ? community.memes.filter((meme) => meme.authorId === profile.$id) : []
  const likedMemes = community.memes.filter((meme) => community.likedMemeIds.includes(meme.id))

  async function submit(event) {
    event.preventDefault(); setFormError('')
    if (mode === 'register' && (!name.trim() || name.trim().length > 32)) return setFormError('Укажи имя до 32 символов.')
    if (password.length < 8) return setFormError('Пароль должен содержать не менее 8 символов.')
    setBusy(true)
    const ok = await onAuthenticate(mode, { name: name.trim(), email: email.trim(), password })
    setBusy(false)
    if (!ok) setFormError('Не удалось выполнить вход. Проверь данные и настройки Appwrite.')
  }

  return <Overlay><Dialog role="dialog" aria-modal="true" aria-labelledby="profile-dialog-title">
    <HeadingRow><div><Title id="profile-dialog-title">{profile ? 'Твой профиль' : mode === 'register' ? 'Регистрация' : 'Вход'}</Title><Description>{profile ? 'Твоя мемная статистика и реакции синхронизируются с аккаунтом.' : 'Аккаунт нужен, чтобы публиковать мемы и ставить лайки.'}</Description></div><CloseButton type="button" aria-label="Закрыть" onClick={onClose}>×</CloseButton></HeadingRow>
    {profile ? <>
      <ProfileHeader><ProfileAvatar aria-hidden="true">{profile.name.slice(0, 1).toLocaleUpperCase('ru')}</ProfileAvatar><div><Title>{profile.name}</Title><Description>{profile.email}</Description></div></ProfileHeader>
      <Stats><StatCard><StatValue>{ownMemes.length}</StatValue><StatLabel>создано мемов</StatLabel></StatCard><StatCard><StatValue>{ownMemes.reduce((sum, meme) => sum + meme.likes, 0)}</StatValue><StatLabel>лайков на твоих мемах</StatLabel></StatCard></Stats>
      <SectionTitle>Мемы, которые ты лайкнул</SectionTitle>{likedMemes.length ? <LikedList>{likedMemes.map((meme) => <MemeCard key={meme.id} meme={meme} isLiked onToggleLike={() => onToggleLike(meme.id)} />)}</LikedList> : <EmptyState>Пока нет лайков.</EmptyState>}
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}<Actions><Button type="button" onClick={onSignOut}>Выйти</Button></Actions>
    </> : <Form onSubmit={submit}>
      {mode === 'register' && <Label>Имя<Input autoFocus value={name} onChange={(event) => setName(event.target.value)} maxLength={32} autoComplete="name" /></Label>}
      <Label>Email<Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></Label>
      <Label>Пароль<Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} required /></Label>
      {(formError || error) && <ErrorMessage role="alert">{formError || error}</ErrorMessage>}<Actions><Button type="submit" disabled={busy}>{busy ? 'Подождите…' : mode === 'register' ? 'Создать аккаунт' : 'Войти'}</Button><Button type="button" onClick={() => { setMode(mode === 'register' ? 'login' : 'register'); setFormError('') }}>{mode === 'register' ? 'Уже есть аккаунт' : 'Создать аккаунт'}</Button></Actions>
      <ScopeNote>Данные хранятся в Appwrite и доступны после входа с любого устройства.</ScopeNote>
    </Form>}
  </Dialog></Overlay>
}

export default ProfileDialog
