import React, { useContext } from 'react'

import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import logoImage from './logo.png'

import { AuthContext } from '../auth/authContext'

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
  },
  title: {
    textAlign: 'center',
  },
  session: {
    width: '80vw',
    overflow: 'auto',
    overflowWrap: 'break-word',
    fontSize: '16px',
  },
}))

const Home: React.FunctionComponent = () => {
  const classes = useStyles()

  const history = useHistory()

  const auth = useContext(AuthContext)

  const signOutClicked = () => {
    auth.signOut()
    history.push('/landing')
  }

  return (
    <Grid container>
      <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
        <Box m={2}>
          <img src={logoImage} width={224} height={224} alt="logo" />
        </Box>
        <Box m={2}>
          <Typography className={classes.title} variant="h1">
            AWS Cognito Starter Home
          </Typography>
        </Box>
        <Box m={2}>
          <Button onClick={signOutClicked} variant="contained" color="primary">
            SIGN Out
          </Button>
        </Box>
        <Box m={2}>
          <pre className={classes.session}>{JSON.stringify(auth.userInfo, null, 2)}</pre>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Home
