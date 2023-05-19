import { firebaseApp } from '@/config/firebase'
import {
  FirestoreAddDataResponse,
  FirestoreFetchDataResponse,
  FirestoreGetDataResponse,
} from '@/domain/firebase/api'
import { FirebaseError } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore'

const db = getFirestore(firebaseApp)

export const getData = async (
  databaseId: string,
  id: string,
): Promise<FirestoreGetDataResponse> => {
  let docRef = doc(db, databaseId, id)

  let result = null
  let error = null

  try {
    result = await getDoc(docRef)
  } catch (e) {
    error = e as FirebaseError
  }

  return { result, error }
}

export const fetchData = async (
  databaseId: string,
): Promise<FirestoreFetchDataResponse> => {
  const colRef = collection(db, databaseId)

  let result = null
  let error = null

  try {
    result = await getDocs(colRef)
  } catch (e) {
    error = e as FirebaseError
  }

  return { result, error }
}

export const setData = async (
  databaseId: string,
  id: string,
  data: Object,
): Promise<FirestoreAddDataResponse> => {
  let success = true
  let error = null

  try {
    await setDoc(doc(db, databaseId, id), data, {
      merge: true,
    })
  } catch (e) {
    success = false
    error = e as FirebaseError
  }

  return { success, error }
}
