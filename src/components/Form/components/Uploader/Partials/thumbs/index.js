import React from 'react'
import useStyles from './styles'
import {IconButton} from '@mui/material'
import Iconify from 'components/Iconify'

export default function Thumbs({
  files,
  setIndex,
  setImage,
  setFile,
  setCropper,
  onDelete,
}) {
  const classes = useStyles()

  const thumbs = files.map((file, index) =>
    file.file.type.split('/')[0] == 'image' ? (
      <div className={classes.thumb} key={file.file.name}>
        <div className={classes.thumbInner}>
          <img src={file.file.preview} className={classes.img} alt="" />
        </div>
        <IconButton
          className={classes.thumbEditButton}
          onClick={() => {
            setIndex(index)
            setImage(file.file.preview)
            setFile(file.file)
            setCropper(true)
          }}
        >
          {/* <Edit className={classes.icons} /> */}
          <Iconify className={classes.icons} icon="ci:edit" />
        </IconButton>
        <IconButton
          className={classes.thumbDeleteButton}
          onClick={() => onDelete(file.file)}
        >
          {/* <DeleteOutline className={classes.icons} /> */}
          <Iconify className={classes.icons} icon="ic:twotone-delete-outline" />
        </IconButton>
      </div>
    ) : (
      <div className={classes.thumb} key={file.file.name}>
        <div className={classes.fileName}>{file.file.name}</div>
        <IconButton
          className={classes.thumbDeleteButton}
          onClick={() => onDelete(file.file)}
        >
          {/* <DeleteOutline className={classes.icons} /> */}
          <Iconify className={classes.icons} icon="ic:twotone-delete-outline" />
        </IconButton>
      </div>
    ),
  )
  return <aside className={classes.thumbsContainer}>{thumbs}</aside>
}
