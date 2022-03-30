import {createStyles, LinearProgress} from '@mui/material'
import {withStyles} from '@mui/styles'

import React from 'react'

const ErrorLinearProgress = withStyles(theme =>
  createStyles({
    bar: {
      backgroundColor: theme.palette.error.main,
    },
  }),
)(LinearProgress)

const SuccessLinearProgress = withStyles(theme =>
  createStyles({
    bar: {
      backgroundColor: theme.palette.success.main,
    },
  }),
)(LinearProgress)

export default function Progress({progress, success, error}) {
  return (
    <>
      {!error && !success ? (
        <LinearProgress variant="determinate" value={progress} />
      ) : !error && success ? (
        <SuccessLinearProgress variant="determinate" value={100} />
      ) : (
        <ErrorLinearProgress variant="determinate" value={100} />
      )}
    </>
  )
}
