import * as React from 'react'
import '~/editor/node_modules/@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { AppHeader } from './container'

describe('AppHeader', () => {
  test('basic config', () => {
    render(<AppHeader />)
    expect(screen.getByText(/Freya/i)).toBeInTheDocument()
    expect(screen.getByText(/Resume editor/i)).toBeInTheDocument()
  })
})
