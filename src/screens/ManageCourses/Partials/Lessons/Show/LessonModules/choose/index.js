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
import useRoles from 'hooks/useRoles'
import fileDownload from 'js-file-download'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import {useAsync} from 'utils/hooks'
import useStyles from '../styles'

export default function ShowChoose({id, deleteUrl, module_id, dataModule}) {
  const {checkIfRolesInUserRoles} = useRoles()
  const classes = useStyles()
  const client = useClient()
  const {isLoading, error, data, refetch} = useQuery({
    queryKey: `choice${id}`,
    queryFn: () =>
      client(`module/choice/getChoiceResults?choice_id=${id}`).then(
        data => data?.data,
      ),
  })
  return (
    <>
      <ListItem className={classes.li}>
        <ListItemIcon>
          <Iconify
            className={classes.icon}
            icon="healthicons:i-exam-multiple-choice"
          />
        </ListItemIcon>
        <ListItemText primary={dataModule?.name} />
        {!checkIfRolesInUserRoles(['ROLE_ADMIN']) && (
          <IconButton onClick={() => deleteUrl({module_ids: [module_id]})}>
            <Iconify
              className={classes.icon}
              icon="fluent:delete-dismiss-28-filled"
            />
          </IconButton>
        )}
      </ListItem>
      <ListItem className={classes.li}>
        {data?.map((item, index) => (
          <ListItem className={classes.li}>
            <ListItemText primary={item?.text} />
            <ListItemText
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
                backgroundColor: 'primary.light',
                borderRadius: '5px',
                maxWidth: '50px',
              }}
              primary={`${item?.percentageamount}%`}
            />
            <div style={{width: '10px'}}>,</div>
          </ListItem>
        ))}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
