import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import RichText from 'components/Form/components/RichText'
import {ModalSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function TrueFalseQuestionForm({handleClose}) {
  const {quiz_id, category_id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const LessonSchema = Yup.object().shape({
    name: Yup.string().required(),
    mark: Yup.string().required(),
    description: Yup.string().required(),
    answer: Yup.boolean().required(),
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(LessonSchema),
    defaultValues: {
      name: '',
      mark: '',
      description: '',
      answer: null,
    },
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(`module/quiz/createTrueFalseQuestions`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('questions')
        handleClose()
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    mutate({
      category_id: category_id,
      quiz_id: quiz_id,
      questions_list: [
        {
          name: data?.name,
          description: data.description,
          answer: data?.answer === true ? '1' : '0',
          mark: data?.mark,
        },
      ],
    })
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        <CustomInput
          label="question"
          name="name"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="description"
          name="description"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="mark"
          name="mark"
          control={control}
          errors={errors}
        />
        <CustomCheckbox
          label="check_if_answer_is_true"
          name="answer"
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
