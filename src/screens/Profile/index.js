// material
import {TabContext, TabList, TabPanel} from '@mui/lab'
import {Container, Paper, Stack, Tab, Typography} from '@mui/material'
import {styled} from '@mui/material/styles'
import Iconify from 'components/Iconify'
// components
import Page from 'components/Page'
import {useState} from 'react'
import AccountDetail from './AccountDetail'
import ChangePassword from './ChangePassword'

// ----------------------------------------------------------------------
const RootStyle = styled(Paper)(({theme}) => ({
  // boxShadow: 'unset',
  // flexGrow: 1,
  // maxWidth: '100%',
  // marginTop: '30px',
  // '& .MuiTab-wrapper': {
  //   flexDirection: 'row',
  // },
  // '& .MuiTab-labelIcon .MuiTab-wrapper > *:first-child': {
  //   marginBottom: 0,
  //   marginRight: '6px',
  // },
  // '& .MuiTabs-root': {
  //   width: '79%',
  //   margin: 'auto',
  //   fontSize: '0.75rem',
  // },
  // '& .MuiTab-root': {
  //   fontSize: '0.77rem',
  // },
  // '& .MuiTab-textColorSecondary.Mui-selected': {
  //   color: '#18b2aa',
  // },
  // '& .PrivateTabIndicator-colorSecondary-4': {
  //   backgroundColor: '#18b2aa',
  // },
  // '& .MuiSvgIcon-root ': {
  //   fontSize: '1.2rem',
  // },
}))

export default function Profile() {
  let user = {
    id: 1,
    first_name: 'firstname',
    last_name: 'lastname',
  }

  let tabs = {
    'account-detail': 0,
    'change-password': 1,
  }
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Page title="Category">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>
        <div>
          <TabContext value={value}>
            <RootStyle square>
              <TabList
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="simple tabs example"
              >
                <Tab
                  icon={<Iconify icon="healthicons:ui-user-profile-outline" />}
                  label="Account Detail"
                  value={0}
                />
                <Tab
                  icon={<Iconify icon="ant-design:lock-outlined" />}
                  label="Change Password"
                  value={3}
                />
              </TabList>
            </RootStyle>
            <TabPanel value={0}>
              <AccountDetail />
            </TabPanel>
            <TabPanel value={1}>
              <ChangePassword />
            </TabPanel>
          </TabContext>
        </div>
      </Container>
    </Page>
  )
}
