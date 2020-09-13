import * as React from 'react'
import { Layout, Row, Col, Affix } from 'antd'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'

import { AppHeader } from '../header/container'
import { Library } from '../library/container'
import { ResumeEditor } from '../editor/container'

const Header = () => {
  const history = useHistory()

  return (
    <Switch>
      <Route exact path="/">
        <AppHeader subTitle="My library" />
      </Route>
      <Route path="/resume/:id">
        <AppHeader subTitle="Resume editor" onBack={() => history.push('/')} />
      </Route>
    </Switch>
  )
}

export const Main = () => {
  return (
    <Router>
      <Header />
      <Layout>
        <Layout.Content style={{ padding: '0 0 0 10px', background: 'white' }}>
          <Switch>
            <Route exact path="/">
              <Library />
            </Route>
            <Route path="/resume/:id">
              <ResumeEditor />
            </Route>
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  )
}
