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
import { SectionsComponent } from '../sections/container'
import { PreviewComponent } from '../preview/container'

const ResumeEditor = () => (
  <Row gutter={[8, 8]}>
    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={{ span: 10, offset: 2 }}>
      <SectionsComponent />
    </Col>
    <Col lg={{ span: 11, offset: 1 }} xl={{ span: 11, offset: 1 }} xxl={10}>
      <Affix offsetTop={0}>
        <PreviewComponent />
      </Affix>
    </Col>
  </Row>
)

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
        <Layout.Content style={{ padding: '0 50px', background: 'white' }}>
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
