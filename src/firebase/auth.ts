import { auth } from '@/config/firebase'
import {
  FirebaseLoginRegisterResponse,
  FirebaseLogoutResponse,
} from '@/domain/firebase/auth'
import { FirebaseError } from 'firebase/app'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

export const register = async (
  email: string,
  password: string,
): Promise<FirebaseLoginRegisterResponse> => {
  let result = null
  let error = null
  try {
    result = await createUserWithEmailAndPassword(auth, email, password)
  } catch (e) {
    error = e as FirebaseError
  }

  return { result, error }
}

export const login = async (
  email: string,
  password: string,
): Promise<FirebaseLoginRegisterResponse> => {
  let result = null
  let error = null
  try {
    result = await signInWithEmailAndPassword(auth, email, password)
  } catch (e) {
    error = e as FirebaseError
  }

  return { result, error }
}

export const logout = async (): Promise<FirebaseLogoutResponse> => {
  let result = null
  let error = null
  try {
    result = await signOut(auth)
  } catch (e) {
    error = e as FirebaseError
  }

  return { result, error }
}

export const signInWithGoogle =
  async (): Promise<FirebaseLoginRegisterResponse> => {
    let result = null
    let error = null
    try {
      result = await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (e) {
      error = e as FirebaseError
    }

    return { result, error }
  }
