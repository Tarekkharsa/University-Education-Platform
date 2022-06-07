// material

import arLocale from '@fullcalendar/core/locales/ar'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import {Container, Paper, Typography} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import {useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useParams} from 'react-router-dom'
import useEvents from './Partials/hooks/useEvents'
import ShowEventModal from './Partials/ShowEvent'

export default function ManageCalendar() {
  const theme = useTheme()
  const {id} = useParams()

  const [end, setEnd] = useState('')
  const [start, setStart] = useState('')

  const [openShowEventModal, setOpenShowEventModal] = useState(false)
  const [eventId, setEventId] = useState('')
  const handleShowEventModalClose = () => {
    setOpenShowEventModal(false)
    setEventId('')
  }
  const handleShowEventModalOpen = () => {
    setOpenShowEventModal(true)
  }

  const [open, setOpen] = useState(false)
  const [weekendsVisible, setWeekendsVisible] = useState([])
  const [currentEvents, setCurrentEvents] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setStart('')
    setEnd('')
  }

  const {isLoading, error, isFetching, data, getEventById} = useEvents({id})

  const handleEvents = events => {
    setCurrentEvents(events)
  }

  function renderEventContent(eventInfo) {
    console.log('eventInfo', eventInfo)
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  const handleDateSelect = selectInfo => {
    setStart(new Date(selectInfo.start))
    setEnd(new Date(selectInfo.end))
    handleOpen()
  }

  const handleEventClick = clickInfo => {
    //show
    setEventId(clickInfo.event.id)
    handleShowEventModalOpen()
    //remove
    // clickInfo.event.remove()
  }

  if (isFetching) {
    return <FullPageSpinner />
  }
  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Calender">
      <Container>
        <Typography variant="h4" sx={{mb: 5}}>
          <FormattedMessage id="calendar" />
        </Typography>

        <Paper variant="outlined" sx={{py: 2.5, textAlign: 'center'}}>
          <Container>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              initialView="dayGridMonth"
              locale={theme.direction === 'rtl' && arLocale}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={weekendsVisible}
              initialEvents={data} // alternatively, use the `events` setting to fetch from a feed
              select={handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
              eventsSet={handleEvents} // called after events are initialized/added/changed/removed
              // you can update a remote database when these fire:
              eventAdd={() => {
                console.log('eventAdd')
              }}
              eventChange={evnet => {
                console.log('eventChange', evnet)
              }}
              eventRemove={({event}) => {
                // mutate({
                //   event_ids: [event.id],
                // })
              }}
            />
          </Container>
        </Paper>
        {openShowEventModal && (
          <ShowEventModal
            open={openShowEventModal}
            handleOpen={handleShowEventModalOpen}
            handleClose={handleShowEventModalClose}
            id={eventId}
            event={getEventById(eventId)}
          />
        )}
      </Container>
    </Page>
  )
}
