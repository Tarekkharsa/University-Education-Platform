import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Iconify from 'components/Iconify'
import React, {useState} from 'react'
import {FormattedMessage} from 'react-intl'
import UpdateUrlModule from '../AddModule/UrlModule/Update'
import useStyles from '../styles'

export default function ShowUrl({data, module_id, deleteUrl, section}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const openUrl = url => {
    window.open(url, '_blank')
  }
  return (
    <>
      <ListItem className={classes.li}>
        <ListItemIcon>
          <Iconify className={classes.icon} icon="eva:link-fill" />
        </ListItemIcon>
        <ListItemText primary={data?.filename} />
        <IconButton onClick={() => openUrl(data.fileurl)}>
          <Iconify className={classes.icon} icon="eva:external-link-outline" />
        </IconButton>
        <IconButton onClick={() => deleteUrl({module_ids: [module_id]})}>
          <Iconify
            className={classes.icon}
            icon="fluent:delete-dismiss-28-filled"
          />
        </IconButton>
        <IconButton onClick={handleOpen}>
          <Iconify className={classes.icon} icon="clarity:update-line" />
        </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
      {open && (
        <UpdateUrlModule
          section={section}
          module_id={module_id}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
    </>
  )
}
