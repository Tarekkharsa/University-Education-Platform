import {useClient} from 'context/auth-context'
import React from 'react'

export default function useFiles() {
  const client = useClient()
  const getImg = name => {
    return client(`images/${name}`).then(data => data.data)
  }

  return {getImg}
}
