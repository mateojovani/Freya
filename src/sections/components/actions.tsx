import * as React from 'react'
import styled from 'styled-components'
import { DragOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

type HandleProps = {
  dragProps: any
  size: 'middle' | 'small'
}

type ActionButtonProps = {
  onClick?: (ev) => void
}

export const HandleComponent: React.FunctionComponent<HandleProps> = ({
  dragProps,
  size,
}) => (
  <div {...dragProps} style={{ marginBottom: '5px' }}>
    <Tooltip title="Drag to reorder">
      <Button type="dashed" icon={<DragOutlined />} size={size} />
    </Tooltip>
  </div>
)

export const DeleteComponent: React.FunctionComponent<ActionButtonProps> = ({
  onClick,
}) => (
  // <Tooltip title="Delete row">
  <Button
    onClick={onClick}
    type="dashed"
    danger
    icon={<DeleteOutlined />}
    size="small"
    style={{ marginBottom: '5px', marginTop: '5px' }}
  ></Button>
  // </Tooltip>
)

export const DuplicateComponent: React.FunctionComponent<ActionButtonProps> = ({
  onClick,
}) => (
  // <Tooltip title="Duplicate row">
  <Button
    onClick={onClick}
    type="dashed"
    icon={<CopyOutlined />}
    size="small"
    style={{ marginBottom: '5px' }}
  ></Button>
  // </Tooltip>
)

export const Actions = styled.div`
  position: absolute;
  margin-left: -35px;
  z-index: 999;
  display: flex;
  flex-flow: column;
  visibility: hidden;
`
