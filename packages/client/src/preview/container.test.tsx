import * as React from 'react'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'

import { PreviewComponent } from './container'
import { renderWithStore } from '../testUtils'

describe('Preview', () => {
  test('should render cv preview', async () => {
    renderWithStore(<PreviewComponent />)
    await waitFor(() => screen.getByRole('img'))
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
