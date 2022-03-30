import React from 'react'
import useStyles from './styles'
import {Grid, IconButton} from '@mui/material'
import Iconify from 'components/Iconify'

export function FileHeader({file, onDelete, error, success, onReUoload}) {
  const classes = useStyles()

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <aside className={classes.thumbsContainer}>
          <div className={classes.thumb} key={file.name}>
            {file.type.split('/')[0] == 'image' ? (
              <div className={classes.thumbInner}>
                <img src={file.preview} className={classes.img} alt="" />
              </div>
            ) : (
              <div className={classes.fileName}>{file.name}</div>
            )}
          </div>
        </aside>
      </Grid>
      <Grid item className={classes.IconContainer}>
        {error && (
          <IconButton onClick={() => onReUoload(file, 'uploaded')}>
            <Iconify icon="bi:reply-all" />
          </IconButton>
        )}
        {/* {success && <DoneAll className={classes.DoneAll} />} */}
        {success && <Iconify icon="eva:done-all-outline" />}
        <IconButton onClick={() => onDelete(file, 'uploaded')}>
          <Iconify icon="ic:twotone-delete-outline" />
        </IconButton>
      </Grid>
    </Grid>
  )
}
