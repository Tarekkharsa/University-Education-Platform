import {Container, Stack} from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Page from 'components/Page'
import useRoles from 'hooks/useRoles'
import PropTypes from 'prop-types'
import * as React from 'react'
import {FormattedMessage} from 'react-intl'
import {useLocation, useParams} from 'react-router-dom'
import AssignmentParticipants from '../Partials/AssignmentParticipants'
import Questions from '../Partials/AssignmentParticipants'
import AssignmentSubmissions from '../Partials/AssignmentSubmissions'
import TeacherGradesAssignment from '../Partials/TeacherGradesAssignment'
import ShowAssignmentDetails from './ShowAssignmentDetails'

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

export default function ShowAssignment() {
  const [value, setValue] = React.useState(0)
  const {id} = useParams()
  const {checkIfRolesInUserRoles} = useRoles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Page title="Course Assignment">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="assignment_details" />
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
                label={<FormattedMessage id="assignment_info" />}
                {...a11yProps(0)}
              />
              <Tab
                label={<FormattedMessage id="assignment_participants" />}
                {...a11yProps(1)}
              />
              <Tab
                label={<FormattedMessage id="assignment_Submissions" />}
                {...a11yProps(2)}
              />
              <Tab
                label={<FormattedMessage id="teacher_grades_assignment" />}
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ShowAssignmentDetails />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AssignmentParticipants />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AssignmentSubmissions />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TeacherGradesAssignment />
          </TabPanel>
        </Box>
      </Container>
    </Page>
  )
}
