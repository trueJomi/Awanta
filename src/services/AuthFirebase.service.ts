import { logEvent } from 'firebase/analytics'
import { analytics, app } from '../utilities/firebase-config.utilities'
import { googleLogOut, googleLogin } from './AuthGoogle.service'
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAdditionalUserInfo,
  getAuth,
  signInWithCredential,
  signOut
} from 'firebase/auth'
import { type UserGoogle } from '../models/utils/UserGoogle.model'
import { adapterGoogleUser } from '../adapters/UserGoogle.adapter'
import { UserService } from './User.service'

const userService = new UserService()

export const auth = getAuth(app)

void auth.setPersistence(browserLocalPersistence)

export const loginWithGoogle = async () => {
  logEvent(analytics, 'login')
  await googleLogin()
}

export const loginWithCredentials = async (accessToken: string, idToken: string) => {
  const credentials = GoogleAuthProvider.credential(idToken, accessToken)
  const result = await signInWithCredential(auth, credentials)
  const addInfo = getAdditionalUserInfo(result)
  const exist = await userService.existUserById(result.user.uid)
  if (result.user.email !== null) {
    const existClient = await userService.existClientByEmail(result.user.email)
    if (!existClient) {
      await logOut()
      return false
    } else if (!exist && addInfo?.profile !== null) {
      const googleUser: UserGoogle = {
        id: addInfo?.profile.sub as string,
        nombre: addInfo?.profile.given_name as string,
        apellido: addInfo?.profile.family_name as string,
        img: addInfo?.profile.picture as string,
        email: addInfo?.profile.email as string,
        proveedor: 'Google'
      }
      const user = adapterGoogleUser(googleUser)
      await userService.save(user, result.user.uid)
    }
    return true
  } else {
    throw new Error('No se pudo obtener el email')
  }
}

export const logOut = async () => {
  await signOut(auth)
  await googleLogOut()
}

export const getUserId = () => {
  if (auth.currentUser !== null) {
    return auth.currentUser.uid
  } else {
    throw new Error('No hay usuario logueado')
  }
}
