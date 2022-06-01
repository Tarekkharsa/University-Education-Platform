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

export default function RemoveGroupForm({handleClose}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const Schema = Yup.object().shape({
    group_id: Yup.object().required(),
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {group_id: null},
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(`course/enroll/unEnrollGroupFromCourse`, {
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
    let {group_id} = data
    mutate({group_id: group_id?.id, course_id: id})
  }

  if (isLoading) {
    return <ModalSpinner />
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        <MultiSelect
          name={'group_id'}
          title={'groups'}
          optionLable={'name'}
          optionUrl={'group/getAllGroups'}
          errors={errors}
          control={control}
          handleChange={value => setValue('group_id', value)}
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
