import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
  Avatar,
  Box,
} from '@mui/material'
import Iconify from 'components/Iconify'
import {FullPageSpinner} from 'components/lib'
import Page from 'components/Page'
import {useClient} from 'context/auth-context'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import {Link as RouterLink, useParams} from 'react-router-dom'
import useStyles from './styles'
import {styled} from '@mui/material/styles'
import account from '../../../../_mocks_/account'

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
  height: '350px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}))

const AvatarStyle = styled(Avatar)(({theme}) => ({
  width: '50%',
  height: '45%',
}))
const ImgStyle = styled(Avatar)(({theme}) => ({
  width: '150px',
  height: '145px',
  borderRadius: 'unset',
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

export default function ShowAccount() {
  const classes = useStyles()
  const {id} = useParams()
  const client = useClient()
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
    <Page title="User | Account">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="account_details" />
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to={`/dashboard/users/accounts/${id}/edit`}
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            <FormattedMessage id="edit_user" />
          </Button>
        </Stack>
        <ContainerStyle>
          <AccountStyle>
            <AvatarStyle
              src={process.env.REACT_APP_STORAGEURL_API_URL + user.image}
              alt="photoURL"
            />
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

            <ListItem className={classes.li}>
              <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
                <FormattedMessage id="certificate_image" />
              </Typography>
              <ImgStyle
                src={
                  process.env.REACT_APP_STORAGEURL_API_URL +
                  user.certificateimage
                }
                alt="photoURL"
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem className={classes.li}>
              <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
                <FormattedMessage id="national_id_number" />
              </Typography>
              <ImgStyle
                src={
                  process.env.REACT_APP_STORAGEURL_API_URL +
                  user.nationalidimage
                }
                alt="photoURL"
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </AccountDetailsStyle>
        </ContainerStyle>
      </Container>
    </Page>
  )
}
