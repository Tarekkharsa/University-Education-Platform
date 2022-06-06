import {yupResolver} from '@hookform/resolvers/yup'
import {LoadingButton} from '@mui/lab'
import {Alert, Modal, Stack} from '@mui/material'
import Uploader from 'components/Form/components/Uploader'
import {useAuth, useClient} from 'context/auth-context'
import React from 'react'
import {useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQueryClient} from 'react-query'
import * as Yup from 'yup'
import useStyles from './styles'
import axios, {post} from 'axios'

const UploadUsersModal = ({open, handleClose}) => {
  const classes = useStyles()
  const client = useClient()
  const {user} = useAuth()

  const queryClient = useQueryClient()
  const UserFileSchema = Yup.object().shape({
    file: Yup.mixed().required('File is required'),
  })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    register,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(UserFileSchema),
    defaultValues: {
      file: '',
    },
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      axios.post(process.env.REACT_APP_API_URL + '/uploadUsersCsv', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: user.token ? `Bearer ${user.token}` : undefined,
        },
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('users')
        handleClose()
      },
    },
  )

  const onSubmitForm = data => {
    const formData = new FormData()
    formData.append('file', data.file.file)
    mutate(formData)
  }
  return (
    <>
      <Modal open={open} className={classes.modal_wrapper}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <FormattedMessage id="upload_users_file" />
          </div>
          <form
            style={{width: '100%'}}
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmitForm)}
          >
            {isError ? (
              <Alert severity="error">
                {JSON.stringify(error?.response?.data?.message)}
              </Alert>
            ) : null}

            <Uploader
              name="file"
              InputChange={(name, files) => setValue(name, files)}
              setError={setError}
              errors={errors}
              width="100%"
              accept={['.csv']}
              multiple={false}
              maxFileSize={30}
            />

            <Stack
              className={classes.buttons_wrapper}
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
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                loading={isLoading}
              >
                <FormattedMessage id="save" />
              </LoadingButton>
            </Stack>
          </form>
        </div>
      </Modal>
    </>
  )
}
export default UploadUsersModal
