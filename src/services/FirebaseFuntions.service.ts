import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator
} from 'firebase/functions'
import { app } from '../utilities/firebase-config.utilities'
import { API_URL, DEV_MODE } from '../contexts/env.context'
import { type HttpResponseWrapper } from '../models/utils/HttpInterface'
import { type TransaccionBase } from '../models/Transaccion.model'

const funtions = getFunctions(app)
if (DEV_MODE) {
  connectFunctionsEmulator(funtions, 'localhost', 5000)
}

interface TokenResponse {
  accessToken: string
  idToken: string
}

interface RevokeToken {
  token: string
}

export const revokeToken = async (token: string): Promise<any> => {
  try {
    const result = await fetch(API_URL + '/revokeToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken: token })
    })
    if (result.status >= 300) {
      const data = await result.json() as HttpResponseWrapper<RevokeToken>
      throw new Error('Error al revocar el token:' + data.message)
    }
    const data = await result.json() as HttpResponseWrapper<RevokeToken>
    return data.body.token
  } catch (error) {
    throw new Error(error as string)
  }
}

export const createGoogleAuthLink = async () => {
  try {
    const result = await fetch(API_URL + '/createAuthLink', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (result.status >= 300) {
      const data = await result.json() as HttpResponseWrapper<{ url: string }>
      throw new Error('Error al revocar el token:' + data.message)
    }
    const data = await result.json() as HttpResponseWrapper<{ url: string }>
    window.location.href = data.body.url
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getValidToken = async (refreshToken: string) => {
  try {
    const fun = httpsCallable(funtions, 'getValidToken')
    const result = await fun({ refreshToken })
    const { body } = result.data as HttpResponseWrapper<TokenResponse>
    return body
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getMessagesGoogle = async (accessToken: string) => {
  try {
    const fun = httpsCallable(funtions, 'getGmailsTransactions')
    const result = await fun({ accessToken })
    const { body } = result.data as any
    const dataRaw = body as []
    const data = dataRaw.map((data: TransaccionBase) => {
      return {
        ...data,
        fecha: new Date(data.fecha)
      }
    })
    return data
  } catch (error) {
    throw new Error(error as string)
  }
}
