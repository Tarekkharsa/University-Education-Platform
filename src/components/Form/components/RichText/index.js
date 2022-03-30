import React, {useRef} from 'react'
import {Editor} from '@tinymce/tinymce-react'

// import ApiConfigs from '~/Configs/Api'
// import {StorageKeys} from '~/Configs/Storage'
// import {
//   getStorage,
//   handleChange as handleUploadChange,
// } from '~/Services/Helpers'
import useStyles from './styles'

export default function RichText({
  editDisabled,
  errorText,
  placeholder,
  InputChange,
  width,
  height,
  name,
  label,
  editValue,
  customOptions,
}) {
  const editorRef = useRef(null)
  const classes = useStyles()

  // let token = getStorage(StorageKeys.token);
  // const url = `${ApiConfigs.apiUrl}admin/media-upload`;

  const log = () => {
    if (editorRef.current) {
      InputChange(name, editorRef.current.getContent())
    }
  }

  // function image_upload_handler(blobInfo, success, failure, progress) {
  //   let token = getStorage(StorageKeys.token);
  //   const url = `${ApiConfigs.apiUrl}admin/media-upload`;

  //   var xhr, formData;

  //   xhr = new XMLHttpRequest();
  //   xhr.withCredentials = false;
  //   xhr.open("POST", url);
  //   xhr.setRequestHeader("Authorization", token);

  //   xhr.upload.onprogress = function (e) {
  //     progress((e.loaded / e.total) * 100);
  //   };

  //   xhr.onload = function () {
  //     var json;

  //     if (xhr.status === 403) {
  //       failure("HTTP Error: " + xhr.status, { remove: true });
  //       return;
  //     }

  //     if (xhr.status < 200 || xhr.status >= 300) {
  //       failure("HTTP Error: " + xhr.status);
  //       return;
  //     }
  //     console.log("xhr.responseText", xhr.responseText);
  //     json = JSON.parse(xhr.responseText);

  //     if (!json || typeof json.content != "string") {
  //       failure("Invalid JSON: " + xhr.responseText);
  //       return;
  //     }

  //     success(`${json.images_prefix}${json.content}`);
  //   };

  //   xhr.onerror = function () {
  //     failure(
  //       "Image upload failed due to a XHR Transport error. Code: " + xhr.status
  //     );
  //   };

  //   formData = new FormData();
  //   formData.append("file", blobInfo.blob(), blobInfo.filename());

  //   xhr.send(formData);
  // }

  return (
    <div className={classes.rootEditor}>
      <Editor
        apiKey="crjlhre6yw15pg2e6vme2jti2lb3pv8uqts06uz0s39mgtdx"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={editValue ? editValue : '<p></p>'}
        init={{
          height: 400,
          skin: 'oxide-dark',
          content_css: 'dark',
          // automatic_uploads: true,
          // images_upload_handler: image_upload_handler,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        onChange={log}
      />
    </div>
  )
}
