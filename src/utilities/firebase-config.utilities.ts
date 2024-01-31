import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MESSAGING_SENDER_ID,
  MESSUREMENT_ID,
  PROYECT_ID,
  STORAGE_BUCKET
} from '../contexts/env.context'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROYECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MESSUREMENT_ID
}

export const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)
