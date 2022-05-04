import {useRef, useState} from 'react'
// material
import {alpha} from '@mui/material/styles'
import {
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material'
// components
import MenuPopover from '../../components/MenuPopover'
import useLang from 'hooks/useLang'

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg',
  },
  {
    value: 'ar',
    label: 'Arabic',
    icon: '/static/icons/syria.svg',
  },
]

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const {lang, saveLang} = useLang()
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleChange = lang => {
    saveLang(lang)
    setOpen(false)
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: theme =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity,
              ),
          }),
        }}
      >
        <img
          style={{width: lang === 'ar' ? '80%' : ''}}
          src={lang === 'en' ? LANGS[0].icon : LANGS[1].icon}
          alt={lang === 'en' ? LANGS[0].label : LANGS[1].label}
        />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        <Box sx={{py: 1}}>
          {LANGS.map(option => (
            <MenuItem
              key={option.value}
              selected={option.value === lang}
              onClick={() => handleChange(option.value)}
              sx={{py: 1, px: 2.5}}
            >
              <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{variant: 'body2'}}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  )
}
