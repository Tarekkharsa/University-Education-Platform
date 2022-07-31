import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import axios from 'axios'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomDatePicker from 'components/Form/components/CustomDatePicker'
import CustomInput from 'components/Form/components/CustomInput'
import Dropdown from 'components/Form/components/Dropdown'
import MultiSelect from 'components/Form/components/MultiDropdown'
import RichText from 'components/Form/components/RichText'
import Uploader from 'components/Form/components/Uploader'
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

export default function AssignmentForm() {
  const classes = useStyles()
  const {course_id, assignment_id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {user} = useAuth()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const CourseSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    from_date: Yup.date().required(),
    to_date: Yup.date().required(),
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    resetField,
    watch,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(CourseSchema),
    defaultValues: {
      name: '',
      description: '',
      from_date: null,
      to_date: null,
    },
  })
  console.log('errors', errors)
  const {
    isFetching: fetchLoading,
    error: getOneError,
    data: assignment,
  } = useQuery({
    queryKey: `assignment_${assignment_id}`,
    queryFn: () =>
      client(
        `module/assignment/getCourseAssignmentById?course_id=${course_id}&assignment_id=${assignment_id}`,
      ).then(data => data?.data?.assignment),
    enabled: assignment_id !== undefined,
  })
  useEffect(() => {
    if (assignment && assignment_id !== undefined) {
      reset({
        ...assignment,
        description: assignment.intro,
        from_date: new Date(assignment.allowsubmissionsfromdate * 1000),
        to_date: new Date(assignment.duedate * 1000),
      })
    }
  }, [assignment])

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      axios.post(
        !assignment_id
          ? process.env.REACT_APP_API_URL +
              '/module/assignment/createAssignment'
          : process.env.REACT_APP_API_URL +
              '/module/assignment/updateAssignmentGeneralInfo',
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
        queryClient.invalidateQueries('assignments')
        navigate(-1)
      },
    },
  )

  const onSubmitForm = data => {
    const formData = new FormData()
    !assignment_id && formData.append('file', data?.file?.file)
    assignment_id && formData.append('module_id', assignment.cmid)
    formData.append('course_id', course_id)
    formData.append('section_num', '2')
    formData.append('name', data?.name)
    formData.append('description', data.description.toString())
    formData.append('visible', 1)
    formData.append('from_date', new Date(data.from_date).getTime() / 1000)
    formData.append('to_date', new Date(data.to_date).getTime() / 1000)
    mutate(formData)
  }
  if (fetchLoading) {
    return <FullPageSpinner />
  }
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
        <Stack spacing={3}>
          {isError ? <Alert severity="error">{error.message}</Alert> : null}
          {!assignment_id && (
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
          )}
          <CustomInput
            label="name"
            name="name"
            control={control}
            errors={errors}
          />
          <CustomInput
            label="description"
            name="description"
            control={control}
            errors={errors}
          />
          <CustomDatePicker
            label="from_date"
            name="from_date"
            control={control}
            errors={errors}
          />
          <CustomDatePicker
            label="to_date"
            name="to_date"
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
            onClick={() => navigate('/dashboard/course_assignments')}
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
            {assignment_id ? (
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
