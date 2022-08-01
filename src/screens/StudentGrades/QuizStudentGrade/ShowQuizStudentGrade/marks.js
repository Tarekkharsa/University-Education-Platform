import {useAuth, useClient} from 'context/auth-context'
import React from 'react'
import {FaSpinner} from 'react-icons/fa'
import {useQuery} from 'react-query'

export default function Marks({quiz_id}) {
  const {user} = useAuth()
  const client = useClient()
  const {isLoading, error, data, refetch} = useQuery({
    queryKey: `Grades${quiz_id}`,
    queryFn: () =>
      client(
        `module/quiz/getQuizStudentGrade?quiz_id=${quiz_id}&user_id=${user?.id}`,
      ).then(data => data?.data),
  })

  if (isLoading) {
    return <FaSpinner />
  }
  return data && data.length > 0 ? <div>{data[0]?.grade * 10}</div> : 'No grade'
}
