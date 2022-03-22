import * as React from 'react'
import ReactDOM from 'react-dom'
import {App} from './app'
import {AppProviders} from './context'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter} from 'react-router-dom'
import {loadDevTools} from 'dev-tools/load'

loadDevTools(() => {
  ReactDOM.render(
    <HelmetProvider>
      <AppProviders>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProviders>
    </HelmetProvider>,
    document.getElementById('root'),
  )
})
