import { auth } from '@/config/firebase'
import { FirebaseError } from 'firebase/app'
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'

export type FirebaseLoginRegisterResponse = {
  result: UserCredential | null
  error: FirebaseError | null
}

export type FirebaseLogoutResponse = {
  result: void | null
  error: FirebaseError | null
}

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

export const signInWithGoogle =
  async (): Promise<FirebaseLoginRegisterResponse> => {
    let result = null
    let error = null
    try {
      const provider = new GoogleAuthProvider()

      result = await signInWithPopup(auth, provider).then((response) => {
        const user = response.user

        updateProfile(user, {
          displayName: 'Usuario Ejemplo',
          photoURL: 'https://ejemplo.com/foto-perfil.jpg',
        })

        return response
      })
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
