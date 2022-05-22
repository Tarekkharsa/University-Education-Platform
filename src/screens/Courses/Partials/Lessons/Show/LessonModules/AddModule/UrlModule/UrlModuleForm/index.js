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

export default function UrlModuleForm({data, section, module_id, handleClose}) {
  const location = useLocation()
  const {state} = location
  const client = useClient()
  const {user} = useAuth()
  const {id} = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const UserUrlSchema = Yup.object().shape({
    url: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!',
      )
      .required('Please enter url'),
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
    resolver: yupResolver(UserUrlSchema),
    defaultValues: data
      ? {url: data.fileurl, name: data.filename, visible: false}
      : {
          url: '',
          name: '',
          visible: false,
        },
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(data ? 'module/url/update' : `module/url/create`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('lesson')
        if (!data) {
          navigate(-1)
        } else {
          handleClose()
        }
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    mutate({
      ...data,
      course_id: id,
      section_num: !data ? state.section : section,
      visible: data.visible ? 1 : 0,
      url_module_id: data ? module_id : undefined,
    })
  }
  const onCancel = () => {
    if (!data) {
      navigate(-1)
    } else {
      handleClose()
    }
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

        <CustomInput label="url" name="url" control={control} errors={errors} />
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
