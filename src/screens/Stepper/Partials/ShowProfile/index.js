import {
  Avatar,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from '@mui/material'
import Page from 'components/Page'
import React from 'react'
import account from '../../../../_mocks_/account'
import {styled} from '@mui/material/styles'
import useStyles from './styles'

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

export default function ShowProfile() {
  const classes = useStyles()
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
    </Page>
  )
}
