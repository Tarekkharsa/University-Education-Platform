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
import MultiSelect from 'components/Form/components/MultiDropdown'
import {useParams} from 'react-router-dom'

const UploadAssignmentModal = ({module_id, open, handleClose}) => {
  const classes = useStyles()
  const client = useClient()
  const {user} = useAuth()
  const {course_id} = useParams()

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
      axios.post(
        process.env.REACT_APP_API_URL +
          '/module/assignment/UploadStudentFileForAssignment',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: user.token ? `Bearer ${user.token}` : undefined,
          },
        },
      ),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('assignment')
        queryClient.invalidateQueries('assignmentGeneralInfo')
        handleClose()
      },
    },
  )

  const onSubmitForm = data => {
    const formData = new FormData()
    formData.append('file', data.file.file)
    formData.append('course_id', course_id)
    formData.append('module_id', module_id)
    mutate(formData)
  }
  return (
    <>
      <Modal open={open} className={classes.modal_wrapper}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <FormattedMessage id="upload_assignment" />
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
              accept={[
                '.pdf',
                '.doc',
                '.docx',
                '.ppt',
                '.pptx',
                '.xls',
                '.xlsx',
              ]}
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
export default UploadAssignmentModal
