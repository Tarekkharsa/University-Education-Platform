import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import * as React from 'react'
import CalendarForm from '../CalendarForm'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  //   boxShadow: 24,
  p: 4,
}

export default function AddLessonModal({
  open,
  handleClose,
  handleOpen,
  start,
  end,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CalendarForm handleClose={handleClose} start={start} end={end} />
      </Box>
    </Modal>
  )
}
