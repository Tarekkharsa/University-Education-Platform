import PropTypes from 'prop-types'
// material
import {Grid} from '@mui/material'
import LessonCard from './LessonCard'

// ----------------------------------------------------------------------

LessonList.propTypes = {
  lessons: PropTypes.array.isRequired,
}

export default function LessonList({lessons, value, ...other}) {
  return (
    <Grid container spacing={3} {...other}>
      {lessons
        .filter(item => {
          if (!value) return true
          if (item.name.includes(value) || item.summary.includes(value)) {
            return true
          }
        })
        .map(lesson => (
          <Grid key={lesson.id} item xs={12} sm={6} md={3}>
            <LessonCard lesson={lesson} />
          </Grid>
        ))}
    </Grid>
  )
}
