// ShowUserCourse

// material
import {
  Container,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material'
import {styled} from '@mui/material/styles'
import Iconify from 'components/Iconify'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import {useClient} from 'context/auth-context'
import {useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'
import LessonList from 'sections/@dashboard/sections/LessonList'

const SearchStyle = styled(OutlinedInput)(({theme}) => ({
  width: '90%',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {width: '100%', boxShadow: theme.customShadows.z8},
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}))
export default function ShowUserCourse() {
  const client = useClient()
  const {id} = useParams()
  const [value, setValue] = useState('')

  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: 'userCourses',
    queryFn: () =>
      client(`course/getCourseLessonsWithDetails?id=${id}`).then(
        data => data.data.lessons,
      ),
  })

  if (isFetching && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Lessons">
      <Container>
        <Typography variant="h4" sx={{mb: 5}}>
          <FormattedMessage id="lessons" />
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{mb: 5}}
        >
          <Stack
            direction="row"
            width={'100%'}
            spacing={1}
            justifyContent={'center'}
          >
            <SearchStyle
              value={value || ''}
              onChange={e => {
                setValue(e.target.value)
              }}
              placeholder={`...`}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{color: 'text.disabled'}}
                  />
                </InputAdornment>
              }
            />
          </Stack>
        </Stack>

        <LessonList lessons={data} value={value} />
      </Container>
    </Page>
  )
}
