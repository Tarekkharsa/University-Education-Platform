import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Link, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import InputPassword from 'components/Form/components/InputPassword'
import MultiSelect from 'components/Form/components/MultiDropdown'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {Link as RouterLink} from 'react-router-dom'
import {useAsync} from 'utils/hooks'
import * as Yup from 'yup'
import Dropdown from 'components/Form/components/Dropdown'

// ----------------------------------------------------------------------
const groups = {
  'السنة الاولى': '8',
  'السنة الثانية': '13',
  'السنة الثالثة': '14',
  'السنة الرابعة - برمجيات': '15',
  'السنة الرابعة -شبكات': '16',
  'السنة الرابعة -ذكاء الصنعي': '17',
  'السنة الخامسة - برمجيات': '18',
  'السنة الخامسة - شبكات': '19',
  'السنة الخامسة - ذكاء صنعي': '20',
}
export default function RegisterForm({onSubmit}) {
  const {isLoading, isError, error, run} = useAsync()

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    username: Yup.string().required('User Name is required'),
    firstname: Yup.string().required('first Name is required'),
    lastname: Yup.string().required('last Name is required'),
    password: Yup.string().required('Password is required'),
    group_id: Yup.string().required(),
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
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      group_id: '',
      password: '',
      remember: true,
    },
  })

  const onSubmitForm = data => {
    const {username, password, firstname, lastname, group_id, email} = data
    run(
      onSubmit({
        username,
        password,
        firstname,
        lastname,
        group_id: groups[group_id],
        email,
      }),
    )
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
        <CustomInput
          label="userName"
          name="username"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="Email"
          name="email"
          control={control}
          errors={errors}
        />
        <Dropdown
          name={'group_id'}
          title={'level'}
          optionLable={'name'}
          options={[
            'السنة الاولى',
            'السنة الثانية',
            'السنة الثالثة',
            'السنة الرابعة - برمجيات',
            'السنة الرابعة -شبكات',
            'السنة الرابعة -ذكاء الصنعي',
            'السنة الخامسة - برمجيات',
            'السنة الخامسة - شبكات',
            'السنة الخامسة - ذكاء صنعي',
          ]}
          setValue={setValue}
          errors={errors}
          control={control}
          handleChange={value => setValue('group_id', value)}
        />
        <InputPassword
          label="password"
          name="password"
          control={control}
          errors={errors}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{my: 2}}
      >
        <CustomCheckbox
          label="remember_me"
          name="remember"
          control={control}
          errors={errors}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
      >
        <FormattedMessage id="register" />
      </LoadingButton>
    </form>
  )
}
