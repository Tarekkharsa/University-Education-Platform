import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomDatePicker from 'components/Form/components/CustomDatePicker'
import CustomInput from 'components/Form/components/CustomInput'
import Dropdown from 'components/Form/components/Dropdown'
import MultiSelect from 'components/Form/components/MultiDropdown'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner} from 'components/lib'
import {useAuth, useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'
import useStyles from './styles'

// ----------------------------------------------------------------------

export default function CourseForm() {
  const classes = useStyles()
  const {course_id, quiz_id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {user} = useAuth()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const CourseSchema = Yup.object().shape({
    name: Yup.string().required(),
    grade_pass: Yup.number().required(),
    time_limit: Yup.number().required(),
    description: Yup.string().required(),
    time_start: Yup.date().required(),
    time_end: Yup.date().required(),
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    resetField,
    watch,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(CourseSchema),
    defaultValues: {
      name: '',
      description: '',
      time_start: null,
      time_end: null,
      grade_pass: null,
      time_limit: null,
    },
  })

  const {
    isFetching: fetchLoading,
    error: getOneError,
    data: quiz,
  } = useQuery({
    queryKey: 'course',
    queryFn: () =>
      client(
        `module/quiz/getCourseQuizById?course_id=${course_id}&quiz_id=${quiz_id}`,
      ).then(data => data.data[0]),
    enabled: quiz_id !== undefined,
  })
  useEffect(() => {
    if (quiz && quiz_id !== undefined) {
      reset({
        ...quiz,
        description: quiz.intro,
        // time_end: new Date(quiz.time_end * 1000),
        // time_start: new Date(quiz.time_start * 1000),
      })
    }
  }, [quiz])

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(quiz_id ? 'module/quiz/update' : `module/quiz/create`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('quizzes')
        navigate(-1)
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    mutate({
      ...data,
      time_start: new Date(data.time_start).getTime() / 1000,
      time_end: new Date(data.time_end).getTime() / 1000,
      course_id: course_id,
      section_num: '1',
    })
  }
  if (fetchLoading) {
    return <FullPageSpinner />
  }
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
        <Stack spacing={3}>
          {isError ? <Alert severity="error">{error.message}</Alert> : null}
          <CustomInput
            label="name"
            name="name"
            control={control}
            errors={errors}
          />
          <CustomInput
            label="grade_pass"
            name="grade_pass"
            control={control}
            errors={errors}
          />
          <CustomInput
            label="time_limit"
            name="time_limit"
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
            name="time_end"
            control={control}
            errors={errors}
          />
          <CustomInput
            label="description"
            name="description"
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
            onClick={() => navigate('/dashboard/course_quizzes')}
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
            {quiz_id ? (
              <FormattedMessage id="update" />
            ) : (
              <FormattedMessage id="save" />
            )}
          </LoadingButton>
        </Stack>
      </form>
    </>
  )
}
