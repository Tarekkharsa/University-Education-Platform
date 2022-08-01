import {IconButton} from '@mui/material'
import Iconify from 'components/Iconify'
import React from 'react'

export default function ShowFile({file}) {
  let tokenfile = JSON.parse(localStorage.getItem('tokenfile'))
  return (
    <IconButton
      onClick={() =>
        window.open(
          `${file?.fileurl}?token=${
            tokenfile ? tokenfile : '74f05cc06014c1429192995d33d81e0a'
          }`,
          '_blank',
        )
      }
    >
      <Iconify icon="fa-solid:file-download" />
    </IconButton>
  )
}
