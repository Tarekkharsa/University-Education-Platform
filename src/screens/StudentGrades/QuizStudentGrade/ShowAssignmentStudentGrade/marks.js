import {useAuth, useClient} from 'context/auth-context'
import React from 'react'
import {FaSpinner} from 'react-icons/fa'
import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'

export default function Marks({quiz_id}) {
  console.log('quiz_id', quiz_id)
  const {user} = useAuth()
  const {course_id} = useParams()
  const client = useClient()
  const {isLoading, error, data, refetch} = useQuery({
    queryKey: `Grades${quiz_id}`,
    queryFn: () =>
      client(
        `module/assignment/getGradesAssignmentForStudent?course_id=3&user_id=${user?.id}`,
      ).then(data => data.data),
  })

  if (isLoading) {
    return <FaSpinner />
  }
  return <div>sss</div>
}
