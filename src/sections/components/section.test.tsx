import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SectionComponentMemo } from './section'
import { Section, FieldType } from '../types'

const fixedSectionMock: Section = {
  name: 'section_1',
  title: 'Section 1',
  canMove: false,
  canRepeat: false,
  addLabel: 'Add section 1 row',
  fields: [{ name: 'row', fields: ['fld_1', 'fld_2'] }],
}

const dynamicSectionMock: Section = {
  name: 'section_1',
  title: 'Section 1',
  canMove: true,
  canRepeat: true,
  addLabel: 'Add section 1 row',
  fields: [
    { name: 'row_1', fields: ['fld_1', 'fld_2'] },
    { name: 'row_2', fields: ['fld_3', 'fld_4'] },
  ],
}

const fieldsMock = {
  byId: {
    fld_1: {
      name: 'fld_1',
      title: 'First Name',
      type: FieldType.Text,
      value: '',
    },
    fld_2: {
      name: 'fld_2',
      title: 'Email',
      type: FieldType.Email,
      value: 'user@corp.co',
    },
    fld_3: {
      name: 'fld_3',
      title: 'First Name',
      type: FieldType.Text,
      value: 'Odin',
    },
    fld_4: {
      name: 'fld_4',
      title: 'Email',
      type: FieldType.Email,
      value: 'odin@corp.co',
    },
  },
  allIds: ['fld_1', 'fld_2', 'fld_3', 'fld_4'],
}

describe('SectionComponentMemo', () => {
  test('should render fixed section', () => {
    render(
      <SectionComponentMemo
        section={fixedSectionMock}
        fields={{ ...fieldsMock }}
        fieldChange={jest.fn()}
      />
    )
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
  })

  test('should handle editing', () => {
    const handleFieldChange = jest.fn()
    render(
      <SectionComponentMemo
        section={fixedSectionMock}
        fields={{ ...fieldsMock }}
        fieldChange={handleFieldChange}
      />
    )
    userEvent.type(screen.getByLabelText(/First Name/i), 'Freya')
    expect(handleFieldChange).toHaveBeenCalledTimes(5)
    expect(handleFieldChange.mock.calls).toEqual([
      ['fld_1', 'F'],
      ['fld_1', 'r'],
      ['fld_1', 'e'],
      ['fld_1', 'y'],
      ['fld_1', 'a'],
    ])
  })

  test('should render dynamic section', () => {
    render(
      <SectionComponentMemo
        section={dynamicSectionMock}
        fields={{ ...fieldsMock }}
        fieldChange={jest.fn()}
      />
    )
    expect(screen.getAllByLabelText(/First Name/i)[0]).toBeInTheDocument()
    expect(screen.getAllByLabelText(/First Name/i)[1]).toBeInTheDocument()
  })

  test('should handle row delete', () => {
    const handleSectionRowDelete = jest.fn()
    const { container } = render(
      <SectionComponentMemo
        section={dynamicSectionMock}
        fields={{ ...fieldsMock }}
        fieldChange={jest.fn()}
        deleteSectionRow={handleSectionRowDelete}
      />
    )

    userEvent.hover(container.querySelector('[data-rbd-draggable-id="row_1"]'))
    userEvent.click(container.querySelector('.anticon-delete'))
    expect(handleSectionRowDelete).toBeCalledTimes(1)
    expect(handleSectionRowDelete).toBeCalledWith(0)
  })

  test('should handle row duplicate', () => {
    const handleSectionRowDuplicate = jest.fn()
    const { container } = render(
      <SectionComponentMemo
        section={dynamicSectionMock}
        fields={{ ...fieldsMock }}
        fieldChange={jest.fn()}
        duplicateSectionRow={handleSectionRowDuplicate}
      />
    )

    userEvent.hover(container.querySelector('[data-rbd-draggable-id="row_1"]'))
    userEvent.click(container.querySelector('.anticon-copy'))
    expect(handleSectionRowDuplicate).toBeCalledTimes(1)
    expect(handleSectionRowDuplicate).toBeCalledWith(0)
  })

  test('should handle row add', () => {
    const handleSectionRowAdd = jest.fn()
    render(
      <SectionComponentMemo
        section={dynamicSectionMock}
        fields={{ ...fieldsMock }}
        fieldChange={jest.fn()}
        addSectionRow={handleSectionRowAdd}
      />
    )

    userEvent.click(screen.getByText(/Add section 1 row/i))
    expect(handleSectionRowAdd).toBeCalledTimes(1)
  })
})
