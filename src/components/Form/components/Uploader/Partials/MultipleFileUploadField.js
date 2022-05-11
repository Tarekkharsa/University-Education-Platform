import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {SingleFileUploadWithProgress} from './SingleFileUploadWithProgress'
import useStyles from '../styles'
import Thumbs from './thumbs/index'
import {ShowSingleFileUploaded} from './ShowSingleFileUploaded'
import {deleteFile} from './Service/Api'
import useSetNotification from './hooks/useSetNotification'
import IMGEditor from './IMGEditor'
import {Grid, Button} from '@mui/material'
import {isEmpty} from './Service/Helpers'
import {FormattedMessage} from 'react-intl'

export function MultipleFileUploadField({
  name,
  key,
  InputChange,
  accept,
  maxFileSize,
  multiple,
  editValue,
  filesLimit,
  isDuplicated,
  error,
  errorText,
  errors,
  setError,
  autoUpload,
}) {
  const {notifications} = useSetNotification()
  const classes = useStyles()
  const [upload, setUpload] = useState(false)
  const [cropper, setCropper] = useState(false)
  const [file, setFile] = useState([])
  const [files, setFiles] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [editValues, setEditValues] = useState(editValue)
  const [formState, setFormState] = useState(editValue)
  const [image, setImage] = useState('')
  const [index, setIndex] = useState('')

  let limit = filesLimit ? filesLimit : multiple ? 10 : 1

  const onDrop = useCallback(
    (accFiles, rejFiles) => {
      console.log('accFiles', accFiles)
      if (checkFileLimit(accFiles)) {
        // notifications(`File Limit ${limit}`)
        setError(name, {type: 'custom', message: `File Limit ${limit}`})

        return
      }
      if (rejFiles.length != 0) {
        rejFiles.map(file => {
          try {
            file.errors.map(msg => {
              // notifications(file.file.name + msg.message)
              setError(name, {
                type: 'custom',
                message: file.file.name + msg.message,
              })
            })
          } catch (ex) {
            // notifications(
            //   file.name +
            //     'Some thing wen wrong. Note that max file size is: ' +
            //     maxFileSize +
            //     ' MB',
            // )
            setError(name, {
              type: 'custom',
              message:
                file.name +
                'Some thing wen wrong. Note that max file size is: ' +
                maxFileSize +
                ' MB',
            })
          }
        })
      }
      accFiles.map(file => (file.preview = URL.createObjectURL(file)))

      const mappedAcc = accFiles.map(file => ({file, errors: []}))
      setFiles(curr => [...curr, ...mappedAcc])
    },
    [files],
  )

  const checkFileLimit = accFiles =>
    files.length > limit - 1 || accFiles.length > limit

  useEffect(() => {
    if (multiple) {
      if (autoUpload) {
        InputChange(name, formState)
      } else {
        InputChange(name, files)
      }
    } else {
      let image = formState.length > 0 ? formState[0] : ''
      if (autoUpload) {
        InputChange(name, image)
      } else {
        InputChange(name, files[0])
      }
    }
  }, [uploadedFiles, editValues, files])

  const onUpload = (file, url) => {
    setFormState(curr => [...curr, url])
    setUploadedFiles(curr =>
      curr.map(fw => {
        if (fw.file === file) {
          return {...fw, url}
        }
        return fw
      }),
    )
  }

  const setUploadFiles = () => {
    if (limit == 1 && formState.length > limit - 1) {
      uploadedFiles.map(file => {
        onDelete(file.file, 'uploaded')
        onDelete(file.url, 'formState')
      })
      setTimeout(() => {
        setUploadedFiles(curr => [...curr, ...files])
      }, 0)
    } else if (limit == 4 && formState.length + files.length > limit) {
      notifications(`Total Files you can be uploaded is ${limit} `)
      return
    } else {
      if (formState.length < uploadedFiles.length) {
        notifications(`Total Files you can be upload is ${limit} `)
        return
      } else {
        setUploadedFiles(curr => [...curr, ...files])
      }
    }
    setUpload(true)
    setFiles([])
  }

  const onDelete = (file, type = 'notUploaded') => {
    if (type == 'uploaded') {
      setUploadedFiles(curr => curr.filter(fw => fw.file !== file))
      uploadedFiles.map(fw => {
        if (fw.file == file) {
          setFormState(curr => curr.filter(url => url !== fw.url))
          deleteFile(
            fw.url?.download_link ? fw.url?.download_link : fw.url,
            notifications,
          )
        }
      })

      // call api
    } else if (type == 'oldUploaded') {
      if (file?.original_name) {
        setEditValues(curr =>
          curr.filter(fw => fw.original_name !== file.original_name),
        )
        setFormState(curr => curr.filter(url => url != file))
        if (!isDuplicated) {
          deleteFile(file?.download_link, notifications)
        }
      } else {
        setEditValues(curr => curr.filter(fw => fw !== file))
        setFormState(curr => curr.filter(url => url !== file))
        if (!isDuplicated) {
          deleteFile(file, notifications)
        }
      }
      // call api
    } else if (type == 'formState') {
      setFormState(curr => curr.filter(url => url !== file))
    } else {
      setFiles(curr => curr.filter(fw => fw.file !== file))
      // call api
    }
  }

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: accept ? accept : ['image/*'],
    maxSize: maxFileSize ? maxFileSize * 1024 * 1024 : 300 * 1024, // in bytes
    multiple: multiple ? multiple : false,
  })

  const editImage = (image, index) => {
    const updatedFiles = [...files]

    // replace original image with new image
    updatedFiles[index].file = dataURLtoFile(image, file.name)
    updatedFiles[index].file.preview = URL.createObjectURL(
      dataURLtoFile(image, file.name),
    )

    // update view
    setFiles(updatedFiles)
    setCropper(false)
  }

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type: mime})
  }

  return (
    <React.Fragment>
      <Grid item>
        <div {...getRootProps({className: classes.dropzone})}>
          <input {...getInputProps()} />
          <p>
            <FormattedMessage id="drag_and_drop_users_file" />
          </p>
        </div>
        {errors && (
          <div className={classes.errorText}>{errors[name]?.message}</div>
        )}
        {error && <div className={classes.errorText}>{errorText}</div>}
        {/*       image preview section        */}
        <Thumbs
          files={files}
          setIndex={setIndex}
          setImage={setImage}
          setFile={setFile}
          setCropper={setCropper}
          onDelete={onDelete}
        />
        {autoUpload && !isEmpty(files) && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setUploadFiles()
              }}
            >
              Upload
            </Button>
          </Grid>
        )}
      </Grid>
      {/*       editValue section        */}
      {editValues?.length != 0 ? (
        editValues.map((value, idx) => (
          <Grid item key={idx}>
            {<ShowSingleFileUploaded onDelete={onDelete} value={value} />}
          </Grid>
        ))
      ) : (
        <></>
      )}
      {/*       upload section        */}
      {upload ? (
        uploadedFiles.map((fileWrapper, idx) => (
          <Grid item key={idx}>
            {
              <SingleFileUploadWithProgress
                onDelete={onDelete}
                onUpload={onUpload}
                file={fileWrapper.file}
                notifications={notifications}
              />
            }
          </Grid>
        ))
      ) : (
        <></>
      )}
      {/*       image cropper section        */}
      <IMGEditor
        open={cropper}
        onClose={setCropper}
        onSave={editImage}
        image={image}
        index={index}
      />
    </React.Fragment>
  )
}
