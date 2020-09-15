import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import { PreviewComponent } from './preview'

describe('Preview', () => {
  test('should render cv preview', async () => {
    render(<PreviewComponent url='' />)
    await waitFor(() => screen.getByRole('img'))
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
