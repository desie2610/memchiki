import { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle.jsx'
import { ContentLayout, Page, Shell } from './components/layout/layout.styles.js'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Feed from './components/Feed/Feed.jsx'
import Footer from './components/Footer/Footer.jsx'
import ProfileDialog from './components/ProfileDialog/ProfileDialog.jsx'
import {
  ADMIN_CREDENTIAL_STORAGE_KEY,
  emptyCommunity,
  isAdminName,
  PROFILE_STORAGE_KEY,
  STORAGE_KEY,
} from './data/memes.js'
import { createAdminCredential, verifyAdminPassword } from './utils/adminAuth.js'

function App() {
  const [profileState] = useState(readProfile)
  const [profile, setProfile] = useState(profileState.profile)
  const [profileError, setProfileError] = useState(profileState.error)
  const [communityState] = useState(readCommunity)
  const [community, setCommunity] = useState(communityState.community)
  const [communityError, setCommunityError] = useState(communityState.error)
  const [adminCredentialState] = useState(readAdminCredential)
  const [adminCredential, setAdminCredential] = useState(adminCredentialState.credential)
  const [isAdminUnlocked, setAdminUnlocked] = useState(false)
  const [adminError, setAdminError] = useState(adminCredentialState.error)
  const [isProfileOpen, setProfileOpen] = useState(false)

  function saveCommunity(nextCommunity) {
    setCommunity(nextCommunity)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCommunity))
      setCommunityError('')
    } catch (error) {
      setCommunityError(`Не удалось сохранить данные в этом браузере: ${error.message}`)
    }
  }

  function register(name) {
    const newProfile = { id: crypto.randomUUID(), name }
    setProfile(newProfile)
    setProfileOpen(isAdminName(name))

    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile))
      setProfileError('')
    } catch (error) {
      setProfileError(`Не удалось сохранить профиль в этом браузере: ${error.message}`)
      setProfileOpen(true)
    }
  }

  async function unlockAdmin(password) {
    try {
      if (!adminCredential) {
        setAdminError('Сначала задай пароль администратора.')
        return false
      }

      const isValid = await verifyAdminPassword(password, adminCredential)
      if (!isValid) {
        setAdminError('Неверный пароль администратора.')
        return false
      }

      setAdminUnlocked(true)
      setAdminError('')
      return true
    } catch (error) {
      setAdminError(error.message)
      return false
    }
  }

  async function setAdminPassword({ currentPassword, newPassword }) {
    try {
      if (adminCredential) {
        const isValid = await verifyAdminPassword(currentPassword, adminCredential)
        if (!isValid) {
          setAdminError('Предыдущий пароль введён неверно.')
          return false
        }
      }

      const nextCredential = await createAdminCredential(newPassword)
      window.localStorage.setItem(ADMIN_CREDENTIAL_STORAGE_KEY, JSON.stringify(nextCredential))
      setAdminCredential(nextCredential)
      setAdminUnlocked(true)
      setAdminError('')
      return true
    } catch (error) {
      setAdminError(`Не удалось сохранить пароль администратора: ${error.message}`)
      return false
    }
  }

  function toggleLike(memeId) {
    const isLiked = community.likedMemeIds.includes(memeId)
    const likedMemeIds = isLiked
      ? community.likedMemeIds.filter((id) => id !== memeId)
      : [...community.likedMemeIds, memeId]
    const memes = community.memes.map((meme) => (
      meme.id === memeId
        ? { ...meme, likes: Math.max(0, (Number(meme.likes) || 0) + (isLiked ? -1 : 1)) }
        : meme
    ))
    saveCommunity({ ...community, memes, likedMemeIds })
  }

  function deleteMeme(memeId) {
    if (!isAdminUnlocked) return
    const meme = community.memes.find((item) => item.id === memeId)
    if (!meme || !window.confirm(`Удалить мем «${meme.title}»?`)) return

    saveCommunity({
      ...community,
      memes: community.memes.filter((meme) => meme.id !== memeId),
      likedMemeIds: community.likedMemeIds.filter((id) => id !== memeId),
    })
  }

  function deleteCategory(category) {
    if (!isAdminUnlocked) return
    const deletedMemeIds = new Set(
      community.memes.filter((meme) => meme.category === category).map((meme) => meme.id),
    )
    saveCommunity({
      ...community,
      categories: community.categories.filter((item) => item !== category),
      memes: community.memes.filter((meme) => meme.category !== category),
      likedMemeIds: community.likedMemeIds.filter((id) => !deletedMemeIds.has(id)),
    })
  }

  return (
    <>
      <GlobalStyle />
      <Page>
        <Header profile={profile} onOpenProfile={() => setProfileOpen(true)} />
        <Shell>
          <Hero />
          <ContentLayout>
            <Feed
              community={community}
              profile={profile}
              isAdminUnlocked={isAdminUnlocked}
              onCommunityChange={saveCommunity}
              onDeleteMeme={deleteMeme}
              onDeleteCategory={deleteCategory}
              storageError={communityError}
            />
          </ContentLayout>
        </Shell>
        <Footer />
        {isProfileOpen && (
          <ProfileDialog
            profile={profile}
            community={community}
            adminCredential={adminCredential}
            isAdminUnlocked={isAdminUnlocked}
            error={adminError || profileError}
            onClose={() => setProfileOpen(false)}
            onRegister={register}
            onToggleLike={toggleLike}
            onUnlockAdmin={unlockAdmin}
            onSetAdminPassword={setAdminPassword}
            onDeleteMeme={deleteMeme}
          />
        )}
      </Page>
    </>
  )
}

function readAdminCredential() {
  try {
    const saved = window.localStorage.getItem(ADMIN_CREDENTIAL_STORAGE_KEY)
    if (!saved) return { credential: null, error: '' }

    const credential = JSON.parse(saved)
    if (typeof credential.salt !== 'string'
      || typeof credential.hash !== 'string'
      || !Number.isInteger(credential.iterations)) {
      throw new Error('В сохранённых данных пароля неверный формат.')
    }

    return { credential, error: '' }
  } catch (error) {
    return { credential: null, error: `Не удалось загрузить пароль администратора: ${error.message}` }
  }
}

function readCommunity() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return { community: emptyCommunity, error: '' }

    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed.categories) || !Array.isArray(parsed.memes)) {
      throw new Error('В сохранённых данных неверный формат.')
    }

    return {
      community: {
        categories: parsed.categories.filter((category) => typeof category === 'string'),
        memes: parsed.memes.filter((meme) => (
          meme && typeof meme.id === 'string'
          && typeof meme.title === 'string'
          && typeof meme.category === 'string'
        )).map((meme) => ({ ...meme, likes: Number(meme.likes) || 0 })),
        likedMemeIds: Array.isArray(parsed.likedMemeIds)
          ? parsed.likedMemeIds.filter((id) => typeof id === 'string')
          : [],
      },
      error: '',
    }
  } catch (error) {
    return {
      community: emptyCommunity,
      error: `Не удалось загрузить сохранённые мемы: ${error.message}`,
    }
  }
}

function readProfile() {
  try {
    const saved = window.localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!saved) return { profile: null, error: '' }

    const profile = JSON.parse(saved)
    if (typeof profile.id !== 'string' || typeof profile.name !== 'string' || !profile.name.trim()) {
      throw new Error('В сохранённом профиле неверный формат.')
    }

    return { profile, error: '' }
  } catch (error) {
    return { profile: null, error: `Не удалось загрузить профиль: ${error.message}` }
  }
}

export default App
