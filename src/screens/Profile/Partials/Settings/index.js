import {Switch, ToggleButton} from '@mui/material'
import useDarkMode from 'hooks/useDarkMode'
import React from 'react'
import {FormattedMessage} from 'react-intl'

export default function Settings() {
  const {theme, toggleTheme} = useDarkMode()
  return (
    <>
      <FormattedMessage id="dark_theme" />
      <Switch checked={theme === 'dark'} onChange={toggleTheme} />
    </>
  )
}
