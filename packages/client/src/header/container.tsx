import * as React from 'react'
import { PageHeader } from 'antd'

export const AppHeader = () => {
  return (
    <PageHeader
      title="Freya"
      subTitle="Resume editor"
      ghost={false}
      style={{ borderBottom: 'solid 1px #f0f0f0', padding: '10px 24px' }}
    />
  )
}
