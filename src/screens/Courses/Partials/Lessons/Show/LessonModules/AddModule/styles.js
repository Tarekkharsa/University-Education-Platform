import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  icon: {
    fontSize: '3rem',
    color: theme.palette.primary.main,
  },
}))

export default useStyles
