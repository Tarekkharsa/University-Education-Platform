import {CircularProgress, IconButton, Switch} from '@mui/material'
import ConfirmationModal from 'components/ConfirmationModal'
import Iconify from 'components/Iconify'
import {useAuth, useClient} from 'context/auth-context'
import React, {useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'

function JoinAction({value, row}) {
  const {user} = useAuth()

  const bulkAction = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/bigBlueButton/joinAsStudent?password=ap&meeting_id=${row.original.meetingID}&fullname=${user.username}`,
    )
  }
  return (
    <>
      <IconButton onClick={bulkAction}>
        <Iconify icon="akar-icons:airplay-video" />
      </IconButton>
    </>
  )
}

export default JoinAction
