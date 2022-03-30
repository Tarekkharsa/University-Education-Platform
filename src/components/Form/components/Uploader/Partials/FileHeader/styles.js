import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme => ({
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: 16,
    padding: 20,
  },
  thumb: {
    position: 'relative',
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 70,
    height: 70,
    padding: 4,
    boxSizing: 'border-box',
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
  fileNamewithIcon: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    fontSize: '0.8rem',
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },
  DoneAllIcon: {
    color: '#4caf50',
  },
  IconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export default useStyles
