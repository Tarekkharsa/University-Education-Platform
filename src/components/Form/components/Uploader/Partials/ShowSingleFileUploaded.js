import React from 'react'
import useStyles from '../Partials/FileHeader/styles'
// import ApiConfigs from '~/Configs/Api'
import LazyLoad from 'react-lazyload'
import {Grid, IconButton, Link} from '@mui/material'
import Iconify from 'components/Iconify'
import {isJson} from './Service/Helpers'

export function ShowSingleFileUploaded({value, onDelete}) {
  let parsedData = isJson(value) ? JSON.parse(value) : value
  const classes = useStyles()
  return (
    <Grid item>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <aside className={classes.thumbsContainer}>
            {parsedData.original_name ? (
              <Link
                href={
                  process.env.REACT_APP_STORAGEURL_API_URL +
                  parsedData.download_link
                }
                target="_blank"
              >
                <div className={classes.fileNamewithIcon}>
                  <Iconify icon="akar-icons:file" />
                  {parsedData.original_name}
                </div>
              </Link>
            ) : (
              <div
                className={classes.thumb}
                key={
                  parsedData?.original_name
                    ? parsedData?.original_name
                    : parsedData
                }
              >
                <div className={classes.thumbInner}>
                  <LazyLoad>
                    <img
                      src={`${process.env.REACT_APP_STORAGEURL_API_URL}${parsedData}`}
                      className={classes.img}
                      alt=""
                    />
                  </LazyLoad>
                </div>
              </div>
            )}
          </aside>
        </Grid>
        <Grid item>
          <IconButton onClick={() => onDelete(parsedData, 'oldUploaded')}>
            <Iconify icon="ic:twotone-delete-outline" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
