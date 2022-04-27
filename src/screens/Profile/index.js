import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import Page from 'components/Page'
import React from 'react'
import account from '../../_mocks_/account'
import {styled} from '@mui/material/styles'
import useStyles from './styles'
import Iconify from 'components/Iconify'
import {Link as RouterLink} from 'react-router-dom'

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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}
const AccountDetailsStyle = styled(List)(({theme}) => ({
  width: '68%',
  backgroundColor: 'transparent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: ' 0 24px 24px',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}))
const AccountStyle = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '30%',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}))

const AvatarStyle = styled(Avatar)(({theme}) => ({
  width: '50%',
  height: 'auto',
}))
const ContainerStyle = styled(Container)(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}))
const EditSectionStyle = styled('div')(({theme}) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: theme.spacing(3),
}))

export default function Profile() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Page title="User | Profile">
      <ContainerStyle>
        <AccountStyle>
          <AvatarStyle src={account.photoURL} alt="photoURL" />
          <Box sx={{ml: 2, mt: 2}}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              {account.displayName}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              {account.role}
            </Typography>
          </Box>
        </AccountStyle>
        <AccountDetailsStyle>
          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              First Name
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              firstName
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              Last Name
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              lastName
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              User Name
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              username
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              Email
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              email
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />
        </AccountDetailsStyle>
      </ContainerStyle>
      <EditSectionStyle>
        <Button
          variant="contained"
          component={RouterLink}
          to="/dashboard/cohorts/add"
          startIcon={<Iconify icon="eva:edit-2-outline" />}
        >
          Edit Account Details
        </Button>
      </EditSectionStyle>
      <Box sx={{width: '100%', mt: 5}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Cohort Info" {...a11yProps(0)} />
            <Tab label="Members" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          ldsjfl
        </TabPanel>
        <TabPanel value={value} index={1}>
          ldskfks
        </TabPanel>
      </Box>
    </Page>
  )
}
