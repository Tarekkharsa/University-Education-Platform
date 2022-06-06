// ShowUserCourse

// material
import {
  Container,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import {useAuth, useClient} from 'context/auth-context'
import {useMemo, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import CourseList from 'sections/@dashboard/sections/CourseList'
import {styled} from '@mui/material/styles'
import Iconify from 'components/Iconify'
import {useParams} from 'react-router-dom'

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
export default function ShowUserLesson() {
  const client = useClient()
  const {id, lessonId} = useParams()
  const [value, setValue] = useState('')

  const {isLoading, error, data} = useQuery({
    queryKey: 'userLessons',
    queryFn: () =>
      client(
        `course/getCourseLessonsWithDetailsByLessonId?id=${id}&lesson_id=${lessonId}`,
      ).then(data => data.data.lessons[0]),
  })

  console.log('data', data)
  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Lesson Info">
      <Container>
        <Typography variant="h4" sx={{mb: 5}}>
          <FormattedMessage id="lesson_info" />
        </Typography>
        info
      </Container>
    </Page>
  )
}
