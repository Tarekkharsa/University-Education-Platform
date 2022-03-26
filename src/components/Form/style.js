import {makeStyles} from '@mui/material'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '10px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '1em',
    gap: '4%',

    '& .MuiFormLabel-root.Mui-focused': {
      color: '#067e7a',
    },
    '& label + .MuiInput-formControl': {
      marginTop: '25px',
    },
    '& .MuiIconButton-root': {
      padding: 0,
    },
    '& .MuiButton-contained:hover': {
      color: '#067e7a',
    },
    '& .MuiInputLabel-formControl ': {
      color: '#b2b1be',
      opacity: '0.82',
      fontSize: '0.9rem',
      fontStyle: 'normal',
      fontFamily: 'Montserrat',
      fontWeight: '500',
      fontStretch: 'normal',
      letterSpacing: 'normal',
      textTransform: 'uppercase',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid #067e7a',
    },
  },
}))

export default useStyles
