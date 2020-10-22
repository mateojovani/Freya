import { FieldType, cv, sectionTemplates } from 'freya-shared'

import reducer, { State } from './reducer'
import {
  loadCV,
  setFieldValue,
  addSection,
  moveSection,
  addSectionRow,
  moveSectionRow,
  deleteSectionRow,
  saveCV,
} from './actions'

const mockCV: State = {
  templates: {
    sections: [
      {
        _id: '306c6b69-666b-4690-b5fb-e372c6d94236',
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
        _id: '0fe069df-4b71-49d2-b638-e421106f2147',
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
        _id: 'f45f2fe2-2949-43a4-82a9-20793ae336a0',
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
          [
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
        ],
      },
      'fe0dfdf-048f-ed65-6db6-cbf45746f8e7': {
        name: 'experience',
        title: 'Work experience',
        canMove: true,
        canRepeat: true,
        addLabel: 'Add job',
        fields: [
          [
            ['06438-d80c-f0c2-670a-e6db774a6138'],
            ['fc0a8b7-be80-04a7-0586-7c646dcc8c62'],
          ],
        ],
      },
      'edc427-ffa2-03b-bbd7-50cd5f2c825': {
        name: 'education',
        title: 'Education',
        canMove: true,
        canRepeat: true,
        addLabel: 'Add education',
        fields: [[['3c6c03-171-1cbc-86b3-1ccebe64d101']]],
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
  loading: true,
  hasChanges: false,
  cvId: 'mockCV',
  preview: { urls: [{ base64: '' }] },
}

describe('Sections Reducer', () => {
  test('Load cv', () => {
    const state = reducer(
      {
        templates: {},
        fields: null,
        sections: null,
        cvId: null,
        hasChanges: false,
        loading: true,
        preview: {
          urls: [{ base64: 'image' }],
        },
      },
      loadCV({
        cv,
        sectionTemplates,
      })
    )
    expect(state.loading).toEqual(false)
    expect(state.hasChanges).toEqual(false)
    expect(state.sections.allIds.length).toEqual(1)
    expect(state.fields.allIds.length).toEqual(6)
  })

  test('Save cv', () => {
    const state = reducer(
      mockCV,
      saveCV({
        preview: { urls: [{ base64: 'image' }] },
      })
    )
    expect(state.hasChanges).toEqual(false)
    expect(state.preview.urls).toEqual([{ base64: 'image' }])
  })

  test('Set field value', () => {
    const state = reducer(
      mockCV,
      setFieldValue('681a3228-a410-4f7a-96cd-0d6d9274faf3', 'Loki')
    )
    expect(
      state.fields.byId['681a3228-a410-4f7a-96cd-0d6d9274faf3'].value
    ).toEqual('Loki')
    expect(state.hasChanges).toEqual(true)
  })

  test('Add section', () => {
    const state = reducer(mockCV, addSection(1))
    expect(state.sections.allIds.length).toEqual(4)
    expect(state.sections.nonFixedIds.length).toEqual(3)
    const addedSection = state.sections.byId[state.sections.allIds[3]]
    expect(addedSection.name).toEqual('experience')
    expect(addedSection.fields.length).toEqual(1)
    const addedField = addedSection.fields[0][0][0]
    expect(state.fields.byId[addedField].name).toEqual('job_title')
    expect(state.hasChanges).toEqual(true)
  })

  test('Move section', () => {
    const state = reducer(
      mockCV,
      moveSection('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 2)
    )
    expect(
      state.sections.allIds.indexOf('fe0dfdf-048f-ed65-6db6-cbf45746f8e7')
    ).toEqual(3)
    expect(
      state.sections.nonFixedIds.indexOf('fe0dfdf-048f-ed65-6db6-cbf45746f8e7')
    ).toEqual(2)
    expect(state.hasChanges).toEqual(true)
  })

  test('Add section row', () => {
    const state = reducer(
      mockCV,
      addSectionRow('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 0, true)
    )
    expect(state.sections.allIds.length).toEqual(3)
    expect(
      state.sections.nonFixedIds.indexOf('fe0dfdf-048f-ed65-6db6-cbf45746f8e7')
    ).toEqual(0)
    const sectionFields =
      state.sections.byId['fe0dfdf-048f-ed65-6db6-cbf45746f8e7'].fields
    expect(sectionFields.length).toEqual(2)
    expect(state.fields.allIds.length).toEqual(7)
    expect(state.hasChanges).toEqual(true)
  })

  test('Move section row', () => {
    const afterAddState = reducer(
      mockCV,
      addSectionRow('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 0)
    )
    const state = reducer(
      afterAddState,
      moveSectionRow('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 1, 0)
    )
    expect(state.sections.allIds.length).toEqual(3)
    expect(
      state.sections.nonFixedIds.indexOf('fe0dfdf-048f-ed65-6db6-cbf45746f8e7')
    ).toEqual(0)
    expect(state.hasChanges).toEqual(true)
  })

  test('Delete section row', () => {
    const afterAddState = reducer(
      mockCV,
      addSectionRow('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 0)
    )
    const state = reducer(
      afterAddState,
      deleteSectionRow('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 1)
    )
    expect(state.sections.allIds.length).toEqual(3)
    expect(
      state.sections.nonFixedIds.indexOf('fe0dfdf-048f-ed65-6db6-cbf45746f8e7')
    ).toEqual(0)
    const sectionFields =
      state.sections.byId['fe0dfdf-048f-ed65-6db6-cbf45746f8e7'].fields
    expect(sectionFields.length).toEqual(1)
    expect(state.hasChanges).toEqual(true)
  })
})
