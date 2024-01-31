import {
  getFunctions,
  httpsCallable
  // connectFunctionsEmulator,
} from 'firebase/functions'
// import { API_URL } from '../contexts/env.context'
// import { auth } from './AuthFirebase.service'
import { app } from '../utilities/firebase-config.utilities'

const funtions = getFunctions(app)
// connectFunctionsEmulator(funtions, 'localhost', 5000)

interface TokenResponse {
  accessToken: string
  idToken: string
}

interface RevokeToken {
  status: boolean
  token: string
}

export const revokeToken = async (token: string): Promise<any> => {
  try {
    const fun = httpsCallable(funtions, 'revokeToken')
    const result = await fun({ refreshToken: token })
    return result.data as RevokeToken
  } catch (error) {
    throw new Error(error as string)
  }
}

export const createGoogleAuthLink = async () => {
  try {
    const fun = httpsCallable(funtions, 'createAuthLink')
    const result = await fun()
    window.location.href = result.data as string
    return result.data as string
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getValidToken = async (refreshToken: string) => {
  try {
    const fun = httpsCallable(funtions, 'getValidToken')
    const result = await fun({ refreshToken })
    const { body } = result.data as any
    return body as TokenResponse
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getMessagesGoogle = async (accessToken: string) => {
  try {
    const fun = httpsCallable(funtions, 'getGmailsTransactions')
    const result = await fun({ accessToken })
    const { body } = result.data as any
    return body
  } catch (error) {
    throw new Error(error as string)
  }
}
