import {Button, Container, Stack} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Iconify from 'components/Iconify'
import Page from 'components/Page'
import {useClient} from 'context/auth-context'
import PropTypes from 'prop-types'
import * as React from 'react'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import LessonInfo from './LessonInfo'
import LessonModules from './LessonModules'
import {Link as RouterLink, useParams} from 'react-router-dom'
import {FullPageSpinner} from 'components/lib'
import {useEffect} from 'react'

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

export default function ShowLesson() {
  const {id, lessonId} = useParams()
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const client = useClient()

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'lesson',
    queryFn: () =>
      client(
        `course/getCourseLessonsWithDetailsByLessonId?id=${id}&lesson_id=${lessonId}`,
      ).then(data => data.data),
  })

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Page title="Lesson">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="lessons" />
          </Typography>
        </Stack>
        <Box sx={{width: '100%'}}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs
              value={value}
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
          <TabPanel value={value} index={0}>
            <LessonInfo data={data?.lessons[0]} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LessonModules
              modules={data?.lessons[0]?.modules}
              token={data?.tokenfile}
              section={data?.lessons[0]?.section}
            />
          </TabPanel>
        </Box>
      </Container>
    </Page>
  )
}
