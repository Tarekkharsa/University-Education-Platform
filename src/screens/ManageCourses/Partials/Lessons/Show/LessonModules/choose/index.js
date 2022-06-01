import {
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import axios from 'axios'
import Iconify from 'components/Iconify'
import {useClient} from 'context/auth-context'
import fileDownload from 'js-file-download'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {useAsync} from 'utils/hooks'
import useStyles from '../styles'

export default function ShowChoose({id, deleteFile, module_id}) {
  const classes = useStyles()

  return <>choose</>
}
