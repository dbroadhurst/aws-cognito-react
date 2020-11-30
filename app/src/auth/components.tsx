import React, { useState, useEffect } from 'react'

import TextField from '@material-ui/core/TextField'

import * as yup from 'yup'

export const useValidEmail = (initialValue: string) => {
  const [email, setEmail] = useState(initialValue)
  const [emailIsValid, setEmailIsValid] = useState(true)

  useEffect(() => {
    const emailSchema = yup.object().shape({
      email: yup.string().email().required(),
    })

    if (email.length === 0) {
      setEmailIsValid(true)
      return
    }

    const isValid = emailSchema.isValidSync({ email })

    setEmailIsValid(isValid)
  }, [email])

  return { email, setEmail, emailIsValid }
}

export const useValidPassword = (initialValue: string) => {
  const [password, setPassword] = useState(initialValue)
  const [passwordIsValid, setPasswordIsValid] = useState(true)

  useEffect(() => {
    const passwordSchema = yup.object().shape({
      password: yup.string().min(8).required(),
    })

    if (password.length === 0) {
      setPasswordIsValid(true)
      return
    }

    const isValid = passwordSchema.isValidSync({ password })

    setPasswordIsValid(isValid)
  }, [password])

  return { password, setPassword, passwordIsValid }
}

export const useValidUsername = (initialValue: string) => {
  const [username, setUsername] = useState(initialValue)
  const [usernameIsValid, setUsernameIsValid] = useState(true)

  useEffect(() => {
    const usernameSchema = yup.object().shape({
      username: yup.string().min(8).required(),
    })

    if (username.length === 0) {
      setUsernameIsValid(true)
      return
    }

    const isValid = usernameSchema.isValidSync({ username })

    setUsernameIsValid(isValid)
  }, [username])

  return { username, setUsername, usernameIsValid }
}

export const useValidCode = (initialValue: string) => {
  const [code, setCode] = useState(initialValue)
  const [codeIsValid, setCodeIsValid] = useState(true)

  useEffect(() => {
    const codeSchema = yup.object().shape({
      code: yup.string().min(6).required(),
    })

    if (code.length === 0) {
      setCodeIsValid(true)
      return
    }

    const isValid = codeSchema.isValidSync({ code })

    setCodeIsValid(isValid)
  }, [code])

  return { code, setCode, codeIsValid }
}

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
