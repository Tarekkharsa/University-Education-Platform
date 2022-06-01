import {yupResolver} from '@hookform/resolvers/yup'
import {LoadingButton} from '@mui/lab'
import {Alert, Button, Container, Modal, Stack, Typography} from '@mui/material'
import Uploader from 'components/Form/components/Uploader'
import {useAuth, useClient} from 'context/auth-context'
import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQueryClient} from 'react-query'
import * as Yup from 'yup'
import useStyles from './styles'
import axios, {post} from 'axios'
import Page from 'components/Page'
import Iconify from 'components/Iconify'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import CustomInput from 'components/Form/components/CustomInput'
import RichText from 'components/Form/components/RichText'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import FileModuleForm from './FileModuleForm'

const FileModule = ({open, handleClose, handleOpen}) => {
  const classes = useStyles()
  const client = useClient()
  const {user} = useAuth()
  return (
    <Page title="Lessons">
      <Container>
        <div className={classes.header}>
          <FormattedMessage id="add_file" />
        </div>
        <FileModuleForm />
      </Container>
    </Page>
  )
}
export default FileModule
