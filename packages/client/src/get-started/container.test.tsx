import * as React from 'react'
import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'

import { GetStarted } from './container'

describe('GetStarted', () => {
  test('basic config', async () => {
    const { container } = render(<GetStarted />)
    expect(container).toBeInTheDocument()
    expect(screen.getByText(/Next/)).toBeInTheDocument()
    expect(screen.getByText(/Skip/)).toBeInTheDocument()
  })
})
