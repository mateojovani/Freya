import * as React from 'react'
import { PageHeader } from 'antd'

interface AppHeaderProps {
  subTitle: string
  onBack?: () => void
}

export const AppHeader: React.FC<AppHeaderProps> = (props) => {
  return (
    <PageHeader
      title="Freya"
      subTitle={props.subTitle}
      ghost={false}
      style={{ borderBottom: 'solid 1px #f0f0f0', padding: '10px 24px' }}
      onBack={props.onBack}
    />
  )
}
