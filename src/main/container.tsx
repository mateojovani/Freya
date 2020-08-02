import * as React from 'react'
import { Layout } from 'antd'

import { AppHeader } from '../header/container'
import { Sections } from '../sections/container'

export const Main = () => {
  return (
    <Layout>
      <AppHeader />

      <Layout.Content style={{ padding: '0 50px', background: 'white' }}>
        <Sections />
      </Layout.Content>
    </Layout>
  )
}
