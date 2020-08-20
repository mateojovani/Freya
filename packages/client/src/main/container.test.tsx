import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Main } from './container'
import { renderWithStore } from '../utils'

describe('Main', () => {
  test('basic config', () => {
    const { container } = renderWithStore(<Main />)
    expect(container).toBeInTheDocument()
  })
})
