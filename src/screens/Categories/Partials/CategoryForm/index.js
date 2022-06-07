import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomInput from 'components/Form/components/CustomInput'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function CategoryForm({onSubmit}) {
  const {id} = useParams()
  const {state} = useLocation()

  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const CategorySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    // description: Yup.string(),
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
    resolver: yupResolver(CategorySchema),
    defaultValues: {name: ''},
  })

  const {
    isLoading: fetchLoading,
    error: getOneError,
    data: category,
  } = useQuery({
    queryKey: 'category',
    queryFn: () => client(`getCategoryById?id=${id}`).then(data => data.data),
    enabled: id !== undefined,
  })

  useEffect(() => {
    if (category && id !== undefined) {
      reset(category)
    }
  }, [category])

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(id ? `updateCategory` : `createCategory`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('categories')
        navigate('/dashboard/categories')
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    let {name} = data
    mutate({
      name,
      // description,
      parent_id: state !== null ? state.id : 0,
      id: id ? id : undefined,
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
          label="category_name"
          name="name"
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
          onClick={() => navigate('/dashboard/categories')}
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
            <FormattedMessage id="update_category" />
          ) : (
            <FormattedMessage id="save" />
          )}
        </LoadingButton>
      </Stack>
    </form>
  )
}
