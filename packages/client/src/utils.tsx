import * as React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import sectionsReducer from './sections/reducer'
import { State, FieldType, SectionsAction } from './sections/types'
import { AppState } from './types'

const reducers = combineReducers<AppState, SectionsAction>({
  sectionsView: sectionsReducer,
})
export const sectionsMockNormalised: State = {
  templates: {
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
                defaultValue: '',
              },
              {
                name: 'lastName',
                title: 'Last name',
                type: FieldType.Text,
                value: '',
                defaultValue: '',
              },
            ],
            [
              {
                name: 'title',
                title: 'Your Title',
                type: FieldType.Text,
                value: '',
                defaultValue: '',
              },
            ],
            [
              {
                name: 'email',
                title: 'Email',
                type: FieldType.Email,
                value: '',
                defaultValue: '',
              },
              {
                name: 'phone',
                title: 'Phone',
                type: FieldType.Tel,
                value: '',
                defaultValue: '',
              },
            ],
            [
              {
                name: 'summary',
                title: 'Short summary',
                type: FieldType.RichText,
                value: [
                  {
                    type: 'paragraph',
                    children: [{ text: '' }],
                  },
                ],
                defaultValue: [
                  {
                    type: 'paragraph',
                    children: [{ text: '' }],
                  },
                ],
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
                defaultValue: '',
              },
            ],
            [
              {
                name: 'job_desc',
                title: 'Job description',
                type: FieldType.RichText,
                value: [
                  {
                    type: 'paragraph',
                    children: [{ text: '' }],
                  },
                ],
                defaultValue: [
                  {
                    type: 'paragraph',
                    children: [{ text: '' }],
                  },
                ],
              },
            ],
          ],
        ],
      },
      {
        name: 'education',
        title: 'Education',
        canMove: true,
        canRepeat: true,
        addLabel: 'Add education',
        fields: [
          [
            [
              {
                name: 'ed_start_date',
                title: 'Start date',
                type: FieldType.Date,
                value: '',
                defaultValue: '',
              },
            ],
          ],
        ],
      },
    ],
    inUse: ['bio', 'experience', 'education'],
  },
  sections: {
    byId: {
      'e572e220-41f1-491c-ab39-412f0d3b270c': {
        name: 'bio',
        title: 'Personal information',
        canMove: false,
        canRepeat: false,
        addLabel: 'Add information',
        fields: [
          {
            name: 'pinf',
            fields: [
              [
                '681a3228-a410-4f7a-96cd-0d6d9274faf3',
                'bae74c1a-94aa-46a5-8870-60d9552dfaa7',
              ],
              ['c92befdb-e556-4920-b3a8-39a272d98aff'],
              [
                'aa847c1a-2e9b-4e73-9b4a-1ac3499580ee',
                '4903997b-ef2f-48b4-9b6c-95c9655aa389',
              ],
              ['eb0e58e5-c948-44fc-975a-35fcf5204487'],
            ],
          },
        ],
      },
      'fe0dfdf-048f-ed65-6db6-cbf45746f8e7': {
        name: 'experience',
        title: 'Work experience',
        canMove: true,
        canRepeat: true,
        addLabel: 'Add job',
        fields: [
          {
            name: 'row_845c3b-08ef-c007-185d-c7311ec5622',
            fields: [
              ['06438-d80c-f0c2-670a-e6db774a6138'],
              ['fc0a8b7-be80-04a7-0586-7c646dcc8c62'],
            ],
          },
        ],
      },
      'edc427-ffa2-03b-bbd7-50cd5f2c825': {
        name: 'education',
        title: 'Education',
        canMove: true,
        canRepeat: true,
        addLabel: 'Add education',
        fields: [
          {
            name: 'row_aaef8c-c0-d44-0118-42c214e44f',
            fields: [['3c6c03-171-1cbc-86b3-1ccebe64d101']],
          },
        ],
      },
    },
    allIds: [
      'e572e220-41f1-491c-ab39-412f0d3b270c',
      'fe0dfdf-048f-ed65-6db6-cbf45746f8e7',
      'edc427-ffa2-03b-bbd7-50cd5f2c825',
    ],
    fixedIds: ['e572e220-41f1-491c-ab39-412f0d3b270c'],
    nonFixedIds: [
      'fe0dfdf-048f-ed65-6db6-cbf45746f8e7',
      'edc427-ffa2-03b-bbd7-50cd5f2c825',
    ],
  },
  fields: {
    byId: {
      '681a3228-a410-4f7a-96cd-0d6d9274faf3': {
        name: 'firstName',
        title: 'First Name',
        type: FieldType.Text,
        value: '',
        defaultValue: '',
      },
      'bae74c1a-94aa-46a5-8870-60d9552dfaa7': {
        name: 'lastName',
        title: 'Last Name',
        type: FieldType.Text,
        value: '',
        defaultValue: '',
      },
      'c92befdb-e556-4920-b3a8-39a272d98aff': {
        name: 'title',
        title: 'Your Title',
        type: FieldType.Text,
        value: '',
        defaultValue: '',
      },
      'aa847c1a-2e9b-4e73-9b4a-1ac3499580ee': {
        name: 'email',
        title: 'Email',
        type: FieldType.Email,
        value: '',
        defaultValue: '',
      },
      '4903997b-ef2f-48b4-9b6c-95c9655aa389': {
        name: 'phone',
        title: 'Phone',
        type: FieldType.Tel,
        value: '',
        defaultValue: '',
      },
      'eb0e58e5-c948-44fc-975a-35fcf5204487': {
        name: 'summary',
        title: 'Short summary',
        type: FieldType.RichText,
        value: [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
        defaultValue: [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
      },
      '06438-d80c-f0c2-670a-e6db774a6138': {
        name: 'job_title',
        title: 'Job title',
        type: FieldType.Text,
        value: '',
        defaultValue: '',
      },
      'fc0a8b7-be80-04a7-0586-7c646dcc8c62': {
        name: 'job_desc',
        title: 'Job description',
        type: FieldType.RichText,
        value: [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
        defaultValue: [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
      },
      '3c6c03-171-1cbc-86b3-1ccebe64d101': {
        name: 'ed_start_date',
        title: 'Start date',
        type: FieldType.Date,
        value: '',
        defaultValue: '',
      },
    },
    allIds: [
      '681a3228-a410-4f7a-96cd-0d6d9274faf3',
      'bae74c1a-94aa-46a5-8870-60d9552dfaa7',
      'c92befdb-e556-4920-b3a8-39a272d98aff',
      'aa847c1a-2e9b-4e73-9b4a-1ac3499580ee',
      '4903997b-ef2f-48b4-9b6c-95c9655aa389',
      'eb0e58e5-c948-44fc-975a-35fcf5204487',
      '3c6c03-171-1cbc-86b3-1ccebe64d101',
    ],
  },
}

export const renderWithStore = (
  Component,
  state = { sectionsView: sectionsMockNormalised }
) => {
  const store = createStore(reducers, state)
  return render(<Provider store={store}>{Component}</Provider>)
}
