import {Box, Button, Container, List, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import {useClient} from 'context/auth-context'
import React, {useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQueryClient} from 'react-query'
import AddModule from './AddModule'
import ShowFile from './File'
import useStyles from './styles'
import ShowUrl from './Url'

export default function LessonModules({modules, token, section}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const client = useClient()
  const queryClient = useQueryClient()
  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client('module/delete', {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('lesson')
      },
    },
  )
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          <FormattedMessage id="activities" />
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          <FormattedMessage id="new_lesson_activity" />
        </Button>
      </Stack>
      <Box sx={{width: '100%'}}>
        <List className={classes.root}>
          {modules.length > 0 &&
            modules.map((module, index) => {
              if (
                module?.contents?.length > 0 &&
                module.contents[0]?.type === 'file'
              ) {
                return (
                  <ShowFile
                    deleteFile={mutate}
                    module_id={module?.id}
                    file={module.contents[0]}
                    token={token}
                  />
                )
              }
              if (
                module?.contents?.length > 0 &&
                module.contents[0]?.type === 'url'
              ) {
                return (
                  <ShowUrl
                    deleteUrl={mutate}
                    module_id={module?.id}
                    data={module?.contents[0]}
                    section={section}
                  />
                )
              }
              return <></>
            })}
        </List>
      </Box>
      {open && (
        <AddModule
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          section={section}
        />
      )}
    </Container>
  )
}
