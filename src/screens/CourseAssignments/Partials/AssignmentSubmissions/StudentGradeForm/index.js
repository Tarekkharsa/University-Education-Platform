import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomInput from 'components/Form/components/CustomInput'
import MultiSelect from 'components/Form/components/MultiDropdown'
import {useAuth, useClient} from 'context/auth-context'
import {useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function StudentGradeForm({user, handleClose}) {
  const {assignment_id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const Schema = Yup.object().shape({
    grade: Yup.number().required(),
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
    defaultValues: {grade: null},
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(`module/assignment/setStudentGradeForAssignment`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('getAssignmentParticipants')
        handleClose()
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    mutate({
      ...data,
      assignment_id: assignment_id,
      user_id: user?.id,
    })
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        <CustomInput
          label="grade"
          name="grade"
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
          onClick={handleClose}
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
          <FormattedMessage id="save" />
        </LoadingButton>
      </Stack>
    </form>
  )
}
