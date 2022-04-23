import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomInput from 'components/Form/components/CustomInput'
import Dropdown from 'components/Form/components/Dropdown'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function RoleForm({onSubmit}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const RoleSchema = Yup.object().shape({
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
    resolver: yupResolver(RoleSchema),
    defaultValues: {name: '', description: ''},
  })

  // const {
  //   isLoading: fetchLoading,
  //   error: getOneError,
  //   data: cohort,
  // } = useQuery({
  //   queryKey: 'cohort',
  //   queryFn: () => client(`cohorts/${id}`).then(data => data),
  //   enabled: id !== undefined,
  // })

  // const {mutate, isError, error, isLoading} = useMutation(
  //   data =>
  //     client(id ? `cohorts/${id}` : `cohorts`, {
  //       method: id ? 'PATCH' : 'POST',
  //       data: data,
  //     }),
  //   {
  //     onSuccess: data => {
  //       queryClient.invalidateQueries('cohorts')
  //       navigate(-1)
  //       reset()
  //     },
  //   },
  // )

  const onSubmitForm = data => {
    // mutate(data)
  }

  // if (fetchLoading) {
  //   return <FullPageSpinner />
  // }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {/* {isError ? <Alert severity="error">{error.message}</Alert> : null} */}

        <Dropdown
          name={'name'}
          title={'name'}
          optionLable={'name'}
          optionUrl={'locations'}
          errors={errors}
          control={control}
          setValue={setValue}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={() => navigate('/dashboard/users/Roles')}
          size="large"
          type="submit"
          variant="contained"
          sx={{mr: 2}}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          // loading={isLoading}
        >
          {id ? 'Update Cohort' : 'Create Cohort'}
        </LoadingButton>
      </Stack>
    </form>
  )
}
