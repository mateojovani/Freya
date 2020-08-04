import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'

import {
  HandleComponent,
  DeleteComponent,
  DuplicateComponent,
  Actions,
} from './actions'

describe('HandleComponent', () => {
  test('basic config', () => {
    render(<HandleComponent />)
    const handle = screen.getByTestId('handle')
    expect(handle).toBeInTheDocument()
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('ant-btn', 'ant-btn-sm', 'ant-btn-icon-only')
  })

  test('with props', () => {
    render(<HandleComponent dragProps={{ draggable: true }} size="middle" />)
    const handle = screen.getByTestId('handle')
    expect(handle).toBeInTheDocument()
    expect(handle.draggable).toBeTrue()
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('ant-btn', 'ant-btn-icon-only')
  })
})

describe('DeleteComponent', () => {
  test('basic config', () => {
    const clickHandler = jest.fn()
    render(<DeleteComponent onClick={clickHandler} />)
    const btn = screen.getByRole('button')
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })
})

describe('DuplicateComponent', () => {
  test('basic config', () => {
    const clickHandler = jest.fn()
    render(<DuplicateComponent onClick={clickHandler} />)
    const btn = screen.getByRole('button')
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })
})

describe('Actions', () => {
  test('basic config', () => {
    const { container } = render(
      <Actions>
        <div>action</div>
      </Actions>
    )
    expect(container).toBeInTheDocument()
    expect(screen.getByText(/action/i)).toBeInTheDocument()
  })
})
