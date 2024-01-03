import { clearLocalStorageObject } from '../utilities/localStorage.utilities'
import { expiredToken, getToken } from '../utilities/token.utilities'
import { createGoogleAuthLink } from './FirebaseFuntions.service'

export const googleLogin = async () => {
  await createGoogleAuthLink()
}

export const googleGetAccessToken = async () => {
  return await getToken()
}

export const googleLogOut = async () => {
  await expiredToken()
  clearLocalStorageObject()
}
