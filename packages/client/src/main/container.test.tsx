import * as React from 'react'
import '@testing-library/jest-dom'

import { Main } from './container'
import { renderWithStore } from '../utils'
import { waitFor, screen } from '@testing-library/react'

describe('Main', () => {
  test('basic config', async () => {
    const { container } = renderWithStore(<Main />)
    await waitFor(() => screen.getAllByText(/Personal information/i))
    expect(container).toBeInTheDocument()
  })
})
