import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import axios from 'axios'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import RichText from 'components/Form/components/RichText'
import Uploader from 'components/Form/components/Uploader'
import {FullPageSpinner} from 'components/lib'
import {useAuth, useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function FileModuleForm() {
  const location = useLocation()
  const {state} = location
  console.log('state', state)
  const client = useClient()
  const {user} = useAuth()
  const {id} = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const UserFileSchema = Yup.object().shape({
    file: Yup.mixed().required('File is required'),
    description: Yup.string().required(),
    name: Yup.string().required(),
    visible: Yup.boolean().required(),
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
      description: '',
      name: '',
      visible: false,
    },
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      axios.post(process.env.REACT_APP_API_URL + '/module/file/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: user.token ? `Bearer ${user.token}` : undefined,
        },
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('lesson')
        navigate(-1)
      },
    },
  )
  const onSubmitForm = data => {
    const formData = new FormData()
    formData.append('file', data.file.file)
    formData.append('course_id', id)
    formData.append('section_num', state.section)
    formData.append('name', data.name)
    formData.append('description', data.description.toString())
    formData.append('visible', data.visible ? 1 : 0)
    mutate(formData)
  }

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}

        <CustomInput
          label="name"
          name="name"
          control={control}
          errors={errors}
        />

        <CustomCheckbox
          label="visible"
          name="visible"
          control={control}
          errors={errors}
        />

        <CustomInput
          label="description"
          name="description"
          control={control}
          errors={errors}
        />
        <Uploader
          name="file"
          InputChange={(name, files) => setValue(name, files)}
          setError={setError}
          errors={errors}
          width="100%"
          // accept={['.csv']}
          multiple={false}
          maxFileSize={30}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={() => navigate(-1)}
          size="large"
          variant="contained"
          sx={{mr: 2}}
        >
          <FormattedMessage id="cancel" />
        </LoadingButton>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          <FormattedMessage id="save" />
        </LoadingButton>
      </Stack>
    </form>
  )
}
