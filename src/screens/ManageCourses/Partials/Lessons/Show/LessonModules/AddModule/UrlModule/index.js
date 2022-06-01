import {Container} from '@mui/material'
import Page from 'components/Page'
import {useAuth, useClient} from 'context/auth-context'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import useStyles from './styles'
import UrlModuleForm from './UrlModuleForm'

const UrlModule = ({open, handleClose, handleOpen}) => {
  const classes = useStyles()
  return (
    <Page title="Lessons">
      <Container>
        <div className={classes.header}>
          <FormattedMessage id="add_url" />
        </div>
        <UrlModuleForm />
      </Container>
    </Page>
  )
}
export default UrlModule
