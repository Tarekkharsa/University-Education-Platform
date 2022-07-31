import {FormControlLabel, Radio, RadioGroup} from '@mui/material'
import {useClient} from 'context/auth-context'
import React from 'react'
import {Controller} from 'react-hook-form'
import {FaSpinner} from 'react-icons/fa'
import {useQuery} from 'react-query'

export default function Multichoice({question, control}) {
  const client = useClient()

  const {isLoading, error, data} = useQuery({
    queryKey: 'Question',
    queryFn: () =>
      client(
        `module/quiz/getQuizQuestionAnswers?question_id=${question?.id}`,
      ).then(data => data.data),
  })
  if (isLoading) {
    return <FaSpinner />
  }
  return (
    <Controller
      rules={{required: true}}
      control={control}
      name={`multichoice_${question?.id}`}
      render={({field}) => (
        <RadioGroup {...field} style={{flexDirection: 'row'}}>
          {data.map((answer, index) => (
            <FormControlLabel
              value={answer?.id}
              control={<Radio />}
              label={answer?.answer}
            />
          ))}
        </RadioGroup>
      )}
    />
  )
}
