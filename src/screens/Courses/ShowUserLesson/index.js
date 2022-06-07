// ShowUserCourse

// material
import {
  Card,
  CardMedia,
  Container,
  OutlinedInput,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import {styled} from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import {useClient} from 'context/auth-context'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'
import {mockImgCourse} from 'utils/mockImages'
import LessonInfo from './LessonInfo'
import LessonModules from './LessonModules'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  //   boxShadow: 24,
  p: 4,
  height: '80%',
  overflow: 'auto',
}
function TabPanel(props) {
  const {children, value, index, ...other} = props

  return (
    <div
      style={{width: '100%'}}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}
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

  const [tab, setTab] = useState(0)
  const handleChange = (event, newValue) => {
    setTab(newValue)
  }
  const {isLoading, error, data} = useQuery({
    queryKey: 'userLessons',
    queryFn: () =>
      client(
        `course/getCourseLessonsWithDetailsByLessonId?id=${id}&lesson_id=${lessonId}`,
      ).then(data => data.data),
  })

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Lesson">
      <Container>
        <Card sx={{maxWidth: '100%'}}>
          <CardMedia
            component="img"
            height="340"
            image={`/images/courses/course_3.jpg`}
            alt="green iguana"
          />
        </Card>
        <Box sx={{width: '100%'}}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs
              value={tab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={<FormattedMessage id="lesson_info" />}
                {...a11yProps(0)}
              />
              <Tab
                label={<FormattedMessage id="lesson_activities" />}
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <LessonInfo data={data?.lessons[0]} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {data && (
              <LessonModules
                modules={data?.lessons[0]?.modules}
                token={data?.tokenfile}
                section={data?.lessons[0]?.section}
              />
            )}
          </TabPanel>
        </Box>
      </Container>
    </Page>
  )
}
