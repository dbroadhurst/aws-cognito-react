import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

// import { Radar } from './radar'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
  },
}))

const Loading = () => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
        {/* <Radar /> */}
        <Box m={2}>
          <Typography variant="h3">Loading...</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Loading
