import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme => ({
  rootEditor: {
    width: '100%',
  },
  root: {
    width: '100%',
    display: 'inline',
  },
  label: {
    padding: '10px',
    color: theme.palette.type === 'dark' ? '#c7c7c7' : '',
  },
  editor: {
    width: '100%',

    margin: '0px 7px',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '5px',
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '&:focus': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '& .public-DraftStyleDefault-ltr': {
      padding: '0 10px',
    },
    '& .rdw-image-imagewrapper img': {
      maxWidth: '100%',
    },
    '& .rdw-editor-toolbar ': {
      border: '1px solid rgba(0, 0, 0, 0.20)',
      background: theme.palette.type === 'dark' ? '#424242' : '',
    },
    '& .public-DraftEditorPlaceholder-inner': {
      padding: '0 10px',
    },
    '& .public-DraftStyleDefault-block': {
      margin: '0.5em 0',
    },
    '& .rdw-option-wrapper ': {
      borderRadius: '5px',
      background: theme.palette.type === 'dark' ? '#424242' : '',
    },
    '& .rdw-option-wrapper:hover': {
      boxShadow:
        '0 2px 6px rgb(0 0 0 / 50%), inset 0 1px rgb(255 255 255 / 30%), inset 0 10px rgb(255 255 255 / 20%), inset 0 10px 20px rgb(255 255 255 / 25%), inset 0 -15px 30px #bfbdbd',
      // background: "rgba(0, 0, 0, 0.1)",
    },
    '& .rdw-dropdown-wrapper:hover': {
      boxShadow:
        '0 2px 6px rgb(0 0 0 / 50%), inset 0 1px rgb(255 255 255 / 30%), inset 0 10px rgb(255 255 255 / 20%), inset 0 10px 20px rgb(255 255 255 / 25%), inset 0 -15px 30px #bfbdbd',
      // background: "rgba(0, 0, 0, 0.1)",
    },
    '& .rdw-dropdown-wrapper ': {
      borderRadius: '5px',
      background: theme.palette.type === 'dark' ? '#424242' : '',
    },
    '& .notranslate > div': {
      // minHeight: "200px",
    },
    '& h1,h2,h3,h4,h5,h6': {
      marginBottom: '0.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      margin: '10px 0px',
      color: 'black',
    },
    '& h1': {
      fontSize: '2.25rem',
    },
    '& h2': {
      fontSize: '1.8rem',
    },
    '& h3': {
      fontSize: '1.17em',
    },
    '& h4': {
      fontSize: '1.35rem',
    },
    '& h5': {
      fontSize: '1.125rem',
    },
    '& h6': {
      fontSize: '0.9rem',
    },
    '& p': {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.5,
    },
    '& ul': {
      lineHeight: 1.6,
      fontSize: '.9rem',
    },
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
