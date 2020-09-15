import * as React from 'react'
import '@testing-library/jest-dom'

import { Library } from './container'
import { screen, render } from '@testing-library/react'

describe('Library', () => {
  test('basic config', async () => {
    const { container } = render(<Library />)
    expect(container).toBeInTheDocument()
    expect(screen.getByText(/Get started/)).toBeInTheDocument()
  })
})
