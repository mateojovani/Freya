import * as React from 'react'
import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'

import { Library } from './container'

describe('Library', () => {
  test('basic config', async () => {
    const { container } = render(<Library />)
    expect(container).toBeInTheDocument()
    await waitFor(() => screen.getAllByTestId(/preview/))
    screen
      .getAllByTestId(/preview/)
      .forEach((el) => expect(el).toBeInTheDocument())
    expect(screen.getByText(/Create/)).toBeInTheDocument()
  })
})
