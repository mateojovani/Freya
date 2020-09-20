import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import { PreviewComponent } from './preview'

describe('Preview', () => {
  test('should render cv preview', async () => {
    render(
      <PreviewComponent
        source={{ urls: [{ base64: '' }] }}
        isAutoSaved={true}
      />
    )
    await waitFor(() =>
      expect(screen.getByTestId('preview')).toBeInTheDocument()
    )
  })

  test('should render cv preview - multiple images', async () => {
    render(
      <PreviewComponent
        source={{ urls: [{ base64: 'a' }, { base64: 'b' }] }}
        isAutoSaved={true}
      />
    )
    await waitFor(() =>
      expect(screen.getByTestId('preview')).toHaveAttribute(
        'src',
        `data:image/png;base64,a`
      )
    )
    expect(screen.getByText('1/2')).toBeInTheDocument()
  })
})
