import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import * as React from 'react'
import UrlModuleForm from '../UrlModuleForm'

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

export default function UpdateUrlModule({
  open,
  handleClose,
  handleOpen,
  section,
  module_id,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <UrlModuleForm
          section={section}
          module_id={module_id}
          handleClose={handleClose}
        />
      </Box>
    </Modal>
  )
}
