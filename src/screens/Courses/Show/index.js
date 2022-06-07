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
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import PropTypes from 'prop-types'
import ManageCalendar from '../ManageCalendar'

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
export default function ShowUserCourse() {
  const client = useClient()
  const {id} = useParams()
  const [value, setValue] = useState('')
  const [tab, setTab] = useState(0)
  const handleChange = (event, newValue) => {
    setTab(newValue)
  }
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
            {tab === 0 && (
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
            )}
          </Stack>
        </Stack>
        <Box sx={{width: '100%'}}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs
              value={tab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={<FormattedMessage id="lessons" />}
                {...a11yProps(0)}
              />
              <Tab
                label={<FormattedMessage id="calendar" />}
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <LessonList lessons={data} value={value} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <ManageCalendar />
          </TabPanel>
        </Box>
      </Container>
    </Page>
  )
}
