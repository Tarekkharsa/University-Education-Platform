import {Container} from '@mui/material'
import Page from 'components/Page'
import {useAuth, useClient} from 'context/auth-context'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import useStyles from './styles'
import ChooseModuleForm from './ChooseModuleForm'

const ChooseModule = ({open, handleClose, handleOpen}) => {
  const classes = useStyles()
  return (
    <Page title="Lessons">
      <Container>
        <div className={classes.header}>
          <FormattedMessage id="add_url" />
        </div>
        <ChooseModuleForm />
      </Container>
    </Page>
  )
}
export default ChooseModule
