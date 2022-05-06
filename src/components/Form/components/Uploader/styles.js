import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: 'none',
  },
  label: {
    margin: '0 0 12px 0',
    fontSize: '1rem',
    fontWeight: '500',
  },
  errorText: {
    color: '#f44336',
    marginLeft: '14px',
    marginRight: '14px',
    margin: '0',
    fontSize: '0.75rem',
    marginTop: '3px',
    textAlign: theme.direction === 'ltr' ? 'left' : 'right',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: '400',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
  },
}))

export default useStyles
