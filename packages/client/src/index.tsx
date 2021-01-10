import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.less'

import configureStore from './store'
import { Main } from './main/container'

function App() {
  return (
    <Provider store={configureStore()}>
      <Auth0Provider
        domain={process.env.AUTH_DOMAIN}
        audience={process.env.API_AUDIANCE}
        clientId={process.env.AUTH_CLIENT}
        redirectUri={window.location.origin}
      >
        <Main />
      </Auth0Provider>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
