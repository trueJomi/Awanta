import { getValidToken, revokeToken } from '../services/FirebaseFuntions.service'
import { getLocalStorageObject, setLocalStorageObject } from './localStorage.utilities'

export const getToken = async (): Promise<{
  accessToken: string
  idToken: string
}> => {
  const storageRaw = getLocalStorageObject()
  if (isTokenExpired()) {
    const token = await getValidTokenFromServer(storageRaw.refreshToken)
    setLocalStorageObject(token.accessToken, storageRaw.refreshToken, newExpirationDate(), token.idToken)
    return {
      accessToken: token.accessToken,
      idToken: token.idToken
    }
  } else {
    return {
      accessToken: storageRaw.accessToken,
      idToken: storageRaw.idToken
    }
  }
}

export const handleTokenFromQueryParams = () => {
  const query = new URLSearchParams(window.location.search)
  const accessToken = query.get('accessToken')
  const refreshToken = query.get('refreshToken')
  const idToken = query.get('idToken')
  const expirationDate = newExpirationDate()
  if (accessToken !== null && refreshToken !== null && idToken !== null) {
    setLocalStorageObject(accessToken, refreshToken, expirationDate, idToken)
  } else {
    throw new Error('No token found')
  }
  return {
    accessToken,
    refreshToken,
    idToken
  }
}

const isTokenExpired = () => {
  const nowDate = Date.now()
  const expirationDate = getLocalStorageObject().expirationDate
  if (nowDate > expirationDate.getTime()) {
    return true // token expired
  }
  return false // valid token
}

const getValidTokenFromServer = async (refreshToken: string) => {
  try {
    const tokens = await getValidToken(refreshToken)
    return tokens
  } catch (error) {
    throw new Error('Issue getting new token')
  }
}

export const expiredToken = async () => {
  const refreshToken = getLocalStorageObject().refreshToken
  await revokeToken(refreshToken)
}

const newExpirationDate = () => {
  const expiration = new Date()
  expiration.setHours(expiration.getHours() + 1)
  return expiration
}
