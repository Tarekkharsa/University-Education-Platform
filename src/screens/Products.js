import {useState} from 'react'
// material
import {Container, Stack, Typography} from '@mui/material'
// components
import Page from '../components/Page'
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from '../sections/@dashboard/products'
//
import PRODUCTS from '../_mocks_/products'

// ----------------------------------------------------------------------

export default function EcommerceShop() {
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
