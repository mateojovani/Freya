import * as React from 'react'
import isHotkey from 'is-hotkey'
import { useCallback, useMemo } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import styled from 'styled-components'

import {
  MarkButton,
  BlockButton,
  Toolbar,
  toggleMark,
  MarkFormat,
  BlockFormat,
} from './editorToolbar'

type EditorProps = {
  id: string
  value: Node[]
  onChange: (value: Node[]) => void
}

const HOTKEYS = {
  'mod+b': MarkFormat.Bold,
  'mod+i': MarkFormat.Italic,
  'mod+u': MarkFormat.Underline,
  'mod+`': MarkFormat.Code,
}

const StyledBlockQuote = styled.blockquote`
  border-left: 2px solid #ddd;
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  color: #aaa;
  font-style: italic;

  [dir='rtl'] {
    border-left: none;
    padding-left: 0;
    padding-right: 10px;
    border-right: 2px solid #ddd;
  }
`

const StyledCode = styled.code`
  font-family: monospace;
  background-color: #eee;
  padding: 3px;
`

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <StyledBlockQuote {...attributes}>{children}</StyledBlockQuote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <StyledCode>{children}</StyledCode>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const StyledEditor = styled.div`
  border: 1px solid #d9d9d9;
`

const RichText: React.FunctionComponent<EditorProps> = ({
  value,
  onChange,
}) => {
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <StyledEditor>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => onChange(value)}
      >
        <Toolbar>
          <MarkButton format={MarkFormat.Bold} />
          <MarkButton format={MarkFormat.Italic} />
          <MarkButton format={MarkFormat.Underline} />
          <MarkButton format={MarkFormat.Code} />
          <BlockButton format={BlockFormat.H1} />
          <BlockButton format={BlockFormat.H2} />
          <BlockButton format={BlockFormat.Bquote} />
          <BlockButton format={BlockFormat.NList} />
          <BlockButton format={BlockFormat.BList} />
        </Toolbar>
        <Editable
          style={{
            minHeight: '150px',
            maxHeight: '250px',
            overflow: 'auto',
            padding: '10px',
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </Slate>
    </StyledEditor>
  )
}

export const EditorComponent = React.memo(RichText)
