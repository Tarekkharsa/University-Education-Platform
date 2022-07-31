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

const CourseImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
})

// ----------------------------------------------------------------------

CourseCard.propTypes = {
  product: PropTypes.object,
}

export default function CourseCard({course}) {
  const {fullname, cover, active, category, id} = course

  return (
    <Card>
      <Box sx={{pt: '100%', position: 'relative'}}>
        {active && (
          <Label
            variant="filled"
            color={active ? 'info' : 'error'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {active ? 'Active' : 'Inactive'}
          </Label>
        )}
        <CourseImgStyle
          alt={fullname}
          src={`/images/courses/ahmad_course.png`}
        />
      </Box>

      <Stack spacing={2} sx={{p: 3}}>
        <Link
          to={`${id}/show`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            {fullname}
          </Typography>
        </Link>
      </Stack>
    </Card>
  )
}
