import PropTypes from 'prop-types'
// material
import {Grid} from '@mui/material'
import CourseCard from './CourseCard'

// ----------------------------------------------------------------------

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
}

export default function CourseList({courses, value, ...other}) {
  return (
    <Grid container spacing={3} {...other}>
      {courses
        .filter(item => {
          if (!value) return true
          if (item.fullname.includes(value) || item.summary.includes(value)) {
            return true
          }
        })
        .map(course => (
          <Grid key={course.id} item xs={12} sm={6} md={3}>
            <CourseCard course={course} />
          </Grid>
        ))}
    </Grid>
  )
}
