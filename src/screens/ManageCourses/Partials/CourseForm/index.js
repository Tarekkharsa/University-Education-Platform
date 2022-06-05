import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {
  Alert,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomDatePicker from 'components/Form/components/CustomDatePicker'
import CustomInput from 'components/Form/components/CustomInput'
import Dropdown from 'components/Form/components/Dropdown'
import MultiSelect from 'components/Form/components/MultiDropdown'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner} from 'components/lib'
import {useAuth, useClient} from 'context/auth-context'
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
  const {user} = useAuth()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const CourseSchema = Yup.object().shape({
    name: Yup.string().required(),
    category_id: Yup.object().required(),
    description: Yup.string().required(),
    start_date: Yup.date().required(),
    end_date: Yup.date().required(),
    visible: Yup.boolean().required(),
    active: Yup.boolean().required(),
    specification_id: Yup.object().required(),
    level: Yup.number().required(),
    grade_max: Yup.number().required(),
    grade_prac_max: Yup.number().required(),
    grade_theo_max: Yup.number().required(),
    grade_passed: Yup.number().required(),
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
      category_id: null,
      description: '',
      start_date: null,
      end_date: null,
      visible: false,
      active: false,
      specification_id: null,
      level: null,
      grade_max: null,
      grade_theo_max: null,
      grade_prac_max: null,
      grade_passed: null,
    },
  })

  const {
    isFetching: fetchLoading,
    error: getOneError,
    data: course,
  } = useQuery({
    queryKey: 'course',
    queryFn: () =>
      client(`course/getCourseById?id=${id}`).then(data => data.data),
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
      specification_id: data.specification_id.id,
      visible: data.visible === true ? '1' : '0',
      course_id: id,
      manager_id: user.id,
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
            label="grade_max"
            name="grade_max"
            control={control}
            errors={errors}
          />
          <CustomInput
            label="grade_theo_max"
            name="grade_theo_max"
            control={control}
            errors={errors}
          />
          <CustomInput
            label="grade_prac_max"
            name="grade_prac_max"
            control={control}
            errors={errors}
          />
          <CustomInput
            label="grade_passed"
            name="grade_passed"
            control={control}
            errors={errors}
          />
          <MultiSelect
            name={'specification_id'}
            title={'specifications'}
            optionLable={'name'}
            optionUrl={'getSpecifications'}
            errors={errors}
            control={control}
            handleChange={value => setValue('specification_id', value)}
          />
          <Dropdown
            name={'level'}
            title={'level'}
            optionLable={'name'}
            options={[1, 2, 3, 4, 5]}
            setValue={setValue}
            errors={errors}
            control={control}
            handleChange={value => setValue('level', value)}
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
            label="active"
            name="active"
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
