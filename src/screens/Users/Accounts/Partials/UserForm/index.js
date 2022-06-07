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
    username: Yup.string(),
    role_ids: Yup.array().min(1).required(),
    group_id: Yup.object().nullable(),
    specification_id: Yup.object().nullable(),
    level: Yup.number().nullable(),
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
      specification_id: null,
      level: null,
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
        specification_id: user.specification,
        level: user.level,
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
      password: id ? undefined : password,
      user_id: id ? id : undefined,
      username: id ? username : undefined,
      specification_id:
        renderGroup() && id ? data.specification_id?.id : undefined,
      level: data?.level && renderGroup() && id ? data?.level : undefined,
      role_ids: role_ids.map(role => role.id),
      group_id: group_id ? group_id?.id : undefined,
    })
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
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
        {id && (
          <CustomInput
            label="userName"
            name="username"
            control={control}
            errors={errors}
          />
        )}
        {renderGroup() && id && (
          <MultiSelect
            name={'specification_id'}
            title={'specifications'}
            optionLable={'name'}
            optionUrl={'getSpecifications'}
            errors={errors}
            control={control}
            handleChange={value => setValue('specification_id', value)}
          />
        )}
        {renderGroup() && id && (
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
