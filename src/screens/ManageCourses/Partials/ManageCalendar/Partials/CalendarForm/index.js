import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomDatePicker from 'components/Form/components/CustomDatePicker'
import CustomInput from 'components/Form/components/CustomInput'
import RichText from 'components/Form/components/RichText'
import {useClient} from 'context/auth-context'
import {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function CalendarForm({handleClose, start = null, end = null}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const Schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    visible: Yup.boolean().required(),
    time_start: Yup.date().required(),
    time_duration: Yup.date().required(),
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      name: '',
      description: '',
      visible: false,
      time_start: start ? new Date(start) : null,
      time_duration: end ? new Date(end) : null,
    },
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(`calender/createEvent`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('calendar')
        handleClose()
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    mutate({
      ...data,
      course_id: id,
      event_type: 'course',
      time_start: new Date(data.time_start).getTime() / 1000,
      time_duration: new Date(data.time_duration).getTime() / 1000,
      visible: data.visible === true ? '1' : '0',
    })
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
        <CustomDatePicker
          label="time_start"
          name="time_start"
          control={control}
          errors={errors}
        />
        <CustomDatePicker
          label="time_end"
          name="time_duration"
          control={control}
          errors={errors}
        />
        <CustomCheckbox
          label="visible"
          name="visible"
          control={control}
          errors={errors}
        />
        <Controller
          control={control}
          name="description"
          render={({field: {onChange, value}}) => (
            <RichText
              label="Description"
              errorText={errors ? errors?.description?.message : ''}
              width="100%"
              InputChange={values => onChange(values)}
              value={value}
              editValue={value}
            />
          )}
        />
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
