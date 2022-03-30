import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme => ({
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    padding: 20,
  },
  thumb: {
    position: 'relative',
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
    '& .MuiIconButton-root:hover': {
      backgroundColor: 'rgba(0, 0, 0, .5)',
    },
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },
  fileName: {
    margin: 'auto',
    fontSize: '0.5rem',
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },
  thumbDeleteButton: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    background: theme.palette.primary.main,
    color: '#fff',
    border: 0,
    borderRadius: '.325em',
    cursor: 'pointer',
    width: '1.6rem',
    height: '1.6rem',
  },
  thumbEditButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    background: theme.palette.primary.main,
    color: '#fff',
    border: 0,
    borderRadius: '.325em',
    cursor: 'pointer',
    width: '1.6rem',
    height: '1.6rem',
  },
  icons: {
    width: '0.5 rem',
    height: '0.5 rem',
  },
}))

export default useStyles
