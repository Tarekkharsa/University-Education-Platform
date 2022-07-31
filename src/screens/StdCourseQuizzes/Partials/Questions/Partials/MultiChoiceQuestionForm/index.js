import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {
  Alert,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material'
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

export default function MultiChoiceQuestionForm({handleClose}) {
  const {quiz_id, category_id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const LessonSchema = Yup.object().shape({
    name: Yup.string().required(),
    mark: Yup.string().required(),
    description: Yup.string().required(),
    choice_one: Yup.string().required(),
    choice_two: Yup.string().required(),
    choice_three: Yup.string(),
    choice_four: Yup.string(),
    choice_five: Yup.string(),
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
      choice_one: '',
      choice_two: '',
      choice_three: '',
      choice_four: '',
      choice_five: '',
    },
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(`module/quiz/createMultiChoiceQuestions`, {
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
          mark: data?.mark,
          choice_list: [
            {
              choice_text: data?.choice_one,
              correct: data?.answer === 'correct_one' ? 1 : 0,
            },
            {
              choice_text: data?.choice_two,
              correct: data?.answer === 'correct_two' ? 1 : 0,
            },
            {
              choice_text: data?.choice_three,
              correct: data?.answer === 'correct_three' ? 1 : 0,
            },
            {
              choice_text: data?.choice_four,
              correct: data?.answer === 'correct_four' ? 1 : 0,
            },
            {
              choice_text: data?.choice_five,
              correct: data?.answer === 'correct_five' ? 1 : 0,
            },
          ],
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
        <CustomInput
          label="choice_one"
          name="choice_one"
          control={control}
          errors={errors}
        />

        <CustomInput
          label="choice_two"
          name="choice_two"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="choice_three"
          name="choice_three"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="choice_four"
          name="choice_four"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="choice_five"
          name="choice_five"
          control={control}
          errors={errors}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose Correct Answer</FormLabel>
          <Controller
            rules={{required: true}}
            control={control}
            name="answer"
            render={({field}) => (
              <RadioGroup {...field} style={{flexDirection: 'row'}}>
                <FormControlLabel
                  value="choice_one"
                  control={<Radio />}
                  label="Choice One"
                />
                <FormControlLabel
                  value="choice_two"
                  control={<Radio />}
                  label="Choice Two"
                />
                <FormControlLabel
                  value="choice_three"
                  control={<Radio />}
                  label="Choice Three"
                />
                <FormControlLabel
                  value="choice_four"
                  control={<Radio />}
                  label="Choice Four"
                />
                <FormControlLabel
                  value="choice_five"
                  control={<Radio />}
                  label="Choice Five"
                />
              </RadioGroup>
            )}
          />
        </FormControl>
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
