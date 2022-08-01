import {useAuth, useClient} from 'context/auth-context'
import React from 'react'
import {FaSpinner} from 'react-icons/fa'
import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'

export default function Marks({row}) {
  const {user} = useAuth()
  const {id} = useParams()
  const client = useClient()
  const {isLoading, error, data, refetch} = useQuery({
    queryKey: `Grades${row?.original?.cmid}`,
    queryFn: () =>
      client(
        `module/assignment/getGradesAssignmentForStudent?course_id=${id}&user_id=${user?.id}`,
      ).then(data => {
        return data?.data?.filter(item => item?.cmid === row?.original?.cmid)[0]
          ?.graderaw
      }),
  })

  if (isLoading) {
    return <FaSpinner />
  }
  return <div>{data}</div>
}
