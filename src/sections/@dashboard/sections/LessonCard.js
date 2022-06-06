import PropTypes from 'prop-types'
import {Link as RouterLink} from 'react-router-dom'
// material
import {Box, Card, Link, Typography, Stack} from '@mui/material'
import {styled} from '@mui/material/styles'
// utils
import {fCurrency} from '../../../utils/formatNumber'
//
import Label from '../../../components/Label'
import ColorPreview from '../../../components/ColorPreview'
import {mockImgCourse} from 'utils/mockImages'

// ----------------------------------------------------------------------

const LessonImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
})

// ----------------------------------------------------------------------

LessonCard.propTypes = {
  lesson: PropTypes.object,
}

export default function LessonCard({lesson}) {
  const {name, cover, id} = lesson

  return (
    <Card>
      <Box sx={{pt: '100%', position: 'relative'}}>
        <LessonImgStyle alt={name} src={mockImgCourse()} />
      </Box>

      <Stack spacing={2} sx={{p: 3}}>
        <Link
          to={`lessons/${id}/show`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
      </Stack>
    </Card>
  )
}
