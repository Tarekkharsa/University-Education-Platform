import sha1 from 'js-sha1'
import queryString from 'query-string'

export default () => {
  let url = 'https://test-install.blindsidenetworks.com/bigbluebutton/api/'

  let meetingID = 'arandom-403802'
  let attendeePW = 'ap'
  let moderatorPW = 'mp'
  let name = 'random-403802'
  let secret = '8cd8ef52e8e101574e400365b55e11a6'

  // getMeetings

  let getMeetingsChecksum = sha1('getMeetings' + secret)
  let finalgetMeetingsUrl = `${url}getMeetings?checksum=${getMeetingsChecksum}`

  // create meeting
  let createQuery = queryString.stringify(
    {name, meetingID, attendeePW, moderatorPW},
    {sort: false},
  )
  let checksum = sha1('create' + createQuery + secret)
  let finalCreateUrl = `${url}create?${createQuery}&checksum=${checksum}`
  // join meeting
  let joinQuery = queryString.stringify(
    {fullName: 'User 6343233', meetingID, password: 'mp', redirect: true},
    {sort: false},
  )
  let joinChecksum = sha1('join' + joinQuery + secret)

  let finalJoinUrl = `${url}join?${joinQuery}&checksum=${joinChecksum}`

  const create = () => {
    window.open(finalCreateUrl, '_blank')
  }
  const join = () => {
    window.open(finalJoinUrl, '_blank')
  }

  const getMeetings = () => {
    window.open(finalgetMeetingsUrl, '_blank')
  }

  return {create, join, getMeetings}
}

//  const {create, join} = useBBB()
