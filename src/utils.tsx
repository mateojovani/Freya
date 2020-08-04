import * as React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import sectionsReducer from './sections/reducer'
import { State, FieldType, SectionsAction } from './sections/types'
import { AppState } from './types'

const reducers = combineReducers<AppState, SectionsAction>({sectionsView: sectionsReducer})
const sectionsMockNormalised: State = {
  sections: {
    byId: {
      bio: {
        name: 'bio',
        title: 'Personal information',
        canMove: false,
        canRepeat: false,
        addLabel: 'Add information',
        fields: [
          {
            name: 'pinf',
            fields: [
              'firstName',
              'lastName',
              'title',
              'email',
              'phone',
              'summary',
            ],
          },
        ],
      },
      experience: {
        name: 'experience',
        title: 'Work experience',
        canMove: true,
        canRepeat: true,
        addLabel: 'Add job',
        fields: [
          { name: 'exp_1', fields: ['job_title', 'job_desc'] },
          { name: 'exp_2', fields: ['job_title_1', 'job_desc_1'] },
        ],
      },
      education: {
        name: 'education',
        title: 'Education',
        canMove: true,
        canRepeat: true,
        addLabel: 'Add education',
        fields: [
          { name: 'ed_1', fields: ['ed_start_date'] },
          { name: 'ed_2', fields: ['ed_start_date_1'] },
          { name: 'ed_3', fields: ['ed_start_date_2'] },
        ],
      },
    },
    allIds: ['bio', 'experience', 'education'],
    fixedIds: ['bio'],
    nonFixedIds: ['experience', 'education'],
  },
  fields: {
    byId: {
      firstName: {
        name: 'firstName',
        title: 'First Name',
        type: FieldType.Text,
        value: '',
      },
      lastName: {
        name: 'lastName',
        title: 'Last Name',
        type: FieldType.Text,
        value: '',
      },
      title: {
        name: 'title',
        title: 'Your Title',
        type: FieldType.Text,
        value: '',
      },
      email: {
        name: 'email',
        title: 'Email',
        type: FieldType.Email,
        value: '',
      },
      phone: {
        name: 'phone',
        title: 'Phone',
        type: FieldType.Tel,
        value: '',
      },
      summary: {
        name: 'summary',
        title: 'Short summary',
        type: FieldType.RichText,
        value: '',
      },
      job_title: {
        name: 'job_title',
        title: 'Job title',
        type: FieldType.Text,
        value: '',
      },
      job_desc: {
        name: 'job_desc',
        title: 'Job description',
        type: FieldType.RichText,
        value: '',
      },
      job_title_1: {
        name: 'job_title_1',
        title: 'Job title',
        type: FieldType.Text,
        value: '',
      },
      job_desc_1: {
        name: 'job_desc_1',
        title: 'Job description',
        type: FieldType.RichText,
        value: '',
      },
      ed_start_date: {
        name: 'ed_start_date',
        title: 'Start date',
        type: FieldType.Date,
        value: '',
      },
      ed_start_date_1: {
        name: 'ed_start_date_1',
        title: 'Start date',
        type: FieldType.Date,
        value: '',
      },
      ed_start_date_2: {
        name: 'ed_start_date_2',
        title: 'Start date',
        type: FieldType.Date,
        value: '',
      },
    },
    allIds: [
      'firstName',
      'lastName',
      'title',
      'email',
      'photo',
      'job_title',
      'job_desc',
      'job_title_1',
      'job_desc_1',
      'ed_start_date',
      'ed_start_date_1',
      'ed_start_date_2',
    ],
  },
  currentSectionId: 'bio',
}

export const renderWithStore = (
  Component,
  state = { sectionsView: sectionsMockNormalised }
) => {
  const store = createStore(reducers, state)
  return render(<Provider store={store}>{Component}</Provider>)
}
