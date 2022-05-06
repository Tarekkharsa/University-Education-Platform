import {Switch} from '@mui/material'
import ConfirmationModal from 'components/ConfirmationModal'
import {useClient} from 'context/auth-context'
import React, {useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQueryClient} from 'react-query'

function SwitchAction({value, row}) {
  const [checked, setChecked] = useState(value === 2 ? true : false)
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const client = useClient()
  const queryClient = useQueryClient()

  const handleConfirmation = () => {
    setOpenConfirmation(!openConfirmation)
  }

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client('activeUsers', {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('users')
        setChecked(!checked)
        handleConfirmation()
      },
    },
  )
  const bulkAction = () => {
    mutate({
      user_ids: [row.values.id],
    })
  }

  return (
    <>
      <Switch checked={checked} onChange={handleConfirmation} />
      {openConfirmation && (
        <ConfirmationModal
          isLoading={isLoading}
          onSave={bulkAction}
          closeConfirmation={handleConfirmation}
          message={<FormattedMessage id="active_user" />}
          confirmation={openConfirmation}
        />
      )}
    </>
  )
}

export default SwitchAction
