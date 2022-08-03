import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import Dropdown from 'components/Form/components/Dropdown'
import MultiSelect from 'components/Form/components/MultiDropdown'
import MultiSelectRoles from 'components/Form/components/MultiDropdownRoles'
import MultiSelectUsers from 'components/Form/components/MultiDropdownUsers'
import {ModalSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQueryClient} from 'react-query'
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
    watch,
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
    let {user_ids, role_id, is_theoretical} = data
    let ids = user_ids.map(user => user.id)
    mutate({
      user_ids: ids,
      course_id: id,
      role_id: role_id?.id,
      is_theoretical: is_theoretical ? Boolean(is_theoretical) : undefined,
    })
  }

  if (isLoading) {
    return <ModalSpinner />
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        <MultiSelectUsers
          name={'user_ids'}
          title={'users'}
          optionLable={'username'}
          optionUrl={'getAllUsers'}
          errors={errors}
          control={control}
          handleChange={value => setValue('user_ids', value)}
          multiple
        />
        <MultiSelectRoles
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
