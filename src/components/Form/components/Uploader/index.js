import {Card, CardContent} from '@mui/material'
import React from 'react'
import {MultipleFileUploadField} from './Partials/MultipleFileUploadField'
import {parseEditValue} from './Partials/Service/Helpers'
import useStyles from './styles'
function Uploader(props) {
  // props { accept, key, id, maxFileSize, multiple, InputChange, width, name, label, placeholder, title, editValue, filesLimit, error, errorText, isDuplicated }
  const classes = useStyles()
  const {width, label, id, editValue, errors, setError} = props
  let newProps = {
    ...props,
    editValue: parseEditValue(editValue),
  }

  return (
    <Card key={id} style={{width: width, margin: '10px', marginTop: '20px'}}>
      <CardContent>
        {label && <div className={classes.label}>{label}</div>}
        <MultipleFileUploadField {...newProps} />
      </CardContent>
    </Card>
  )
}

export default Uploader
