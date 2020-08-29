import * as React from 'react'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'

import { SectionsComponent } from './container'
import { renderWithStore } from '../utils'

describe('Sections', () => {
  test('should render sections', async () => {
    renderWithStore(<SectionsComponent />)
    await waitFor(() => screen.getAllByText(/Personal information/i))
    screen
      .getAllByText(/Personal information/i)
      .forEach((el) => expect(el).toBeInTheDocument())
  })
})
