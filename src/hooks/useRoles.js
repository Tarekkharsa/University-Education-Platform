import {useAuth} from 'context/auth-context'
import React from 'react'

export default function useRoles() {
  const {user} = useAuth()
  const checkIfRolesInUserRoles = roles => {
    if (user.permissions) {
      return roles.some(role => user.permissions.includes(role))
    }
    return false
  }

  return {checkIfRolesInUserRoles}
}
