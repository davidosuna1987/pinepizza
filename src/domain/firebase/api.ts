import { FirebaseError } from 'firebase/app'
import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore'

export type FirestoreAddDataResponse = {
  success: boolean
  error: FirebaseError | null
}

export type FirestoreGetDataResponse = {
  result: DocumentSnapshot<DocumentData> | null
  error: FirebaseError | null
}

export type FirestoreFetchDataResponse = {
  result: QuerySnapshot<DocumentData> | null
  error: FirebaseError | null
}
