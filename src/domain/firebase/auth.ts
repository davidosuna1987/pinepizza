import { FirebaseError } from 'firebase/app'
import { UserCredential } from 'firebase/auth'

export type FirebaseLoginRegisterResponse = {
  result: UserCredential | null
  error: FirebaseError | null
}

export type FirebaseLogoutResponse = {
  result: void | null
  error: FirebaseError | null
}
