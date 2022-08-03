import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Link, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import InputPassword from 'components/Form/components/InputPassword'
import RichText from 'components/Form/components/RichText'
import Uploader from 'components/Form/components/Uploader'
import {FullPageSpinner} from 'components/lib'
import {useAuth, useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom'
import {useAsync} from 'utils/hooks'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function EditProfileForm() {
  const {user: userAuth} = useAuth()
  const id = userAuth.id
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [userImage, setUserImage] = useState(null)
  const UserSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    phone_number: Yup.number().required('Phone number is required'),
  })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      phone_number: '',
      email: '',
    },
  })
  const {
    isLoading: fetchLoading,
    error: getOneError,
    data: user,
  } = useQuery({
    queryKey: 'user',
    queryFn: () => client(`getUserById?id=${id}`).then(data => data.data),
  })
  useEffect(() => {
    if (user && id !== undefined) {
      setUserImage(user.image)

      reset({
        ...user,
        phone_number: user.phonenumber,
      })
    }
  }, [user])
  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client('updateUserProfile', {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('user')
        navigate('/dashboard/profile')
      },
    },
  )
  const onSubmitForm = data => {
    mutate({
      ...data,
      user_id: id,
    })
  }
  if (fetchLoading) {
    return <FullPageSpinner />
  }
  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        {user.image && (
          <Uploader
            name="user_image"
            InputChange={(name, file) => {
              setValue(name, file)
            }}
            label="user_image"
            width="100%"
            accept={['image/*']}
            aspectRatio="1:1"
            multiple={false}
            maxFileSize={30}
            autoUpload={true}
            editValue={user.image}
          />
        )}
        <CustomInput
          label="firstName"
          name="firstname"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="lastName"
          name="lastname"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="email"
          name="email"
          control={control}
          errors={errors}
        />

        <CustomInput
          label="phone_number"
          name="phone_number"
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
          size="large"
          variant="contained"
          style={{marginLeft: '1rem'}}
          onClick={() => navigate(-1)}
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
