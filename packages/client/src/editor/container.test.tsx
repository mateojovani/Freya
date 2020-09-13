import * as React from 'react'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'

import { ResumeEditor } from './container'
import { renderWithStore } from '../testUtils'

describe('Sections', () => {
  test('should render sections', async () => {
    renderWithStore(<ResumeEditor />)
    await waitFor(() => screen.getAllByText(/Personal information/i))
    screen
      .getAllByText(/Personal information/i)
      .forEach((el) => expect(el).toBeInTheDocument())
  })
})
