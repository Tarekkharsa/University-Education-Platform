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
import {FormattedMessage} from 'react-intl'
import {useTheme} from '@mui/styles'
import Settings from './Partials/Settings'
import {useAuth, useClient} from 'context/auth-context'
import {useQuery} from 'react-query'
import {FullPageSpinner} from 'components/lib'
import useFiles from 'hooks/useFiles'
import ChangePassword from './Partials/ChangePassword'

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
  justifyContent: 'center',
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
  const {user: userAuth} = useAuth()
  console.log(userAuth)
  let id = userAuth.id
  const client = useClient()
  const theme = useTheme()
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: 'user',
    queryFn: () => client(`getUserById?id=${id}`).then(data => data.data),
  })

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Page title="User | Profile">
      <ContainerStyle>
        <AccountStyle>
          <AvatarStyle src={account.photoURL} alt="photoURL" />
          <Box sx={{ml: 2, mt: 2}}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              {user.firstname} {user.lastname}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              {account.role}
            </Typography>
          </Box>
        </AccountStyle>
        <AccountDetailsStyle>
          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              <FormattedMessage id="firstName" />
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              {user.firstname}
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              <FormattedMessage id="lastName" />
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              {user.lastname}
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              <FormattedMessage id="father_name" />
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              {user.fathername}
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              <FormattedMessage id="mother_name" />
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              {user.mothername}
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              <FormattedMessage id="phone_number" />
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              {user.phonenumber}
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              <FormattedMessage id="national_id_number" />
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              {user.nationalidnumber}
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              <FormattedMessage id="userName" />
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              {user.username}
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              <FormattedMessage id="email" />
            </Typography>
            <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
              {user.email}
            </Typography>
          </ListItem>
          <Divider variant="inset" component="li" />
        </AccountDetailsStyle>
      </ContainerStyle>
      <EditSectionStyle>
        <Button
          variant="contained"
          component={RouterLink}
          to="/dashboard/profile/edit"
          startIcon={<Iconify icon="eva:edit-2-outline" />}
        >
          <FormattedMessage id="edit_account" />
        </Button>
      </EditSectionStyle>
      <Box sx={{width: '100%', mt: 5}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={<FormattedMessage id="settings" />} {...a11yProps(0)} />

            <Tab
              label={<FormattedMessage id="change_password" />}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Settings />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ChangePassword />
        </TabPanel>
      </Box>
    </Page>
  )
}
