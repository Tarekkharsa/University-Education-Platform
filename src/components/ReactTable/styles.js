import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme => ({
  root: {},
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '3px 0 ',
  },
  formControl: {
    marginLeft: theme.direction === 'ltr' ? '10px' : 'unset',
    marginRight: theme.direction === 'rtl' ? '10px' : 'unset',
  },
}))

export default useStyles
