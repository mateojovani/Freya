import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'

import configureStore from './store'
import { Main } from './main/container'

function App() {
  return (
    <Provider store={configureStore()}>
      <Main />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
