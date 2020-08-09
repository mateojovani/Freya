import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { AddSectionComponent } from './addSection'
import { FieldType } from '../types'

const templates = {
  sections: [
    {
      name: 'bio',
      title: 'Personal information',
      canMove: false,
      canRepeat: false,
      addLabel: 'Add information',
      fields: [
        [
          [
            {
              name: 'firstName',
              title: 'First name',
              type: FieldType.Text,
              value: '',
            },
            {
              name: 'lastName',
              title: 'Last name',
              type: FieldType.Text,
              value: '',
            },
          ],
        ],
      ],
    },
    {
      name: 'experience',
      title: 'Work experience',
      canMove: true,
      canRepeat: true,
      addLabel: 'Add job',
      fields: [
        [
          [
            {
              name: 'job_title',
              title: 'Job title',
              type: FieldType.Text,
              value: '',
            },
          ],
          [
            {
              name: 'job_desc',
              title: 'Job description',
              type: FieldType.RichText,
              value: '',
            },
          ],
        ],
      ],
    }
  ],
  inUse: ['bio'],
}

describe('HandleComponent', () => {
  test('basic config', () => {
    render(<AddSectionComponent templates={templates} addSection={() => {}}/>)
    expect(screen.getByText(/Add section/i)).toBeInTheDocument()
    expect(screen.queryByText(/Add a section/i)).toBeNull()
  })


  describe('click add section button', () => {
    const handleAddSection = jest.fn()
    beforeEach(() => {
      render(<AddSectionComponent templates={templates} addSection={handleAddSection}/>)
    })

    test('modal should open', async () => {
      fireEvent.click(screen.getByText(/Add section/i))
      await waitFor(() => {
        expect(screen.getByText(/Add a section/i)).toBeInTheDocument()
        expect(screen.getByText(/Start with a template/i)).toBeInTheDocument()
        expect(screen.getByText(/Personal information/i)).toBeInTheDocument()
        expect(screen.getByText(/Work experience/i)).toBeInTheDocument()
        expect(screen.getAllByRole('button')[2]).toBeDisabled()
        expect(screen.getAllByRole('button')[3]).not.toBeDisabled()
      })
    })

    test('add a section click', async () => {
      fireEvent.click(screen.getByText(/Add section/i))
      expect(screen.getByText(/Work experience/i)).toBeInTheDocument()
      fireEvent.click(screen.getByText(/Work experience/i))
      expect(handleAddSection).toHaveBeenCalledWith(1)
    })
  })
})
