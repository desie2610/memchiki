import { useCallback, useEffect, useState } from 'react'
import GlobalStyle from './styles/GlobalStyle.jsx'
import { ContentLayout, Page, Shell } from './components/layout/layout.styles.js'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Feed from './components/Feed/Feed.jsx'
import Footer from './components/Footer/Footer.jsx'
import ProfileDialog from './components/ProfileDialog/ProfileDialog.jsx'
import { emptyCommunity } from './data/memes.js'
import { createCategory, createMeme, deleteMeme, getCurrentUser, loadCommunity, registerAccount, signIn, signOut, toggleLike } from './lib/appwrite.js'

function App() {
  const [profile, setProfile] = useState(null)
  const [community, setCommunity] = useState(emptyCommunity)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [isProfileOpen, setProfileOpen] = useState(false)

  const refresh = useCallback(async (user) => {
    setLoading(true)
    try {
      setCommunity(await loadCommunity(user?.$id))
      setError('')
    } catch (loadError) { setError(`Не удалось загрузить данные из Appwrite: ${loadError.message}`) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { getCurrentUser().then(async (user) => { setProfile(user); await refresh(user) }) }, [refresh])

  async function authenticate(mode, values) {
    try {
      if (mode === 'register') await registerAccount(values)
      else await signIn(values)
      const user = await getCurrentUser()
      setProfile(user)
      await refresh(user)
      setProfileOpen(false)
      return true
    } catch (authError) { setError(authError.message); return false }
  }

  async function handleSignOut() {
    try { await signOut(); setProfile(null); await refresh(null) } catch (signOutError) { setError(signOutError.message) }
  }

  async function handleCreateCategory(name) {
    if (!profile) { setProfileOpen(true); return false }
    try { await createCategory(name, profile.$id); await refresh(profile); return true } catch (saveError) { setError(saveError.message); return false }
  }

  async function handleCreateMeme(meme) {
    if (!profile) { setProfileOpen(true); return false }
    try { await createMeme(meme, profile.$id); await refresh(profile); return true } catch (saveError) { setError(saveError.message); return false }
  }

  async function handleToggleLike(memeId) {
    if (!profile) { setProfileOpen(true); return }
    try { await toggleLike(memeId, profile.$id, community.likedMemeIds.includes(memeId)); await refresh(profile) } catch (likeError) { setError(likeError.message) }
  }

  async function handleDeleteMeme(memeId) {
    if (!window.confirm('Удалить этот мем?')) return
    try { await deleteMeme(memeId); await refresh(profile) } catch (deleteError) { setError(deleteError.message) }
  }

  const publicProfile = profile ? { id: profile.$id, name: profile.name } : null
  return <>
    <GlobalStyle />
    <Page>
      <Header profile={publicProfile} onOpenProfile={() => setProfileOpen(true)} />
      <Shell><Hero /><ContentLayout><Feed community={community} profile={publicProfile} onCreateCategory={handleCreateCategory} onCreateMeme={handleCreateMeme} onToggleLike={handleToggleLike} onDeleteMeme={handleDeleteMeme} storageError={error || (loading ? 'Загрузка…' : '')} /></ContentLayout></Shell>
      <Footer />
      {isProfileOpen && <ProfileDialog profile={profile} community={community} error={error} onClose={() => setProfileOpen(false)} onAuthenticate={authenticate} onSignOut={handleSignOut} onToggleLike={handleToggleLike} />}
    </Page>
  </>
}

export default App
