import React, {useEffect, useState} from 'react'
import {FileHeader} from './FileHeader'
import {uploadFile, uploadImage} from './Service/Api'
import Progress from './Progress'
import {Grid} from '@mui/material'

export function SingleFileUploadWithProgress({
  file,
  onDelete,
  onUpload,
  notifications,
}) {
  const [progress, setProgress] = useState(0)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    async function upload() {
      let url
      if (file.type.includes('image/')) {
        url = await uploadImage(file, setProgress, notifications, setError)
      } else {
        url = await uploadFile(file, setProgress, notifications, setError)
      }
      onUpload(file, url)
      setSuccess(true)
    }
    upload()
  }, [])

  const onReUoload = () => {
    setError(false)
    setProgress(0)
    async function upload() {
      let url
      if (file.type.includes('image/')) {
        url = await uploadImage(file, setProgress, notifications, setError)
      } else {
        url = await uploadFile(file, setProgress, notifications, setError)
      }
      onUpload(file, url)
      setSuccess(true)
    }
    upload()
  }

  return (
    <Grid item>
      <FileHeader
        file={file}
        onDelete={onDelete}
        error={error}
        success={success}
        onReUoload={onReUoload}
      />
      <Progress progress={progress} error={error} success={success} />
    </Grid>
  )
}
