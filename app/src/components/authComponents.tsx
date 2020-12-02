import React from 'react'

import TextField from '@material-ui/core/TextField'

export const Email: React.FunctionComponent<{ emailIsValid: boolean; setEmail: any }> = ({
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

export const Password: React.FunctionComponent<{ passwordIsValid: boolean; setPassword: any }> = ({
  passwordIsValid,
  setPassword,
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={passwordIsValid ? 'Password' : 'Minimum 8 characters'}
      error={!passwordIsValid}
      onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(evt.target.value)
      }}
    />
  )
}

export const Username: React.FunctionComponent<{ usernameIsValid: boolean; setUsername: any }> = ({
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

export const Code: React.FunctionComponent<{ codeIsValid: boolean; setCode: any }> = ({ codeIsValid, setCode }) => {
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
