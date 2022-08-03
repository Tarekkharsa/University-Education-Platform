import PropTypes from 'prop-types'
import {Link as RouterLink} from 'react-router-dom'
// material
import {Box, Card, Link, Typography, Stack, IconButton} from '@mui/material'
import {styled} from '@mui/material/styles'
// utils
import {fCurrency} from '../../../utils/formatNumber'
//
import Label from '../../../components/Label'
import ColorPreview from '../../../components/ColorPreview'
import {mockImgCourse} from 'utils/mockImages'
import Iconify from 'components/Iconify'
import {useMutation, useQueryClient} from 'react-query'
import {useClient} from 'context/auth-context'

// ----------------------------------------------------------------------

const CourseImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
})

// ----------------------------------------------------------------------

FavCourseCard.propTypes = {
  product: PropTypes.object,
}

export default function FavCourseCard({course}) {
  const {fullname, cover, active, category, id} = course
  const client = useClient()
  const queryClient = useQueryClient()
  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client('course/feature/deleteCourseFromFav', {
        method: 'POST',
        data: {course_id: id},
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('FavCourses')
      },
    },
  )
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
        <IconButton
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
          color={'error'}
          onClick={mutate}
        >
          <Iconify icon="carbon:favorite-filled" />
        </IconButton>
        <CourseImgStyle
          alt={fullname}
          src={`/images/courses/ahmad_course.png`}
        />
      </Box>

      <Stack spacing={2} sx={{p: 3}}>
        <Link color="inherit">
          <Typography variant="subtitle2" noWrap>
            {fullname}
          </Typography>
        </Link>
      </Stack>
    </Card>
  )
}
