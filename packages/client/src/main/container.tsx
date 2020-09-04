import * as React from 'react'
import { Layout, Row, Col } from 'antd'

import { AppHeader } from '../header/container'
import { SectionsComponent } from '../sections/container'
import { PreviewComponent } from '../preview/container'

export const Main = () => {
  return (
    <Layout>
      <AppHeader />

      <Layout.Content style={{ padding: '0 50px', background: 'white' }}>
        <Row gutter={[8, 8]}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={{ span: 10, offset: 2 }}
          >
            <SectionsComponent />
          </Col>
          <Col lg={12} xl={12} xxl={10}>
            <PreviewComponent />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}
