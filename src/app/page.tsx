'use client'

import { auth } from '@/config/firebase'
import { login, register, signInWithGoogle } from '@/firebase/auth'
import { logout } from '@/firebase/auth'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import Auth from '@/components/auth/Auth'
import { FirebaseError } from 'firebase/app'
import Questionary from '@/components/questionary/Questionary'
import Spinner from '@/components/spinner/Spinner'

export default function Home() {
  const [user, loading] = useAuthState(auth)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [hasAccount, setHasAccount] = useState<boolean>(false)
  const [authLoading, setAuthLoading] = useState<boolean>(false)

  const clearInputs = () => {
    setEmail('')
    setPassword('')
    setAuthLoading(false)
  }

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }

  const handleLogin = async (event?: React.FormEvent<HTMLInputElement>) => {
    event?.preventDefault()
    setAuthLoading(true)
    clearErrors()
    const { error } = await login(email, password)
    error ? handleError(error) : clearInputs()
  }

  const handleRegister = async (event?: React.FormEvent<HTMLInputElement>) => {
    event?.preventDefault()
    setAuthLoading(true)
    clearErrors()
    const { error } = await register(email, password)
    error ? handleError(error) : clearInputs()
  }

  const handleSignInWithGoogle = async () => {
    clearErrors()
    const { result, error } = await signInWithGoogle()
    error ? handleError(error) : clearInputs()
  }

  const handleLogout = async () => {
    clearInputs()
    const { error } = await logout()
    error ? handleError(error) : clearInputs()
  }

  const handleError = (error: FirebaseError) => {
    setAuthLoading(false)
    switch (error.code) {
      case 'auth/invalid-email':
        setEmailError('El email no es válido')
        break
      case 'auth/email-already-in-use':
        setEmailError('Ya existe una cuenta con este email')
        break
      case 'auth/user-disabled':
        setEmailError('El usuario está deshabilitado')
      case 'auth/user-not-found':
        setEmailError('Credenciales incorrectas')
        break
      case 'auth/wrong-password':
        setPasswordError('Credenciales incorrectas')
        break
      case 'auth/weak-password':
        setPasswordError('La contraseña es muy débil')
        break
      case 'auth/too-many-requests':
        setPasswordError('Demasiados intentos de inicio de sesión fallidos')
        break
      case 'auth/operation-not-allowed':
        setPasswordError('Operación no permitida')
        break
      case 'auth/network-request-failed':
        setPasswordError('Error de red')
      default:
        break
    }
  }

  return loading ? (
    <Spinner />
  ) : user ? (
    <Questionary handleLogout={handleLogout} />
  ) : (
    <Auth
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      handleSignInWithGoogle={handleSignInWithGoogle}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
      loading={authLoading}
    />
  )
}
