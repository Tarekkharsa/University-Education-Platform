// material
import {Container, Stack, Typography} from '@mui/material'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import {useAuth, useClient} from 'context/auth-context'
import {useMemo, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import CourseList from 'sections/@dashboard/products/CourseList'
// ----------------------------------------------------------------------
import {ProductSort} from '../../sections/@dashboard/products'
//
import PRODUCTS from '../../_mocks_/products'
import {Filters} from './Filters'
const MocksCourses = [
  {
    id: 9,
    name: 'Course from emad the best223 Course from emad the best223',
    grademax: 100,
    gradepassed: 60,
    gradetheoreticalmax: 70,
    gradepracticalmax: 30,
    level: 1,
    active: true,
    summary: 'it is new course',
    startdate: 1550000000,
    enddate: 1750000000,
    specificationid: 1,
    visible: 1,
    manager: {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      firstname: 'admin',
      lastname: 'admin',
      roles: [
        {
          id: 1,
          name: 'ROLE_ADMIN',
        },
        {
          id: 2,
          name: 'ROLE_MANAGER',
        },
      ],
      image: '20220513153243.jpg',
      status: 2,
      fathername: 'father',
      mothername: 'mother',
      nationalidnumber: '01000124235',
      phonenumber: '091412432',
      nationalidimage: '20220513153243.jpg',
      certificateimage: '20220502130934.jpg',
    },
    category: {
      id: 13,
      parent: 9,
      name: 'from us new 2',
      description: 'description new',
    },
  },
  {
    id: 10,
    name: 'Course from emad the best2231',
    grademax: 100,
    gradepassed: 60,
    gradetheoreticalmax: 70,
    gradepracticalmax: 30,
    level: 1,
    active: true,
    summary: 'it is new course',
    startdate: 1550000000,
    enddate: 1750000000,
    specificationid: 1,
    visible: 1,
    manager: {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      firstname: 'admin',
      lastname: 'admin',
      roles: [
        {
          id: 1,
          name: 'ROLE_ADMIN',
        },
        {
          id: 2,
          name: 'ROLE_MANAGER',
        },
      ],
      image: '20220513153243.jpg',
      status: 2,
      fathername: 'father',
      mothername: 'mother',
      nationalidnumber: '01000124235',
      phonenumber: '091412432',
      nationalidimage: '20220513153243.jpg',
      certificateimage: '20220502130934.jpg',
    },
    category: {
      id: 9,
      parent: 0,
      name: 'from us new 2',
      description: 'description new',
    },
  },
  {
    id: 11,
    name: 'Course from emad the best223',
    grademax: 100,
    gradepassed: 60,
    gradetheoreticalmax: 70,
    gradepracticalmax: 30,
    level: 1,
    active: true,
    summary: 'it is new course',
    startdate: 1550000000,
    enddate: 1750000000,
    specificationid: 1,
    visible: 1,
    manager: {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      firstname: 'admin',
      lastname: 'admin',
      roles: [
        {
          id: 1,
          name: 'ROLE_ADMIN',
        },
        {
          id: 2,
          name: 'ROLE_MANAGER',
        },
      ],
      image: '20220513153243.jpg',
      status: 2,
      fathername: 'father',
      mothername: 'mother',
      nationalidnumber: '01000124235',
      phonenumber: '091412432',
      nationalidimage: '20220513153243.jpg',
      certificateimage: '20220502130934.jpg',
    },
    category: {
      id: 13,
      parent: 9,
      name: 'from us new 2',
      description: 'description new',
    },
  },
]
export default function Courses() {
  const mockData = useMemo(() => MocksCourses, [])

  const client = useClient()
  const {user} = useAuth()

  const [filter, setFilter] = useState('')
  const {isLoading, error, data} = useQuery({
    queryKey: 'courses',
    queryFn: () =>
      client(`course/enroll/getUserCourses?user_id=${user.id}`).then(
        data => data,
      ),
  })

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Courses">
      <Container>
        <Typography variant="h4" sx={{mb: 5}}>
          <FormattedMessage id="courses" />
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{mb: 5}}
        >
          <Stack
            direction="row"
            width={'100%'}
            spacing={1}
            justifyContent={'center'}
          >
            <Filters filter={''} setFilter={setFilter} />
          </Stack>
        </Stack>

        <CourseList courses={mockData} />
      </Container>
    </Page>
  )
}
