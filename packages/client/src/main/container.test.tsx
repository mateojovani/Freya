import * as React from 'react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

import { Main } from './container'
import { renderWithStore } from '../testUtils'
import { waitFor, screen } from '@testing-library/react'

describe('Main', () => {
  test('dashboard', async () => {
    const { container } = renderWithStore(<Main />, MemoryRouter)
    await waitFor(() => [
      screen.getByText(/Before we get you going/i)
    ])
    expect(container).toBeInTheDocument()
    expect(screen.getByText(/Before we get you going/i)).toBeInTheDocument()
  })
})
