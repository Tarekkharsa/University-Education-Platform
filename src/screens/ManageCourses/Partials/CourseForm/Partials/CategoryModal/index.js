import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import * as React from 'react'
import TreeTable from '../Table'

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
  maxHeight: '80%',
  overflow: 'scroll',
}

export default function CategoryModal({open, handleClose, setValue}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TreeTable handleClose={handleClose} setValue={setValue} />
      </Box>
    </Modal>
  )
}
