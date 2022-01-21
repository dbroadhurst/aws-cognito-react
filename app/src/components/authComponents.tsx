import React from 'react'

import TextField from '@material-ui/core/TextField'

export const Email: React.FunctionComponent<{ emailIsValid: boolean; setEmail: (_: string) => void }> = ({
  emailIsValid,
  setEmail,
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={emailIsValid ? 'Email' : 'Invalid Email'}
      error={!emailIsValid}
      onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(evt.target.value)
      }}
    />
  )
}

export const Password: React.FunctionComponent<{
  label: string
  passwordIsValid: boolean
  setPassword: (_: string) => void
}> = ({ label, passwordIsValid, setPassword }) => {
  return (
    <TextField
      fullWidth
      type="password"
      variant="outlined"
      label={passwordIsValid ? label : 'Minimum 8 characters'}
      error={!passwordIsValid}
      onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(evt.target.value)
      }}
    />
  )
}

export const Username: React.FunctionComponent<{ usernameIsValid: boolean; setUsername: (_: string) => void }> = ({
  usernameIsValid,
  setUsername,
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={usernameIsValid ? 'Username' : 'Minimum 8 characters'}
      error={!usernameIsValid}
      onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUsername(evt.target.value)
      }}
    />
  )
}

export const Code: React.FunctionComponent<{ codeIsValid: boolean; setCode: (_: string) => void }> = ({
  codeIsValid,
  setCode,
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={codeIsValid ? 'Code' : 'Minimum 6 characters'}
      error={!codeIsValid}
      onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(evt.target.value)
      }}
    />
  )
}
