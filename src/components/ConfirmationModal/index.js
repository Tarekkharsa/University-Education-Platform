import {LoadingButton} from '@mui/lab'
import {Modal, Stack} from '@mui/material'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import useStyles from './styles'

const ConfirmationModal = ({
  confirmation,
  closeConfirmation,
  onSave,
  message,
  isLoading,
}) => {
  const classes = useStyles()

  return (
    <>
      <Modal open={confirmation} className={classes.modal_wrapper}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <FormattedMessage id="are_you_sure_you_want_to" /> {message}
          </div>
          <Stack
            className={classes.buttons_wrapper}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{my: 2}}
          >
            <LoadingButton
              onClick={closeConfirmation}
              size="large"
              type="submit"
              variant="contained"
              sx={{mr: 2}}
            >
              <FormattedMessage id="cancel" />
            </LoadingButton>
            <LoadingButton
              size="large"
              variant="contained"
              onClick={onSave}
              loading={isLoading}
            >
              <FormattedMessage id="confirm" />
            </LoadingButton>
          </Stack>
        </div>
      </Modal>
    </>
  )
}
export default ConfirmationModal
