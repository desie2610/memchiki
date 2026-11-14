const PBKDF2_ITERATIONS = 150_000

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function hexToBytes(hex) {
  if (!/^(?:[0-9a-f]{2})+$/i.test(hex)) return null
  return new Uint8Array(hex.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)))
}

async function derivePasswordHash(password, salt, iterations = PBKDF2_ITERATIONS) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Для пароля нужен безопасный контекст браузера (HTTPS или localhost).')
  }

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    key,
    256,
  )

  return bytesToHex(new Uint8Array(bits))
}

export async function createAdminCredential(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iterations = PBKDF2_ITERATIONS
  const hash = await derivePasswordHash(password, salt, iterations)
  return { salt: bytesToHex(salt), hash, iterations }
}

export async function verifyAdminPassword(password, credential) {
  const salt = hexToBytes(credential?.salt)
  const expectedHash = credential?.hash
  const iterations = credential?.iterations

  if (!salt || typeof expectedHash !== 'string' || !Number.isInteger(iterations) || iterations < 1) {
    throw new Error('Сохранённые данные пароля повреждены. Удали пароль администратора и задай его заново.')
  }

  const actualHash = await derivePasswordHash(password, salt, iterations)
  return actualHash === expectedHash
}
