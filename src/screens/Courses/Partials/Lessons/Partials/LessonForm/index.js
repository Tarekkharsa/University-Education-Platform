import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import RichText from 'components/Form/components/RichText'
import {ModalSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function LessonForm({handleClose, lesson = null}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const LessonSchema = Yup.object().shape({
    section_num: Yup.string().required(),
    name: Yup.string().required(),
    description: Yup.string().required(),
    visible: Yup.boolean().required(),
    highlight: Yup.boolean().required(),
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(LessonSchema),
    defaultValues: {
      section_num: '',
      name: '',
      description: '',
      visible: false,
      highlight: false,
    },
  })

  const {
    isFetching: fetchLoading,
    error: getOneError,
    data: lessonData,
  } = useQuery({
    queryKey: `lesson${lesson?.id}`,
    queryFn: () =>
      client(
        `course/lesson/getLessonById?course_id=${id}&section_num=${lesson.section}`,
      ).then(data => data.data[0]),
    enabled: lesson !== null,
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(
        lesson !== null ? `course/lesson/update` : `course/lesson/create`,
        {
          method: 'POST',
          data: data,
        },
      ),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('lessons')
        handleClose()
        reset()
      },
    },
  )

  useEffect(() => {
    if (lessonData && lesson !== null) {
      reset({
        ...lessonData,
        section_num: lessonData.sectionnum,
        description: lessonData.summary,
        visible: lessonData.visible === 1 ? true : false,
      })
    }
  }, [lessonData])

  const onSubmitForm = data => {
    mutate({
      ...data,
      course_id: id,
      visible: data.visible === true ? '1' : '0',
      highlight: data.visible === true ? '1' : '0',
    })
  }

  if (fetchLoading) {
    return <ModalSpinner />
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
        <CustomInput
          label="section_num"
          name="section_num"
          control={control}
          errors={errors}
        />
        <CustomCheckbox
          label="visible"
          name="visible"
          control={control}
          errors={errors}
        />
        <CustomCheckbox
          label="highlight"
          name="highlight"
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
