import React from 'react'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import Icon from '@material-ui/core/Icon'

import googleLogo from './googleLogo.svg'

export default function GoogleSignIn() {
  const googleIcon = (
    <Icon style={{ width: 40, height: 40 }}>
      <img height={40} src={googleLogo} alt="google logo" />
    </Icon>
  )

  const googleSignIn = () => {
    window.location.href =
      'https://union25-test.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost:3000&response_type=CODE&client_id=a7csl3gdrfgo36p2jo3cn7otr&scope=aws.cognito.signin.user.admin%20email%20openid%20phone%20profile'
  }

  return (
    <Box m={1}>
      <Grid container direction="row" alignItems="center">
        <Button size="large" startIcon={googleIcon} onClick={googleSignIn}>
          Google
        </Button>
      </Grid>
    </Box>
  )
}
