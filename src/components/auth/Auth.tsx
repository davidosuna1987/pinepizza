import React, {
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useRef,
} from 'react'
import '@/components/auth/Auth.css'
import GoogleButton from './google-button/GoogleButton'

export type LoginProps = {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  handleLogin: () => void
  handleRegister: () => void
  handleSignInWithGoogle: () => void
  hasAccount: boolean
  setHasAccount: Dispatch<SetStateAction<boolean>>
  emailError: string
  passwordError: string
  loading: boolean
}

const Auth = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleRegister,
  handleSignInWithGoogle,
  hasAccount,
  setHasAccount,
  emailError,
  passwordError,
  loading,
}: LoginProps) => {
  const handleKeyPress = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.code === 'Space' || event.code === 'Enter')
      handleSetHasAccount(event)
  }

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    console.info('handleSubmit', event)
    hasAccount ? handleLogin() : handleRegister()
  }

  const handleSetHasAccount = (event: KeyboardEvent<HTMLSpanElement>) => {
    event.preventDefault()
    setHasAccount(!hasAccount)
    emailInput.current?.focus()
  }

  const emailInput = useRef<HTMLInputElement | null>(null)

  return (
    <section className="login-component h-full w-full flex flex-col justify-center">
      <h3 className="text-3xl relative -top-8">
        {hasAccount ? 'Acceder' : 'Crear cuenta'}
      </h3>
      <form onSubmit={handleSubmit} className={`login ${loading && 'loading'}`}>
        <div className="loginContainer">
          <p className="errorMsg">{emailError}</p>
          <p className="errorMsg">{passwordError}</p>
          <input
            ref={emailInput}
            tabIndex={1}
            type="email"
            autoFocus
            required
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            tabIndex={2}
            type="password"
            required
            value={password}
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btnContainer">
            {hasAccount ? (
              <>
                <button tabIndex={3} onClick={handleLogin}>
                  Acceder
                </button>
                <p>
                  {'¿No tienes una cuenta?'}
                  <span
                    tabIndex={4}
                    onClick={() => setHasAccount(!hasAccount)}
                    onKeyDown={handleKeyPress}
                  >
                    Crear cuenta
                  </span>
                </p>
              </>
            ) : (
              <>
                <button tabIndex={3} onClick={handleRegister}>
                  Crear cuenta
                </button>
                <p>
                  ¿Ya tienes cuenta?
                  <span
                    tabIndex={4}
                    onClick={() => setHasAccount(!hasAccount)}
                    onKeyDown={handleKeyPress}
                  >
                    Acceder
                  </span>
                </p>
              </>
            )}
          </div>

          <div className="google-button-wrapper mt-7">
            <GoogleButton
              disabled={loading}
              handleClick={handleSignInWithGoogle}
            />
          </div>
        </div>
      </form>
    </section>
  )
}

export default Auth
