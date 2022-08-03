import {Box, Container, List} from '@mui/material'
import {useClient} from 'context/auth-context'
import React, {useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {useParams} from 'react-router-dom'
import AddModule from './AddModule'
import ShowChoose from './choose'
import ShowFile from './File'
import useStyles from './styles'
import ShowUrl from './Url'

export default function LessonModules({modules, token, section}) {
  const {lessonId} = useParams()
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
        queryClient.invalidateQueries(`lesson${lessonId}`)
      },
    },
  )
  return (
    <Container>
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
              if (module && module.modname === 'choice') {
                return (
                  <ShowChoose
                    deleteUrl={mutate}
                    id={module?.instance}
                    module_id={module?.id}
                    dataModule={module}
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
