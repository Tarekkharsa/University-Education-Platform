import {Button, Container, Stack} from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Iconify from 'components/Iconify'
import Page from 'components/Page'
import useRoles from 'hooks/useRoles'
import PropTypes from 'prop-types'
import * as React from 'react'
import {FormattedMessage} from 'react-intl'
import {Link as RouterLink, useParams} from 'react-router-dom'
import Questions from '../Partials/Questions'
import ShowQuizDetails from './showQuizDetails'

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

export default function ShowQuiz() {
  const [value, setValue] = React.useState(0)
  const {id} = useParams()
  const {checkIfRolesInUserRoles} = useRoles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Page title="Course Quiz">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="quiz_details" />
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
                label={<FormattedMessage id="quiz_info" />}
                {...a11yProps(0)}
              />
              <Tab
                label={<FormattedMessage id="questions" />}
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ShowQuizDetails />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Questions />
          </TabPanel>
        </Box>
      </Container>
    </Page>
  )
}
