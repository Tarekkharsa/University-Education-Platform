import {IconButton} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Iconify from 'components/Iconify'
import * as React from 'react'
import StudentGradeForm from './StudentGradeForm'

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

export default function SetGrade({user}) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon="carbon:document-add" />
      </IconButton>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <StudentGradeForm user={user} handleClose={handleClose} />
          </Box>
        </Modal>
      )}
    </>
  )
}
