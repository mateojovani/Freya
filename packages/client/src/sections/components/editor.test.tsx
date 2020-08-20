import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { EditorComponent } from './editor'

describe('editor', () => {
  test('should render basic editor', () => {
    render(<EditorComponent id="editor" onChange={jest.fn()} value={[]} />)
    expect(screen.getAllByRole('button').length).toEqual(9)
  })
})
