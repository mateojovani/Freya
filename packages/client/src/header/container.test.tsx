import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { AppHeader } from './container'

describe('AppHeader', () => {
  test('basic config', () => {
    render(<AppHeader subTitle="Resume editor"/>)
    expect(screen.getByText(/Freya/i)).toBeInTheDocument()
    expect(screen.getByText(/Resume editor/i)).toBeInTheDocument()
  })
})
