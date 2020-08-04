import * as React from 'react'
import '@testing-library/jest-dom'
import { screen, fireEvent } from '@testing-library/react'

import { SectionsComponent } from './container'
import { renderWithStore } from '../utils'

describe('Sections', () => {
  test('should render sections', () => {
    renderWithStore(<SectionsComponent />)
    screen.getAllByText(/Personal information/i).forEach(el => expect(el).toBeInTheDocument())
    screen.getAllByText(/Work Experience/i).forEach(el => expect(el).toBeInTheDocument())
    screen.getAllByText(/Education/i).forEach(el => expect(el).toBeInTheDocument())
    expect(screen.getAllByTestId('handle').length).toEqual(7)
    fireEvent.click(screen.getAllByText(/Work Experience/i)[0])
    expect(screen.getAllByText(/Work Experience/i)[1].offsetTop).toEqual(0)
  })
})
