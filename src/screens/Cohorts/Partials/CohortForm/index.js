import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Link, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import InputPassword from 'components/Form/components/InputPassword'
import RichText from 'components/Form/components/RichText'
import Uploader from 'components/Form/components/Uploader'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {queryCache, useMutation, useQuery, useQueryClient} from 'react-query'
import {
  Link as RouterLink,
  useHistory,
  useNavigate,
  useParams,
} from 'react-router-dom'
import {useAsync} from 'utils/hooks'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function CohortForm({onSubmit}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const CohortSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
  })
  const [ritchText, setRitchText] = useState('')

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(CohortSchema),
    defaultValues: {name: '', description: ''},
  })

  const {
    isLoading: fetchLoading,
    error: getOneError,
    data: cohort,
  } = useQuery({
    queryKey: 'cohort',
    queryFn: () => client(`cohorts/${id}`).then(data => data),
    enabled: id !== undefined,
  })

  useEffect(() => {
    if (cohort && id !== undefined) {
      setRitchText(cohort.description)
      reset(cohort)
    }
  }, [cohort])

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(id ? `cohorts/${id}` : `cohorts`, {
        method: id ? 'PATCH' : 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('cohorts')
        navigate(-1)
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    mutate(data)
  }

  if (fetchLoading) {
    return <FullPageSpinner />
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}

        <CustomInput
          label="Cohort Name"
          name="name"
          control={control}
          errors={errors}
        />

        <RichText
          label="Description"
          name="description"
          width="100%"
          editValue={ritchText}
          InputChange={(name, value) => setValue('description', value)}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          {id ? 'Update Cohort' : 'Create Cohort'}
        </LoadingButton>
      </Stack>
    </form>
  )
}
