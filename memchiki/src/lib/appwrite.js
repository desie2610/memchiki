import { Account, Client, ID, Permission, Query, Role, Storage, TablesDB } from 'appwrite'

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID

if (!endpoint || !projectId) {
  throw new Error('Не задана конфигурация Appwrite. Заполни VITE_APPWRITE_ENDPOINT и VITE_APPWRITE_PROJECT_ID в .env.local.')
}

export const client = new Client().setEndpoint(endpoint).setProject(projectId)
export const account = new Account(client)
const tables = new TablesDB(client)
const storage = new Storage(client)

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID
const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID
const tableIds = {
  categories: import.meta.env.VITE_APPWRITE_CATEGORIES_TABLE_ID,
  memes: import.meta.env.VITE_APPWRITE_MEMES_TABLE_ID,
  likes: import.meta.env.VITE_APPWRITE_LIKES_TABLE_ID,
}

function required(value, label) {
  if (!value) throw new Error(`В .env.local не задан ${label}.`)
  return value
}

function documentPermissions(userId) {
  const adminTeamId = import.meta.env.VITE_APPWRITE_ADMIN_TEAM_ID
  const admin = adminTeamId ? Role.team(adminTeamId) : null
  return [
    Permission.read(Role.any()),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
    ...(admin ? [Permission.update(admin), Permission.delete(admin)] : []),
  ]
}

export function getFileUrl(fileId) {
  return fileId ? storage.getFileView(required(bucketId, 'VITE_APPWRITE_BUCKET_ID'), fileId) : ''
}

export async function getCurrentUser() {
  try { return await account.get() } catch { return null }
}

export async function getAdminStatus() {
  const adminTeamId = import.meta.env.VITE_APPWRITE_ADMIN_TEAM_ID
  if (!adminTeamId) return false
  try {
    const result = await account.listMemberships({ total: false })
    return result.memberships.some((membership) => membership.teamId === adminTeamId)
  } catch {
    return false
  }
}

export async function registerAccount({ name, email, password }) {
  await account.create({ userId: ID.unique(), name, email, password })
  return account.createEmailPasswordSession({ email, password })
}

export function signIn({ email, password }) {
  return account.createEmailPasswordSession({ email, password })
}

export function signOut() {
  return account.deleteSession({ sessionId: 'current' })
}

export async function loadCommunity(userId) {
  const database = required(databaseId, 'VITE_APPWRITE_DATABASE_ID')
  const [categoryResult, memeResult, likeResult] = await Promise.all([
    tables.listRows({ databaseId: database, tableId: required(tableIds.categories, 'VITE_APPWRITE_CATEGORIES_TABLE_ID'), queries: [Query.limit(500)] }),
    tables.listRows({ databaseId: database, tableId: required(tableIds.memes, 'VITE_APPWRITE_MEMES_TABLE_ID'), queries: [Query.orderDesc('$createdAt'), Query.limit(500)] }),
    tables.listRows({ databaseId: database, tableId: required(tableIds.likes, 'VITE_APPWRITE_LIKES_TABLE_ID'), queries: [Query.limit(5000)] }),
  ])
  const likes = likeResult.rows.map((like) => JSON.parse(like.payload))
  const likeCounts = likes.reduce((counts, like) => ({ ...counts, [like.memeId]: (counts[like.memeId] || 0) + 1 }), {})
  return {
    categories: categoryResult.rows.map((item) => item.name),
    categoryRows: categoryResult.rows.map((item) => ({ id: item.$id, name: item.name })),
    memes: memeResult.rows.map((item) => {
      const meme = JSON.parse(item.payload)
      return { ...meme, id: item.$id, image: getFileUrl(meme.imageFileId), likes: likeCounts[item.$id] || 0 }
    }),
    likedMemeIds: userId ? likes.filter((like) => like.userId === userId).map((like) => like.memeId) : [],
  }
}

export function createCategory(name, userId) {
  return tables.createRow({ databaseId: required(databaseId, 'VITE_APPWRITE_DATABASE_ID'), tableId: required(tableIds.categories, 'VITE_APPWRITE_CATEGORIES_TABLE_ID'), rowId: ID.unique(), data: { name }, permissions: documentPermissions(userId) })
}

export async function createMeme(meme, userId) {
  let imageFileId = ''
  if (meme.imageFile) {
    const uploaded = await storage.createFile({ bucketId: required(bucketId, 'VITE_APPWRITE_BUCKET_ID'), fileId: ID.unique(), file: meme.imageFile, permissions: documentPermissions(userId) })
    imageFileId = uploaded.$id
  }
  return tables.createRow({ databaseId: required(databaseId, 'VITE_APPWRITE_DATABASE_ID'), tableId: required(tableIds.memes, 'VITE_APPWRITE_MEMES_TABLE_ID'), rowId: ID.unique(), data: { payload: JSON.stringify({ ...meme, imageFile: undefined, imageFileId, authorId: userId }) }, permissions: documentPermissions(userId) })
}

export async function toggleLike(memeId, userId, isLiked) {
  const database = required(databaseId, 'VITE_APPWRITE_DATABASE_ID')
  const tableId = required(tableIds.likes, 'VITE_APPWRITE_LIKES_TABLE_ID')
  const id = `${userId}-${memeId}`
  if (isLiked) return tables.deleteRow({ databaseId: database, tableId, rowId: id })
  return tables.createRow({ databaseId: database, tableId, rowId: id, data: { payload: JSON.stringify({ memeId, userId }) }, permissions: documentPermissions(userId) })
}

export async function deleteMeme(meme) {
  await tables.deleteRow({ databaseId: required(databaseId, 'VITE_APPWRITE_DATABASE_ID'), tableId: required(tableIds.memes, 'VITE_APPWRITE_MEMES_TABLE_ID'), rowId: meme.id })
  if (meme.imageFileId) await storage.deleteFile({ bucketId: required(bucketId, 'VITE_APPWRITE_BUCKET_ID'), fileId: meme.imageFileId })
}

export function deleteCategory(categoryId) {
  return tables.deleteRow({ databaseId: required(databaseId, 'VITE_APPWRITE_DATABASE_ID'), tableId: required(tableIds.categories, 'VITE_APPWRITE_CATEGORIES_TABLE_ID'), rowId: categoryId })
}
