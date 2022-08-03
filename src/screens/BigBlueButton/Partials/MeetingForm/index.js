import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomInput from 'components/Form/components/CustomInput'
import InputPassword from 'components/Form/components/InputPassword'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function MeetingForm({onSubmit}) {
  const nameRegex = /^[A-Za-z]+$/

  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const GroupSchema = Yup.object().shape({
    name: Yup.string()
      .matches(nameRegex, 'Only English letters & Only English letters')
      .required('Meeting Name is required '),
    // name: Yup.string().required('Meeting Name is required'),
    moderator_pw: Yup.string().required('Moderator Password is required'),
    // moderator_pw: Yup.string()
    //   .matches(nameRegex, 'Only English letters')
    //   .required('Moderator Password is required'),
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(GroupSchema),
    defaultValues: {name: '', moderator_pw: ''},
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client('bigBlueButton/createSession', {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('Meetings')
        navigate(-1)
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    let {name, moderator_pw} = data
    mutate({
      name,
      moderator_pw,
      meeting_id: `random-${Math.floor(1000000 + Math.random() * 9000000)}`,
      allow_start_stop_recording: false,
      auto_start_recording: false,
      record: false,
      attendee_pw: 'ap',
      duration_in_minute: 0,
      voice_bridge: 718651,
    })
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}

        <CustomInput
          label="meetingName"
          name="name"
          control={control}
          errors={errors}
        />
        <InputPassword
          label="meetingPassword"
          name="moderator_pw"
          control={control}
          errors={errors}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={() => navigate('/dashboard/groups')}
          size="large"
          type="submit"
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
          {id ? (
            <FormattedMessage id="update_group" />
          ) : (
            <FormattedMessage id="save" />
          )}
        </LoadingButton>
      </Stack>
    </form>
  )
}
