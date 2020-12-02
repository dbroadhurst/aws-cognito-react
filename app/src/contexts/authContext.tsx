import React, { useState, useEffect, useContext } from 'react'

import * as cognito from '../libs/cognito'

export enum AuthStatus {
  Loading,
  SignedIn,
  SignedOut,
}

export interface IAuth {
  sessionInfo?: { username?: string; email?: string; sub?: string; accessToken?: string; refreshToken?: string }
  attrInfo?: any
  authStatus?: AuthStatus
  signInWithEmail?: any
  signUpWithEmail?: any
  signOut?: any
  verifyCode?: any
  getSession?: any
  sendCode?: any
  forgotPassword?: any
  changePassword?: any
  getAttributes?: any
  setAttribute?: any
}

const defaultState: IAuth = {
  sessionInfo: {},
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
  const [sessionInfo, setSessionInfo] = useState({})
  const [attrInfo, setAttrInfo] = useState([])

  useEffect(() => {
    async function getSessionInfo() {
      try {
        const session: any = await getSession()
        setSessionInfo({
          accessToken: session.accessToken.jwtToken,
          refreshToken: session.refreshToken.token,
        })
        window.localStorage.setItem('accessToken', `${session.accessToken.jwtToken}`)
        window.localStorage.setItem('refreshToken', `${session.refreshToken.token}`)
        await setAttribute({ Name: 'website', Value: 'https://github.com/dbroadhurst/aws-cognito-react' })
        const attr: any = await getAttributes()
        setAttrInfo(attr)
        setAuthStatus(AuthStatus.SignedIn)
      } catch (err) {
        setAuthStatus(AuthStatus.SignedOut)
      }
    }
    getSessionInfo()
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

  async function getAttributes() {
    try {
      const attr = await cognito.getAttributes()
      return attr
    } catch (err) {
      throw err
    }
  }

  async function setAttribute(attr: any) {
    try {
      const res = await cognito.setAttribute(attr)
      return res
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

  async function forgotPassword(username: string, code: string, password: string) {
    try {
      await cognito.forgotPassword(username, code, password)
    } catch (err) {
      throw err
    }
  }

  async function changePassword(oldPassword: string, newPassword: string) {
    try {
      await cognito.changePassword(oldPassword, newPassword)
    } catch (err) {
      throw err
    }
  }

  const state: IAuth = {
    authStatus,
    sessionInfo,
    attrInfo,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    verifyCode,
    getSession,
    sendCode,
    forgotPassword,
    changePassword,
    getAttributes,
    setAttribute,
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default AuthProvider
