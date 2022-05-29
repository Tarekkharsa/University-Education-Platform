import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Chip, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import {useAuth, useClient} from 'context/auth-context'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQueryClient} from 'react-query'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function ChooseModuleForm({section, module_id, handleClose}) {
  const [options, setOptions] = useState([])
  const location = useLocation()
  const {state} = location
  const client = useClient()
  const {user} = useAuth()
  const {id, lessonId} = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const UserUrlSchema = Yup.object().shape({
    new_option: Yup.string(),
    name: Yup.string().required(),
    visible: Yup.boolean().required(),
  })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    register,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(UserUrlSchema),
    defaultValues: {
      new_option: '',
      name: '',
      visible: false,
    },
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client('module/choice/create', {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries(`lesson${lessonId}`)
        if (!module_id) {
          navigate(-1)
        } else {
          handleClose()
        }
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    if (options.length === 0) {
      setError('new_option', {
        type: 'custom',
        message: 'You must add at least one option',
      })
      return
    }
    delete data?.new_option

    mutate({
      ...data,
      course_id: id,
      section_num: !module_id ? state.section : section,
      visible: data.visible ? 1 : 0,
      options: options,
    })
  }
  const onCancel = () => {
    navigate(-1)
  }
  const addOption = () => {
    if (getValues('new_option')) {
      setOptions([...options, getValues('new_option')])
      setValue('new_option', '')
    }
  }
  const deleteOption = item => {
    if (item) {
      setOptions(options.filter(option => option !== item))
    }
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          width={'100%'}
        >
          <CustomInput
            label="new_option"
            name="new_option"
            control={control}
            errors={errors}
          />

          <LoadingButton
            onClick={addOption}
            size="large"
            width="20%"
            variant="contained"
            sx={{ml: 1}}
          >
            <FormattedMessage id="add" />
          </LoadingButton>
        </Stack>
        <Stack>
          {options.map((option, index) => (
            <Chip
              sx={{mb: 2}}
              width={'100%'}
              label={option}
              onDelete={() => deleteOption(option)}
            />
          ))}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={onCancel}
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
