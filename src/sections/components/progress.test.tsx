import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { ProgressComponentMemo } from './progress'

const sectionsMock = {
  byId: {
    section_1: {
      name: 'section_1',
      title: 'Section 1',
      canMove: false,
      canRepeat: false,
      addLabel: 'Add section 1 row',
      fields: [{ name: 'row', fields: ['fld_1', 'fld_2'] }],
    },
    section_2: {
      name: 'section_2',
      title: 'Section 2',
      canMove: true,
      canRepeat: false,
      addLabel: 'Add section 1 row',
      fields: [{ name: 'row', fields: ['fld_1', 'fld_2'] }],
    },
  },
  fixedIds: ['section_1'],
  nonFixedIds: ['section_2'],
  allIds: ['section_1', 'section_2'],
}

describe('ProgressComponentMemo', () => {
  test('should render the anchors list', () => {
    render(<ProgressComponentMemo sections={sectionsMock} />)
    expect(screen.getByText(/Section 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Section 2/i)).toBeInTheDocument()
  })
})
