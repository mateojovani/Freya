import * as React from 'react'
import { useCallback, useMemo } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Node } from 'slate'
import * as ReactDOMServer from 'react-dom/server'

type EditorProps = {
  value: Node[]
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          style={{
            borderLeft: '2px solid #ddd',
            marginLeft: '0',
            marginRight: '0',
            paddingLeft: '10px',
            color: '#aaa',
            fontStyle: 'italic',
          }}
          {...attributes}
        >
          {children}
        </blockquote>
      )
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
    children = (
      <code
        style={{
          fontFamily: 'monospace',
          backgroundColor: '#eee',
          padding: '3px',
        }}
      >
        {children}
      </code>
    )
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const RichText: React.FunctionComponent<EditorProps> = ({ value }) => {
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate editor={editor} value={value} onChange={() => {}}>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  )
}

export const renderEditor = (state: Node[]) =>
  ReactDOMServer.renderToString(<RichText value={state} />)
