import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomDatePicker from 'components/Form/components/CustomDatePicker'
import CustomInput from 'components/Form/components/CustomInput'
import MultiSelect from 'components/Form/components/MultiDropdown'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import moment from 'moment'
import {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'
import TreeTable from './Partials/Table'

// ----------------------------------------------------------------------

export default function CourseForm() {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const CourseSchema = Yup.object().shape({
    fullname: Yup.string().required(),
    shortname: Yup.string().required(),
    // category_id: Yup.number().required(),
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
        end_date: new Date(course.enddate),
        start_date: new Date(course.startdate),
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
        queryClient.invalidateQueries('courses')
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
    })
  }

  if (fetchLoading) {
    return <FullPageSpinner />
  }

  return (
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
        <MultiSelect
          name={'category_id'}
          title={'categories'}
          optionLable={'name'}
          groupBy={'parent'}
          optionUrl={'getCategories'}
          errors={errors}
          control={control}
          handleChange={value => {
            setValue('category_id', value)
          }}
        />
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
          onClick={() => navigate('/dashboard/courses')}
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
  )
}
