import React, { useState, useContext } from 'react'

import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import { useValidUsername } from '../../hooks/useAuthHooks'
import { Username } from '../../components/authComponents'

import { AuthContext } from '../../contexts/authContext'

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
  hover: {
    '&:hover': { cursor: 'pointer' },
  },
  text: {
    textAlign: 'center',
  },
})

export default function RequestCode() {
  const classes = useStyles()

  const { username, setUsername, usernameIsValid } = useValidUsername('')
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)

  const isValid = !usernameIsValid || username.length === 0

  const history = useHistory()

  const authContext = useContext(AuthContext)

  const sendCodeClicked = async () => {
    try {
      await authContext.sendCode(username)
      setResetSent(true)
    } catch (err) {
      setError('Unknown user')
    }
  }

  const emailSent = (
    <>
      <Box mt={1}>
        <Typography className={classes.text} variant="h5">{`Reset Code Sent to ${username}`}</Typography>
      </Box>
      <Box mt={4}>
        <Button onClick={() => history.push('forgotpassword')} color="primary" variant="contained">
          Reset Password
        </Button>
      </Box>
    </>
  )

  const sendCode = (
    <>
      <Box width="80%" m={1}>
        <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />
      </Box>
      <Box mt={2}>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box>

      <Box mt={2}>
        <Grid container direction="row" justify="center">
          <Box m={1}>
            <Button color="secondary" variant="contained" onClick={() => history.goBack()}>
              Cancel
            </Button>
          </Box>
          <Box m={1}>
            <Button disabled={isValid} color="primary" variant="contained" onClick={sendCodeClicked}>
              Send Code
            </Button>
          </Box>
        </Grid>
      </Box>
    </>
  )

  return (
    <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
      <Grid xs={11} sm={6} lg={4} container direction="row" justify="center" alignItems="center" item>
        <Paper style={{ width: '100%', padding: 32 }}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Box m={2}>
              <Typography variant="h3">Send Reset Code</Typography>
            </Box>

            {resetSent ? emailSent : sendCode}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
