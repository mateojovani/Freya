import * as React from 'react'
import { useSlate, ReactEditor } from 'slate-react'
import { Editor, Transforms, Node } from 'slate'
import { Button } from 'antd'
import {
  BoldOutlined,
  QuestionCircleOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  CodeOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'

export enum MarkFormat {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Code = 'code',
}

export enum BlockFormat {
  H1 = 'heading-one',
  H2 = 'heading-two',
  Bquote = 'block-quote',
  NList = 'numbered-list',
  BList = 'bulleted-list',
}

type MarkBtnProps = {
  format: MarkFormat
}

type BlockBtnProps = {
  format: BlockFormat
}

type IconProps = {
  type: MarkFormat | BlockFormat
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const isBlockActive = (editor: ReactEditor, format: BlockFormat): boolean => {
  const [match] = Editor.nodes(editor, {
    match: (n: Node & { type: BlockFormat }) => n.type === format,
  })

  return !!match
}

const toggleBlock = (editor: ReactEditor, format: BlockFormat) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n: Node & { type: string }) => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const isMarkActive = (editor: ReactEditor, format: MarkFormat): boolean => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const toggleMark = (editor: ReactEditor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const Icon: React.FunctionComponent<IconProps> = ({ type }) => {
  switch (type) {
    case MarkFormat.Bold:
      return <BoldOutlined />
    case MarkFormat.Italic:
      return <ItalicOutlined />
    case MarkFormat.Underline:
      return <UnderlineOutlined />
    case MarkFormat.Code:
      return <CodeOutlined />
    case BlockFormat.H1:
      return <span>h1</span>
    case BlockFormat.H2:
      return <span>h2</span>
    case BlockFormat.Bquote:
      return <span>&ldquo;</span>
    case BlockFormat.NList:
      return <OrderedListOutlined />
    case BlockFormat.BList:
      return <UnorderedListOutlined />
    default:
      return <QuestionCircleOutlined />
  }
}

const StyledToolbar = styled.div`
  border-bottom: 1px solid #d9d9d9;
`

export const BlockButton: React.FunctionComponent<BlockBtnProps> = ({
  format,
}) => {
  const editor = useSlate()

  return (
    <Button
      icon={<Icon type={format} />}
      type={isBlockActive(editor, format) ? 'link' : 'text'}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    />
  )
}

export const MarkButton: React.FunctionComponent<MarkBtnProps> = ({
  format,
}) => {
  const editor = useSlate()

  return (
    <Button
      icon={<Icon type={format} />}
      type={isMarkActive(editor, format) ? 'link' : 'text'}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    />
  )
}

export const Toolbar = ({ children }) => (
  <StyledToolbar>{children}</StyledToolbar>
)
