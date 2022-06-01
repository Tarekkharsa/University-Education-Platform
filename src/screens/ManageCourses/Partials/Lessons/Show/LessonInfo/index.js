import {Divider, List, ListItem, ListItemIcon} from '@mui/material'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import useStyles from './styles'
import ReactHtmlParser from 'react-html-parser'

export default function LessonInfo({data}) {
  const classes = useStyles()

  return (
    <List className={classes.root}>
      <ListItem button className={classes.li}>
        <ListItemIcon>
          <FormattedMessage id="fullname" />
        </ListItemIcon>
        <div>{data?.name}</div>
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem button className={classes.descLi}>
        <ListItemIcon>
          <FormattedMessage id="description" />
        </ListItemIcon>
        <div>{ReactHtmlParser(data?.summary)}</div>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  )
}
