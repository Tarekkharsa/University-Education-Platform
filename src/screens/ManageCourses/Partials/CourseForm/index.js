import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Chip, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomDatePicker from 'components/Form/components/CustomDatePicker'
import CustomInput from 'components/Form/components/CustomInput'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'
import CategoryModal from './Partials/CategoryModal'
import useStyles from './styles'

// ----------------------------------------------------------------------

export default function CourseForm() {
  const classes = useStyles()
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const CourseSchema = Yup.object().shape({
    fullname: Yup.string().required(),
    shortname: Yup.string().required(),
    category_id: Yup.object().required(),
    description: Yup.string().required(),
    start_date: Yup.date().required(),
    end_date: Yup.date().required(),
    visible: Yup.boolean().required(),
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
      fullname: '',
      shortname: '',
      category_id: null,
      description: '',
      start_date: null,
      end_date: null,
      visible: false,
    },
  })

  const {
    isFetching: fetchLoading,
    error: getOneError,
    data: course,
  } = useQuery({
    queryKey: 'course',
    queryFn: () =>
      client(`course/getCourseById?id=${id}`).then(data => data.data[0]),
    enabled: id !== undefined,
  })

  useEffect(() => {
    if (course && id !== undefined) {
      reset({
        ...course,
        category_id: course.category,
        description: course.summary,
        end_date: new Date(course.enddate * 1000),
        start_date: new Date(course.startdate * 1000),
        visible: Boolean(course.visible),
      })
    }
  }, [course])

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(id ? 'course/update' : `course/create`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('manage-courses')
        navigate(-1)
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    mutate({
      ...data,
      start_date: new Date(data.start_date).getTime() / 1000,
      end_date: new Date(data.end_date).getTime() / 1000,
      category_id: data.category_id.id,
      visible: data.visible === true ? '1' : '0',
      course_id: id,
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
            label="fullname"
            name="fullname"
            control={control}
            errors={errors}
          />
          <CustomInput
            label="shortname"
            name="shortname"
            control={control}
            errors={errors}
          />
          {getValues('category_id') && (
            <Chip
              label={getValues('category_id')?.name}
              onDelete={() => {
                setValue('category_id', null)
              }}
            />
          )}
          {!getValues('category_id') && (
            <LoadingButton
              onClick={handleOpen}
              size="large"
              variant="contained"
            >
              <FormattedMessage id="select_category" />
            </LoadingButton>
          )}
          {errors && errors.category_id && (
            <div className={classes.errorText}>
              {errors?.category_id?.message}
            </div>
          )}
          <CustomDatePicker
            label="start_date"
            name="start_date"
            control={control}
            errors={errors}
          />
          <CustomDatePicker
            label="end_date"
            name="end_date"
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
            onClick={() => navigate('/dashboard/manage-courses')}
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
              <FormattedMessage id="update_course" />
            ) : (
              <FormattedMessage id="save" />
            )}
          </LoadingButton>
        </Stack>
      </form>
      <CategoryModal
        setValue={setValue}
        open={open}
        handleClose={handleClose}
      />
    </>
  )
}
