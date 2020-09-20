import * as React from 'react'
import '@testing-library/jest-dom'
import { screen, waitFor, waitForDomChange } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import { ResumeEditor } from './container'
import { renderWithStore } from '../testUtils'

describe('Sections', () => {
  test('should render cv', async () => {
    renderWithStore(<ResumeEditor />, MemoryRouter)
    await waitFor(() => screen.getAllByText(/Personal information/i))
    screen
      .getAllByText(/Personal information/i)
      .forEach((el) => expect(el).toBeInTheDocument())
    expect(screen.getByTestId('preview')).toBeInTheDocument()
  })

  test('should update the cv', async () => {
    jest.useFakeTimers()
    renderWithStore(<ResumeEditor />, MemoryRouter)
    await waitFor(() => screen.getAllByText(/Personal information/i))
    userEvent.type(screen.getByLabelText(/First name/i), 'F')
    await waitFor(() =>
      expect(screen.getByTestId('preview')).toHaveAttribute(
        'src',
        `data:image/png;base64,image-after-save`
      )
    )
  })
})
