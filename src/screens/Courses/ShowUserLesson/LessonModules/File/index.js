import {
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import axios from 'axios'
import Iconify from 'components/Iconify'
import {useClient} from 'context/auth-context'
import fileDownload from 'js-file-download'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {useAsync} from 'utils/hooks'
import useStyles from '../styles'

export default function ShowFile({file, deleteFile, module_id, token}) {
  const client = useClient()

  const classes = useStyles()
  const {isLoading, isError, error, run, data} = useAsync()

  async function downloadUsingFetch(IMG_URL, FILE_NAME) {
    const image = await fetch(IMG_URL)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const anchor = document.createElement('a')
    anchor.href = imageURL
    anchor.download = FILE_NAME

    document.body.appendChild(anchor)
    anchor.click()
  }

  return (
    <>
      <ListItem className={classes.li}>
        <ListItemIcon>
          <Iconify className={classes.icon} icon="akar-icons:file" />
        </ListItemIcon>
        <ListItemText primary={file?.filename} />
        <IconButton
          onClick={() =>
            window.open(`${file.fileurl}&token=${token}`, '_blank')
          }
        >
          <Iconify className={classes.icon} icon="bx:show-alt" />
        </IconButton>
        <IconButton
          onClick={() =>
            downloadUsingFetch(`${file.fileurl}&token=${token}`, file.filename)
          }
        >
          <Iconify className={classes.icon} icon="bi:file-arrow-down" />
        </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
