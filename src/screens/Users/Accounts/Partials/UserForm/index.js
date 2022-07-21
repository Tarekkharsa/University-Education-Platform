import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Link, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import Dropdown from 'components/Form/components/Dropdown'
import InputPassword from 'components/Form/components/InputPassword'
import MultiSelect from 'components/Form/components/MultiDropdown'
import RichText from 'components/Form/components/RichText'
import Uploader from 'components/Form/components/Uploader'
import {useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom'
import {useAsync} from 'utils/hooks'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function UserForm({onSubmit}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const UserSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    password: !id ? Yup.string().required('Password is required') : '',
    username: Yup.string().required('Username is required'),
    role_ids: Yup.array().min(1).required(),
    group_id: Yup.object().nullable(),
    father_name: Yup.string(),
    national_id_number: Yup.string(),
    mother_name: Yup.string(),
    phone_number: Yup.string(),
  })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      username: '',
      role_ids: [],
      group_id: null,
      father_name: '',
      national_id_number: '',
      mother_name: '',
      phone_number: '',
    },
  })
  const renderGroup = () => {
    if (watch('role_ids')?.length > 0) {
      let isStudent = watch('role_ids')
        ?.map(role => role.id)
        ?.includes(4)
      return isStudent
    }
    return false
  }

  const {
    isLoading: fetchLoading,
    error: getOneError,
    data: user,
  } = useQuery({
    queryKey: 'user',
    queryFn: () => client(`getUserById?id=${id}`).then(data => data.data),
    enabled: id !== undefined,
  })
  useEffect(() => {
    if (user && id !== undefined) {
      reset({
        ...user,
        role_ids: user.roles,
        certificate_image: user.certificateimage,
        father_name: user.fathername,
        user_image: user.image,
        phone_number: user.phonenumber,
        mother_name: user.mothername,
        national_id_number: user.nationalidnumber,
        national_id_image: user.nationalidimage,
      })
    }
  }, [user])
  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(id ? 'updateUser' : `createUser`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('users')
        navigate('/dashboard/users/accounts')
        reset()
      },
    },
  )
  const onSubmitForm = data => {
    let {firstname, lastname, email, password, username, role_ids, group_id} =
      data
    mutate({
      firstname,
      lastname,
      email,
      username,
      password,
      user_id: id ? id : undefined,
      role_ids: role_ids.map(role => role.id),
      group_id: group_id ? group_id?.id : undefined,
      certificate_image: data.certificate_image
        ? data.certificate_image
        : undefined,
      father_name: data.father_name ? data.father_name : undefined,
      user_image: data.user_image ? data.user_image : undefined,
      phone_number: data.phone_number ? data.phone_number : undefined,
      mother_name: data.mother_name ? data.mother_name : undefined,
      national_id_number: data.national_id_number
        ? data.national_id_number
        : undefined,
      national_id_image: data.national_id_image
        ? data.national_id_image
        : undefined,
    })
  }
  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        {id && user?.image && (
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
            editValue={user?.image}
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
          label="userName"
          name="username"
          control={control}
          errors={errors}
        />
        {!id && (
          <MultiSelect
            multiple
            name={'role_ids'}
            title={'user_roles'}
            optionLable={'name'}
            optionUrl={'getAllRoles'}
            errors={errors}
            control={control}
            handleChange={value => setValue('role_ids', value)}
          />
        )}
        {renderGroup() && !id && (
          <MultiSelect
            name={'group_id'}
            title={'groups'}
            optionLable={'name'}
            optionUrl={'group/getAllGroups'}
            errors={errors}
            control={control}
            handleChange={value => setValue('group_id', value)}
          />
        )}
        <CustomInput
          label="email"
          name="email"
          control={control}
          errors={errors}
        />
        {id === undefined && (
          <InputPassword
            label="password"
            name="password"
            control={control}
            errors={errors}
          />
        )}
        {id && user?.fathername && (
          <CustomInput
            label="father_name"
            name="father_name"
            control={control}
            errors={errors}
          />
        )}
        {id && user?.nationalidnumber && (
          <CustomInput
            label="national_id_number"
            name="national_id_number"
            control={control}
            errors={errors}
          />
        )}
        {id && user?.mothername && (
          <CustomInput
            label="mother_name"
            name="mother_name"
            control={control}
            errors={errors}
          />
        )}
        {id && user?.phonenumber && (
          <CustomInput
            label="phone_number"
            name="phone_number"
            control={control}
            errors={errors}
          />
        )}
        {id && user?.nationalidimage && (
          <Uploader
            name="national_id_image"
            InputChange={(name, file) => {
              setValue(name, file)
            }}
            label="national_id_image"
            width="100%"
            accept={['image/*']}
            aspectRatio="1:1"
            multiple={false}
            maxFileSize={30}
            autoUpload={true}
            editValue={user?.nationalidimage}
          />
        )}
        {id && user?.certificateimage && (
          <Uploader
            name="certificate_image"
            InputChange={(name, file) => {
              setValue(name, file)
            }}
            label="certificate_image"
            width="100%"
            accept={['image/*']}
            aspectRatio="1:1"
            multiple={false}
            maxFileSize={30}
            autoUpload={true}
            editValue={user?.certificateimage}
          />
        )}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={() => navigate(-1)}
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
          {id !== undefined ? (
            <FormattedMessage id="update_user" />
          ) : (
            <FormattedMessage id="save" />
          )}
        </LoadingButton>
      </Stack>
    </form>
  )
}
