import {Grid, IconButton, Paper, Stack, Typography} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import {styled} from '@mui/material/styles'
import Iconify from 'components/Iconify'
import {FullPageSpinner, ModalSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import useRoles from 'hooks/useRoles'
import * as React from 'react'
import {FaSpinner} from 'react-icons/fa'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import {useNavigate} from 'react-router-dom'
import FileModule from './FileModule'
import useStyles from './styles'

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f8f3f39c',
  // ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
}))
export default function AddModule({open, handleClose, handleOpen, section}) {
  const {checkIfRolesInUserRoles} = useRoles()
  const client = useClient()
  const classes = useStyles()
  const navigate = useNavigate()

  const {isLoading, error, data} = useQuery({
    queryKey: 'course_activities',
    queryFn: () =>
      client(`course/getCourseActivities`).then(data => {
        let newData = data?.data?.filter(
          item => item.title !== 'BigBlueButton' && item.title !== 'Folder',
        )
        // if (checkIfRolesInUserRoles(['ROLE_ADMIN'])) {
        //   newData = newData?.filter(item => item.title !== 'Choice')
        // }
        return newData
      }),
  })

  const icons = {
    BigBlueButton: 'simple-icons:bigbluebutton',
    File: 'akar-icons:file',
    URL: 'akar-icons:link-on',
    Folder: 'bi:folder-fill',
    Choice: 'healthicons:i-exam-multiple-choice-outline',
  }
  const addActivity = activity => {
    if (activity.title === 'File') {
      navigate('files', {state: {section}})
      handleClose()
    }
    if (activity.title === 'URL') {
      navigate('url', {state: {section}})
      handleClose()
    }
    if (activity.title === 'Choice') {
      navigate('choose', {state: {section}})
      handleClose()
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.root}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="new_lesson_activity" />
          </Typography>
        </Stack>
        {!isLoading ? (
          <Box sx={{flexGrow: 1}}>
            <Grid
              container
              spacing={{xs: 2, md: 3}}
              columns={{xs: 4, sm: 8, md: 12}}
            >
              {data.map((item, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Item onClick={() => addActivity(item)}>
                    <Iconify
                      className={classes.icon}
                      icon={icons[item.title]}
                    />
                    <Typography variant="h6">
                      <FormattedMessage id={item.title} />
                    </Typography>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <ModalSpinner />
        )}
      </Box>
    </Modal>
  )
}
