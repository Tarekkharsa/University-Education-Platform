import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import Dropdown from 'components/Form/components/Dropdown'
import MultiSelect from 'components/Form/components/MultiDropdown'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner, ModalSpinner} from 'components/lib'
import {useAuth, useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function UsersForm({handleClose}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const UsersSchema = Yup.object().shape({
    user_ids: Yup.array().min(1).required(),
    role_id: Yup.object().required(),
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(UsersSchema),
    defaultValues: {user_ids: [], role_id: null},
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(`course/enroll/enrollUserToCourse`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('course_users')
        handleClose()
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    let {user_ids, role_id} = data
    let ids = user_ids.map(user => user.id)
    mutate({user_ids: ids, course_id: id, role_id: role_id?.id})
  }

  if (isLoading) {
    return <ModalSpinner />
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        <MultiSelect
          name={'user_ids'}
          title={'users'}
          optionLable={'username'}
          optionUrl={'getAllUsers'}
          errors={errors}
          control={control}
          handleChange={value => setValue('user_ids', value)}
          multiple
        />
        <MultiSelect
          name={'role_id'}
          title={'user_roles'}
          optionLable={'name'}
          optionUrl={'getAllRoles'}
          errors={errors}
          control={control}
          handleChange={value => setValue('role_id', value)}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={handleClose}
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
