import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Transforms } from 'slate'
import { withHistory } from 'slate-history'

import {
  BlockButton,
  BlockFormat,
  MarkButton,
  MarkFormat,
  Toolbar,
} from './editorToolbar'

const MockEditor = ({ children, value, editor }) => {
  const [state, setState] = React.useState(value)

  return (
    <Slate editor={editor} value={state} onChange={setState}>
      {children}
      <Editable
        renderElement={({ attributes, children, element }) => {
          switch (element.type) {
            case 'numbered-list':
              return (
                <ol data-testid="ol" {...attributes}>
                  {children}
                </ol>
              )
            default:
              return (
                <p data-testid="para" {...attributes}>
                  {children}
                </p>
              )
          }
        }}
        renderLeaf={({ attributes, children, leaf }) => {
          if (leaf.bold) {
            children = <strong data-testid="bold">{children}</strong>
          }

          return (
            <span data-testid="text" {...attributes}>
              {children}
            </span>
          )
        }}
      />
    </Slate>
  )
}

const renderWithSlate = (toolbar, value = []) => {
  const editor = withHistory(withReact(createEditor()))
  render(
    <MockEditor value={value} editor={editor}>
      {toolbar}
    </MockEditor>
  )

  return editor
}

describe('editorToolbar', () => {
  test('should render basic toolbar', () => {
    render(<Toolbar>toolbar</Toolbar>)
    expect(screen.getByText(/toolbar/i)).toBeInTheDocument()
  })

  test('should render toolbar with buttons', () => {
    renderWithSlate(
      <Toolbar>
        <MarkButton format={MarkFormat.Bold} />
        <BlockButton format={BlockFormat.H1} />
      </Toolbar>
    )
    expect(screen.getAllByRole('button').length).toEqual(2)
  })

  test('should apply mark', async () => {
    const editor = renderWithSlate(
      <Toolbar>
        <MarkButton format={MarkFormat.Bold} />
      </Toolbar>,
      [
        {
          type: 'paragraph',
          children: [{ text: 'Ragnarok' }],
        },
      ]
    )
    expect(screen.getByText(/Ragnarok/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('ant-btn-text')
    Transforms.select(editor, [0, 0])
    fireEvent.mouseDown(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveClass('ant-btn-link')
      expect(screen.getByTestId('bold')).toBeInTheDocument()
    })
  })

  test('should apply block', async () => {
    const editor = renderWithSlate(
      <Toolbar>
        <BlockButton format={BlockFormat.NList} />
      </Toolbar>,
      [
        {
          type: 'paragraph',
          children: [{ text: 'Thor' }],
        },
      ]
    )
    expect(screen.getByText(/Thor/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('ant-btn-text')
    Transforms.select(editor, [0])
    fireEvent.mouseDown(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveClass('ant-btn-link')
      expect(screen.getByTestId('ol')).toBeInTheDocument()
    })
  })
})
