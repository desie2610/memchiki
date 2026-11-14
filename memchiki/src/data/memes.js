export const STORAGE_KEY = 'memchiki-local-community-v1'
export const PROFILE_STORAGE_KEY = 'memchiki-local-profile-v1'
export const ADMIN_CREDENTIAL_STORAGE_KEY = 'memchiki-admin-credential-v1'
export const ADMIN_NAME = 'Рыжий'

export function isAdminName(name) {
  return typeof name === 'string'
    && name.trim().toLocaleLowerCase('ru') === ADMIN_NAME.toLocaleLowerCase('ru')
}

export const emptyCommunity = {
  categories: [],
  memes: [],
  likedMemeIds: [],
}
