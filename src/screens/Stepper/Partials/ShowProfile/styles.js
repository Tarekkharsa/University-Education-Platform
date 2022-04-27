import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme => ({
  li: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descLi: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  inline: {
    display: 'inline',
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}))

export default useStyles
