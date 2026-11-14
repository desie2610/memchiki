import { Avatar, RoundButton, HeaderActions, BrandMark, Brand, HeaderBar, HeaderInner } from './Header.styles.js'
import { isAdminName } from '../../data/memes.js'

function Header({ profile, onOpenProfile }) {
  const isAdmin = isAdminName(profile?.name)

  return (
    <HeaderBar>
      <HeaderInner>
        <Brand href="#" aria-label="мемчики — на главную">
          <BrandMark>м</BrandMark>
          <span>мемчики</span>
        </Brand>
        <HeaderActions>
          <RoundButton type="button" aria-label="Поиск" onClick={() => document.getElementById('search')?.focus()}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
              <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </RoundButton>
          <Avatar
            type="button"
            $admin={isAdmin}
            aria-label={profile ? `Профиль: ${profile.name}` : 'Зарегистрироваться или открыть профиль'}
            title={profile?.name || 'Профиль'}
            onClick={onOpenProfile}
          >
            {isAdmin ? 'А' : profile?.name?.slice(0, 1)?.toLocaleUpperCase('ru') || '👤'}
          </Avatar>
        </HeaderActions>
      </HeaderInner>
    </HeaderBar>
  )
}

export default Header
