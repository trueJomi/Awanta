import { API_URL } from '../contexts/env.context'
import { auth } from './AuthFirebase.service'

interface TokenResponse {
  accessToken: string
  idToken: string
}

interface RevokeToken {
  status: boolean
  token: string
}

export const revokeToken = async (token: string): Promise<any> => {
  const fun = await fetch(`${API_URL}/revokeToken`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      refreshToken: token
    })
  })
  if (fun.status >= 300) {
    const result = await fun.json()
    throw new Error(result.message as string)
  }
  const result = await fun.json()
  return result as RevokeToken
}

export const createGoogleAuthLink = async () => {
  try {
    const request = await fetch(`${API_URL}/createAuthLink`, {
      method: 'GET'
    })
    const response = await request.json()
    if (request.status >= 300) {
      const result = await request.json()
      throw new Error(result.message as string)
    }
    window.location.href = response.url
  } catch (error) {
    throw new Error('Issue with Login')
  }
}

export const getValidToken = async (refreshToken: string) => {
  const fun = await fetch(`${API_URL}/getValidToken`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      refreshToken
    })
  })
  if (fun.status >= 300) {
    const result = await fun.json()
    console.log(result.message)
    if (result.message === 'Error: invalid_token') {
      void auth.signOut()
    }
    throw new Error(result.message as string)
  }
  const result = await fun.json()
  const { body } = result
  return body as TokenResponse
}

export const getMessagesGoogle = async (id: string, accessToken: string) => {
  const fun = await fetch(`${API_URL}/getGmailsTransactions`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      id,
      accessToken
    })
  })
  if (fun.status >= 300) {
    const result = await fun.json()
    if (result.message === 'Error: invalid_token') {
      void auth.signOut()
    }
    throw new Error(result.message as string)
  }
  const result = await fun.json()
  return result
}
