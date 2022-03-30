import axios from 'axios'
import {create} from 'apisauce'
// import ApiConfigs from "~/Configs/Api";
// import { StorageKeys } from "~/Configs/Storage";
// import { getStorage } from "~/Services/Helpers";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_UPLOAD_API_URL,
  // timeout: ApiConfigs.timeout,
})

const Api = create({axiosInstance: axiosInstance})
const CancelToken = axios.CancelToken
const requestsSourceCancellation = CancelToken.source()

export const deleteFile = (id, notifications) => {
  const headers = {
    // Accept: `application/json;v=${ApiConfigs.version}`,
    'Content-Type': 'application/json',
    // "Authorization": getStorage(StorageKeys.token)
  }
  Api.delete(
    `admin/media-delete?id=${id}`,
    {},
    {cancelToken: requestsSourceCancellation.token, headers},
  )
    .then(function (response) {
      if (response.ok) {
        notifications(response.data.content, 'success')
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function uploadFile(file, onProgress, notifications, setError) {
  // const url = `${ApiConfigs.apiUrl}${ApiConfigs.multipleMediaFileUpload}`;
  const url = process.env.REACT_APP_UPLOAD_API_URL
  const key = 'docs_upload_example_us_preset'

  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    // xhr.setRequestHeader('Authorization', getStorage(StorageKeys.token));
    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText)
      if (resp.result == 'success') {
        res(resp.content)
      } else {
        setError(true)
        notifications(resp.error_des)
      }
    }
    xhr.onerror = evt => {
      rej(evt)
      if (evt?.type == 'error') {
        notifications('connection error')
      }
    }
    xhr.onreadystatechange = function () {
      if (this.status == 500) {
        setError(true)
        notifications('Server Error')
      }
    }

    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100
        onProgress(Math.round(percentage))
      }
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', key)

    xhr.send(formData)
  })
}
export function uploadImage(file, onProgress, notifications, setError) {
  // const url = `${ApiConfigs.apiUrl}${ApiConfigs.multipleMediaImageUpload}`;
  const url = process.env.REACT_APP_UPLOAD_API_URL
  const key = 'docs_upload_example_us_preset'

  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    // xhr.setRequestHeader('Authorization', getStorage(StorageKeys.token));
    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText)
      if (resp.result == 'success') {
        res(resp.content)
      } else {
        setError(true)
        notifications(resp.error_des)
      }
    }
    xhr.onerror = evt => {
      rej(evt)
      if (evt?.type == 'error') {
        notifications('connection error')
      }
    }
    xhr.onreadystatechange = function () {
      if (this.status == 500) {
        setError(true)
        notifications('Server Error')
      }
    }

    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100
        onProgress(Math.round(percentage))
      }
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', key)

    xhr.send(formData)
  })
}
