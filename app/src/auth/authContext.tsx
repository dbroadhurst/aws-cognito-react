import React, { useState, useEffect, useContext } from 'react'

import * as cognito from './cognito'

export enum AuthStatus {
  Loading,
  SignedIn,
  SignedOut,
}

export interface IAuth {
  userInfo?: { username?: string; email?: string; sub?: string; accessToken?: string; refreshToken?: string }
  authStatus?: AuthStatus
  signInWithEmail?: any
  signUpWithEmail?: any
  signOut?: any
  verifyCode?: any
  getSession?: any
  sendCode?: any
  changePassword?: any
}

const defaultState: IAuth = {
  userInfo: {},
  authStatus: AuthStatus.Loading,
}

export const AuthContext = React.createContext(defaultState)

export const AuthIsSignedIn: React.FunctionComponent = ({ children }) => {
  const { authStatus }: IAuth = useContext(AuthContext)

  return <>{authStatus === AuthStatus.SignedIn ? children : null}</>
}

export const AuthIsNotSignedIn: React.FunctionComponent = ({ children }) => {
  const { authStatus }: IAuth = useContext(AuthContext)

  return <>{authStatus === AuthStatus.SignedOut ? children : null}</>
}

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading)
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    async function getSessionInfo() {
      const session: any = await getSession()
      const { email, sub } = session.idToken.payload
      setUserInfo({
        email,
        sub,
        username: session.idToken.payload['cognito:username'],
        accessToken: session.accessToken.jwtToken,
        refreshToken: session.refreshToken.token,
      })
      setAuthStatus(AuthStatus.SignedIn)
      return session
    }

    const currentUser = cognito.getCurrentUser()
    if (currentUser) {
      getSessionInfo()
    } else {
      setAuthStatus(AuthStatus.SignedOut)
    }
  }, [setAuthStatus, authStatus])

  if (authStatus === AuthStatus.Loading) {
    return null
  }

  async function signInWithEmail(username: string, password: string) {
    try {
      await cognito.signInWithEmail(username, password)
      setAuthStatus(AuthStatus.SignedIn)
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut)
      throw err
    }
  }

  async function signUpWithEmail(username: string, email: string, password: string) {
    try {
      await cognito.signUpUserWithEmail(username, email, password)
    } catch (err) {
      throw err
    }
  }

  function signOut() {
    cognito.signOut()
    setAuthStatus(AuthStatus.SignedOut)
  }

  async function verifyCode(username: string, code: string) {
    try {
      await cognito.verifyCode(username, code)
    } catch (err) {
      throw err
    }
  }

  async function getSession() {
    try {
      const session = await cognito.getSession()
      return session
    } catch (err) {
      throw err
    }
  }

  async function sendCode(username: string) {
    try {
      await cognito.sendCode(username)
    } catch (err) {
      throw err
    }
  }

  async function changePassword(username: string, code: string, password: string) {
    try {
      await cognito.changePassword(username, code, password)
    } catch (err) {
      throw err
    }
  }

  const state: IAuth = {
    authStatus,
    userInfo,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    verifyCode,
    getSession,
    sendCode,
    changePassword,
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default AuthProvider
