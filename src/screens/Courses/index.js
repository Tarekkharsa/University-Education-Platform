// material
import {Container, Stack, Typography} from '@mui/material'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import {useAuth, useClient} from 'context/auth-context'
import {useQuery} from 'react-query'
//
import PRODUCTS from '../../_mocks_/products'
// ----------------------------------------------------------------------
import {
  ProductCartWidget,
  ProductList,
  ProductSort,
} from '../../sections/@dashboard/products'

export default function Courses() {
  const client = useClient()
  const {user} = useAuth()

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'courses',
    queryFn: () =>
      client(`course/enroll/getUserCourses?user_id=${user.id}`).then(
        data => data.data,
      ),
  })

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{mb: 5}}>
          Products
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{mb: 5}}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{my: 1}}>
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
    </Page>
  )
}
