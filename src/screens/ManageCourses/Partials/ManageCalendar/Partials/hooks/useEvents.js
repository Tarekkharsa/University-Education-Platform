import {useClient} from 'context/auth-context'
import moment from 'moment'
import {useReducer} from 'react'
import {useMutation, useQuery, useQueryClient} from 'react-query'

const initialState = {
  events: [],
}

function eventsReducer(state, action) {
  switch (action.type) {
    case 'Clear': {
      return {
        events: [],
      }
    }
    case 'Save': {
      const events = action.payload
      console.log('save', events)
      return {
        events: [...events],
      }
    }
    default:
      return state
  }
}

const useEvents = ({id, handleClose, enabled}) => {
  const [state, dispatch] = useReducer(eventsReducer, initialState)
  const {events} = state
  const client = useClient()
  const queryClient = useQueryClient()
  const {isLoading, error, isFetching, data} = useQuery({
    queryKey: 'calendar',
    queryFn: () =>
      client(
        `calender/getUpcomingCalenderEventsByCourseId?course_id=${id}`,
      ).then(data => {
        let events = data.data.map(event => {
          return {
            ...event,
            id: event.id,
            title: event.name,
            start: moment(event.timestart * 1000).format('YYYY-MM-DD'),
            end: moment(event.timeduration * 1000).format('YYYY-MM-DD'),
          }
        })
        dispatch({type: 'Save', payload: events})
        return events
      }),
    enabled: enabled,
  })

  function getEventById(id) {
    return events.find(event => event.id == id)
  }

  const {mutate, isLoading: isDeleteing} = useMutation(
    data =>
      client(`calender/deleteEvent`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        handleClose && handleClose()
        queryClient.invalidateQueries('calendar')
      },
    },
  )

  return {
    isLoading,
    error,
    isFetching,
    data,
    getEventById,
    mutate,
    isDeleteing,
  }
}

export default useEvents
