'use client'

import React from 'react'
import { onAuthStateChanged, getAuth, User } from 'firebase/auth'
import { firebaseApp } from '@/config/firebase'

const auth = getAuth(firebaseApp)

export const AuthContext = React.createContext<User | null>(null)

export const useAuthContext = () => React.useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
