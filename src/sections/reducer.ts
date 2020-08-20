import produce, { Draft } from 'immer'
import { uuid } from 'uuidv4'

import { State, SectionsAction, FieldType, Field } from './types'

const sectionsMockNormalised: State = {
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
                name: 'company',
                title: 'Company',
                type: FieldType.Text,
                value: '',
                defaultValue: '',
              },
              {
                name: 'company_web',
                title: 'Company website',
                type: FieldType.Text,
                value: '',
                defaultValue: '',
              },
            ],
            [
              {
                name: 'start_end_date',
                title: 'Start & End Date',
                type: FieldType.DateRange,
                value: [null, null],
                defaultValue: [null, null],
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
                name: 'school',
                title: 'School',
                type: FieldType.Text,
                value: '',
                defaultValue: '',
              },
              {
                name: 'school_web',
                title: 'School website',
                type: FieldType.Text,
                value: '',
                defaultValue: '',
              },
            ],
            [
              {
                name: 'degree',
                title: 'Degree/Major',
                type: FieldType.Text,
                value: '',
                defaultValue: '',
              },
            ],
            [
              {
                name: 'sc_start_end_date',
                title: 'Start & End Date',
                type: FieldType.DateRange,
                value: [null, null],
                defaultValue: [null, null],
              },
            ],
            [
              {
                name: 'sc_desc',
                title: 'Description',
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
    ],
    inUse: ['bio'],
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
    },
    allIds: ['e572e220-41f1-491c-ab39-412f0d3b270c'],
    fixedIds: ['e572e220-41f1-491c-ab39-412f0d3b270c'],
    nonFixedIds: [],
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
    },
    allIds: [
      '681a3228-a410-4f7a-96cd-0d6d9274faf3',
      'bae74c1a-94aa-46a5-8870-60d9552dfaa7',
      'c92befdb-e556-4920-b3a8-39a272d98aff',
      'aa847c1a-2e9b-4e73-9b4a-1ac3499580ee',
      '4903997b-ef2f-48b4-9b6c-95c9655aa389',
      'eb0e58e5-c948-44fc-975a-35fcf5204487',
    ],
  },
}

export default produce((draft: Draft<State>, action: SectionsAction) => {
  switch (action.type) {
    case 'LOAD_SECTIONS': {
      draft = action.payload
      break
    }
    case 'SET_FIELD_VALUE': {
      const { id, value } = action.payload
      draft.fields.byId[id].value = value
      break
    }
    case 'ADD_SECTION': {
      const { templateIndex } = action.payload
      const sectionId = uuid()
      const template = draft.templates.sections[templateIndex]
      draft.templates.inUse.push(template.name)
      draft.sections.byId[sectionId] = {
        ...template,
        fields: template.fields.map((row) => {
          return {
            name: `row_${uuid()}`,
            fields: row.map((fields) =>
              fields.map((field) => {
                const fieldId = uuid()
                draft.fields.byId[fieldId] = { ...field }
                draft.fields.allIds.push(fieldId)
                return fieldId
              })
            ),
          }
        }),
      }
      draft.sections.allIds.push(sectionId)
      template.canMove
        ? draft.sections.nonFixedIds.push(sectionId)
        : draft.sections.fixedIds.push(sectionId)
      break
    }
    case 'MOVE_SECTION': {
      const { id, pos } = action.payload
      const draggable = draft.sections.nonFixedIds
      const currentIndex = draggable.indexOf(id)
      const currentSection = draggable[pos]
      draggable[pos] = id
      draggable[currentIndex] = currentSection
      draft.sections.allIds = [...draft.sections.fixedIds, ...draggable]
      break
    }
    case 'ADD_SECTION_ROW': {
      const { id, pos, copy } = action.payload
      const section = draft.sections.byId[id]
      const mirrorRowIdx = pos !== undefined ? pos : section.fields.length - 1
      const sectionFields = section.fields[mirrorRowIdx].fields
      const repeated = {
        name: `row_${uuid()}`,
        fields: sectionFields.map((row) =>
          row.map((mirrorFieldId) => {
            const fieldId = uuid()
            const mirrorField: Field = draft.fields.byId[mirrorFieldId]
            //@ts-ignore
            draft.fields.byId[fieldId] = {
              ...mirrorField,
              value: copy ? mirrorField.value : mirrorField.defaultValue,
            }
            return fieldId
          })
        ),
      }
      section.fields.splice(mirrorRowIdx + 1, 0, repeated)
      break
    }
    case 'DELETE_SECTION_ROW': {
      const { id, pos } = action.payload
      const section = draft.sections.byId[id]
      const deletedFields = section.fields.splice(pos, 1)
      deletedFields[0].fields.forEach((row) => {
        row.forEach((field) => {
          delete draft.fields.byId[field]
          draft.fields.allIds.splice(draft.fields.allIds.indexOf(field), 1)
        })
      })
      break
    }
    case 'MOVE_SECTION_ROW': {
      const { id, row, pos } = action.payload
      const section = draft.sections.byId[id]
      const movingRowIdx = section.fields.findIndex(
        (fieldsRow) => fieldsRow.name === row
      )
      const currentRow = { ...section.fields[pos] }
      const movingRow = { ...section.fields[movingRowIdx] }
      section.fields[movingRowIdx] = currentRow
      section.fields[pos] = movingRow
      break
    }
  }
}, sectionsMockNormalised)
