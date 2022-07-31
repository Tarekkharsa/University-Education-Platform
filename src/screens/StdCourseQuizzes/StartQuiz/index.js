import {yupResolver} from '@hookform/resolvers/yup'
import {LoadingButton} from '@mui/lab'
import {
  Alert,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material'
import Iconify from 'components/Iconify'
import {FullPageSpinner} from 'components/lib'
import Page from 'components/Page'
import {useAuth, useClient} from 'context/auth-context'
import moment from 'moment'
import React, {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import ReactHtmlParser from 'react-html-parser'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom'
import useStyles from './styles'
import * as Yup from 'yup'
import Multichoice from './multichoice'
import axios from 'axios'
import {useAsync} from 'utils/hooks'

export default function StartQuiz() {
  const classes = useStyles()
  const {course_id, quiz_id} = useParams()
  const client = useClient()
  const {user} = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const LessonSchema = Yup.object().shape({})

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(LessonSchema),
    defaultValues: {},
  })

  // const {isLoadingStartAttemptQuiz, errorStartAttemptQuiz, dataAttemptQuiz} =
  //   useQuery({
  //     queryKey: `startAttemptQuiz_=${quiz_id}`,
  //     queryFn: () =>
  //       client(`module/quiz/startAttemptQuiz?quiz_id=${quiz_id}`).then(
  //         data => data.data,
  //       ),
  //   })

  // useEffect(() => {
  //   axios.get(
  //     `http://127.0.0.1:8081/module/quiz/startAttemptQuiz?quiz_id=${quiz_id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     },
  //   )
  // }, [])

  const {isLoading, error, data} = useQuery({
    queryKey: `QuizQuestions_${quiz_id}`,
    queryFn: () =>
      client(`module/quiz/getQuizQuestions?quiz_id=${quiz_id}`).then(
        data => data.data,
      ),
  })

  const {
    mutate,
    isError,
    error: submitError,
    isLoading: isLoadingSubmit,
  } = useMutation(
    data =>
      client(`module/quiz/addQuizAnswers`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        navigate('/')
        reset()
      },
    },
  )
  const onSubmitForm = data => {
    let answers = Object.keys(data).map(key => {
      return {
        answer: data[key],
        question_id: key.split('_')[1],
        type: key.split('_')[0] === 'truefalse' ? 1 : 2,
      }
    })
    mutate({
      user_id: user?.id,
      quiz_id: quiz_id,
      attempt_id: '1',
      answer_list: answers,
    })
  }
  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error?.message}</Alert> : null}
        {data?.quiestion.map(
          (question, index) =>
            question?.qtype === 'truefalse' && (
              <>
                <FormControl component="fieldset">
                  <FormLabel component="legend">{question?.name}</FormLabel>
                  <Controller
                    rules={{required: true}}
                    control={control}
                    name={`truefalse_${question?.id}`}
                    render={({field}) => (
                      <RadioGroup {...field} style={{flexDirection: 'row'}}>
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="True"
                        />
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="False"
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
                <Divider variant="inset" />
              </>
            ),
        )}
        {data?.quiestion.map(
          (question, index) =>
            question?.qtype === 'multichoice' && (
              <>
                <FormControl component="fieldset">
                  <FormLabel component="legend">{question?.name}</FormLabel>
                  <Multichoice question={question} control={control} />
                </FormControl>
                <Divider variant="inset" />
              </>
            ),
        )}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isLoadingSubmit}
        >
          <FormattedMessage id="submit_answers" />
        </LoadingButton>
      </Stack>
    </form>
  )
}
