import {yupResolver} from '@hookform/resolvers/yup'
import {LoadingButton} from '@mui/lab'
import {
  Alert,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material'
import axios from 'axios'
import Iconify from 'components/Iconify'
import {useClient} from 'context/auth-context'
import fileDownload from 'js-file-download'
import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery} from 'react-query'
import {useAsync} from 'utils/hooks'
import useStyles from '../styles'
import * as Yup from 'yup'

export default function ShowChoose({id, deleteFile, module_id, dataModule}) {
  const classes = useStyles()
  const client = useClient()
  const {isLoading, error, data, refetch} = useQuery({
    queryKey: `ChoiceOption${id}`,
    queryFn: () =>
      client(`module/choice/getChoiceOptions?choice_id=${id}`).then(
        data => data?.data,
      ),
  })

  const LessonSchema = Yup.object().shape({})

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(LessonSchema),
  })
  const {
    mutate,
    isError,
    error: errorSubmite,
    isLoading: isLoadingSubmite,
  } = useMutation(
    data =>
      client(`module/choice/submitChoiceResponse`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        reset()
      },
      onError: data => {
        reset()
      },
    },
  )
  const onSubmitForm = data => {
    mutate({
      choice_id: id,
      option_id: data?.answer,
    })
  }
  return (
    <>
      <ListItem className={classes.li}>
        <form
          style={{width: '100%'}}
          noValidate
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <Stack>
            {isError ? (
              <Alert severity="error">
                <FormattedMessage id="you_already_submitted" />
              </Alert>
            ) : null}
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <ListItemText primary={dataModule?.name} />
              </FormLabel>
              <Controller
                rules={{required: true}}
                control={control}
                name="answer"
                render={({field}) => (
                  <RadioGroup
                    {...field}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    {data?.map((item, index) => (
                      <FormControlLabel
                        value={item.id}
                        control={<Radio />}
                        label={item?.text}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </FormControl>
            {watch('answer') !== undefined && (
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loading={isLoadingSubmite}
              >
                <FormattedMessage id="submit" />
              </LoadingButton>
            )}
          </Stack>
        </form>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
