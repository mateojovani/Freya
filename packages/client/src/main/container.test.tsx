import * as React from 'react'
import '~/editor/node_modules/@testing-library/jest-dom'

import { Main } from './container'
import { renderWithStore } from '../testUtils'
import { waitFor, screen } from '@testing-library/react'

describe('Main', () => {
  test('basic config', async () => {
    const { container } = renderWithStore(<Main />)
    await waitFor(() => [
      screen.getAllByText(/Personal information/i),
      screen.getByTestId('preview'),
    ])
    expect(container).toBeInTheDocument()
    expect(screen.getByTestId('preview')).toBeInTheDocument()
  })
})
