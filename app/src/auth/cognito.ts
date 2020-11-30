import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js'

const userPoolId = process.env.REACT_APP_USERPOOL_ID
const clientId = process.env.REACT_APP_CLIENT_ID

console.log(`userpool id=${userPoolId}`)
console.log(`client id=${clientId}`)

const poolData = {
  UserPoolId: `${userPoolId}`,
  ClientId: `${clientId}`,
}

const userPool = new CognitoUserPool(poolData)

export const getCurrentUser = () => {
  const cognitoUser = userPool.getCurrentUser()

  return cognitoUser
}

const getCognitoUser = (username: string) => {
  const userData = {
    Username: username,
    Pool: userPool,
  }
  const cognitoUser = new CognitoUser(userData)

  return cognitoUser
}

export const signUpUserWithEmail = async (username: string, email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ]

    userPool.signUp(username, password, attributeList, [], function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  }).catch((err) => {
    throw err
  })
}

export const verifyCode = async (username: string, code: string) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(username)

    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }).catch((err) => {
    throw err
  })
}

export const signInWithEmail = async (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: username,
      Password: password,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    const cognitoUser = getCognitoUser(username)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (res) {
        resolve(res)
      },

      onFailure: function (err) {
        reject(err)
      },
    })
  }).catch((err) => {
    throw err
  })
}

export const signOut = () => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    currentUser.signOut()
  }
}

export const getSession = async () => {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool(poolData)
    const cognitoUser = userPool.getCurrentUser()

    if (!cognitoUser) {
      return reject(`session not found`)
    }

    cognitoUser.getSession((err: any, session: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(session)
      }
    })
  }).catch((err) => {
    throw err
  })
}

export const getAttributes = async (username: string) => {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool(poolData)
    const cognitoUser = userPool.getCurrentUser()

    if (!cognitoUser) {
      return reject(`${username} not found`)
    }

    cognitoUser.getSession((err: Error, session: any) => {
      if (err) {
        reject(err)
      } else {
        cognitoUser.getUserAttributes(function (err, attributes) {
          if (err) {
            reject(err)
          } else {
            resolve(attributes)
          }
        })
      }
    })
  }).catch((err) => {
    throw err
  })
}

export const setAttribute = async (username: string, attribute: any) => {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool(poolData)
    const cognitoUser = userPool.getCurrentUser()

    if (!cognitoUser) {
      return reject(`${username} not found`)
    }

    cognitoUser.getSession((err: Error, session: any) => {
      if (err) {
        reject(err)
      } else {
        const attributeList = []
        const res = new CognitoUserAttribute(attribute)
        attributeList.push(res)

        cognitoUser.updateAttributes(attributeList, (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
      }
    })
  }).catch((err) => {
    throw err
  })
}

export const sendCode = async (username: string) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)

    cognitoUser.forgotPassword({
      onSuccess: function (res) {
        resolve(res)
      },
      onFailure: function (err) {
        reject(err)
      },
    })
  }).catch((err) => {
    throw err
  })
}

export const changePassword = (username: string, code: string, password: string) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)

    cognitoUser.confirmPassword(code, password, {
      onSuccess: function () {
        resolve('password updated')
      },
      onFailure: function (err) {
        reject(err)
      },
    })
  })
}
