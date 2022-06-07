import {LoadingButton} from '@mui/lab'
import {Divider, List, ListItem, ListItemIcon, Stack} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import moment from 'moment'
import * as React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {FormattedMessage} from 'react-intl'
import useEvents from '../hooks/useEvents'
import useStyles from './styles'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  //   boxShadow: 24,
  p: 4,
}

export default function ShowEventModal({
  open,
  handleClose,
  handleOpen,
  id,
  event,
}) {
  const classes = useStyles()
  const {mutate, isDeleteing} = useEvents({
    id,
    handleClose,
    enabled: false,
  })

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={3}>
          <List className={classes.root}>
            <ListItem className={classes.li}>
              <ListItemIcon>
                <FormattedMessage id="title" />
              </ListItemIcon>
              <div>{event.title}</div>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem className={classes.descLi}>
              <ListItemIcon>
                <FormattedMessage id="description" />
              </ListItemIcon>
              <div>{ReactHtmlParser(event?.description)}</div>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem className={classes.li}>
              <ListItemIcon>
                <FormattedMessage id="start_date" />
              </ListItemIcon>
              <div>
                {moment(event.timestart * 1000).format(
                  'MMMM Do YYYY, h:mm:ss a',
                )}
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem className={classes.li}>
              <ListItemIcon>
                <FormattedMessage id="end_date" />
              </ListItemIcon>
              <div>
                {moment(event.timeduration * 1000).format(
                  'MMMM Do YYYY, h:mm:ss a',
                )}
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{my: 2}}
        >
          <LoadingButton
            onClick={handleClose}
            size="large"
            variant="contained"
            sx={{mr: 2}}
          >
            <FormattedMessage id="cancel" />
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  )
}
