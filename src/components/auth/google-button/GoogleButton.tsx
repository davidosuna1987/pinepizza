import React from 'react'
import '@/components/auth/google-button/GoogleButton.css'

export type GoogleButtonProps = {
  disabled: boolean
  handleClick: () => void
}

export default function GoogleButton({
  disabled,
  handleClick,
}: GoogleButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className="google-button"
      onClick={handleClick}
      disabled={disabled}
    >
      Entrar con Google
    </button>
  )
}
