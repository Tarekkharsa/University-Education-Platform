import useStyles from './styles'
import React, {useState, useRef, useMemo} from 'react'
import JoditEditor from 'jodit-react'
const RichText = ({
  editDisabled,
  errorText,
  InputChange,
  name,
  label,
  editValue,
}) => {
  const classes = useStyles()
  const editor = useRef(null)
  const [content, setContent] = useState(editValue)

  const config = useMemo(
    () => ({
      readonly: editDisabled,
      showPlaceholder: false,
      // placeholder: "",
      uploader: {
        insertImageAsBase64URI: true, // set false if you want to load images via ajax
        // imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
        // url: url,  // url to upload image
        // i18n: 'en',
        // withCredentials: false,
        // pathVariableName: 'path',
        // format: 'json',
        // method: 'POST',
        // headers: {
        //   Authorization: token, // set token in header
        // },
        // filesVariableName(i) {
        //   return `file`   // set name of file variable
        // },
        // isSuccess: function (resp) {
        //   return resp
        // },
        // process: function (resp) {
        //   return {
        //     files: resp.content,
        //     path: `${resp.images_prefix}${resp.content}`,
        //     baseurl: resp.images_prefix,
        //     error: resp.error_des,
        //     // message: resp.data.message
        //   }
        // },
        // defaultHandlerSuccess: function (data) {
        //   this.s.insertImage(data.path) // insert image to editor
        // },
      },
      toolbarButtonSize: 'large',
      removeButtons: [
        'video',
        'table',
        'file',
        'source',
        'about',
        'fullsize',
        'hr',
        'link',
        // "selectall",
        'spellcheck',
        'copyformat',
        'spellcheck',
        'brush',
        'font',
        'classSpan',
      ],
      showPlaceholder: false,
      statusbar: false,
      // toolbarInlineForSelection: true,
      // iframe: true,
      style: {
        width: '100%',
      },
    }),
    [editDisabled, editValue],
  )

  const onEditorStateChange = value => {
    InputChange(name, value)
  }
  return (
    <div>
      <div
        style={{
          borderColor: errorText ? 'red' : '',
        }}
      >
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onChange={newContent => onEditorStateChange(newContent)}
        />
      </div>
      <div className={classes.errorText}>{!!errorText ? errorText : ''}</div>
    </div>
  )
}

export default RichText
