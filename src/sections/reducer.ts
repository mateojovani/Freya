import produce, { Draft } from 'immer'
import uuid from 'react-uuid'

import { State, SectionsAction, FieldType } from './types'

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

export default produce((draft: Draft<State>, action: SectionsAction) => {
  switch (action.type) {
    case 'LOAD_SECTIONS': {
      draft = action.payload
      break
    }
    case 'SET_FIELD_VALUE': {
      const { name, value } = action.payload
      draft.fields.byId[name].value = value
      break
    }
    case 'SET_CURRENT_SECTION': {
      draft.currentSectionId = action.payload.section
      break
    }
    case 'MOVE_SECTION': {
      const { name, pos } = action.payload
      const draggable = draft.sections.nonFixedIds
      const currentIndex = draggable.indexOf(name)
      const currentSection = draggable[pos]
      draggable[pos] = name
      draggable[currentIndex] = currentSection
      draft.sections.allIds = [...draft.sections.fixedIds, ...draggable]
      break
    }
    case 'ADD_SECTION_ROW': {
      const { name, pos, copy } = action.payload
      const section = draft.sections.byId[name]
      const mirrorRowIdx = pos !== undefined ? pos : section.fields.length - 1
      const sectionFields = section.fields[mirrorRowIdx].fields
      const repeated = {
        name: uuid(),
        fields: sectionFields.map(() => uuid()),
      }

      section.fields.splice(mirrorRowIdx + 1, 0, repeated)
      draft.fields.allIds = draft.fields.allIds.concat(repeated.fields)
      repeated.fields.forEach((field, i) => {
        const mirror = sectionFields[i]
        draft.fields.byId[field] = {
          ...draft.fields.byId[mirror],
          name: field,
          value: copy ? draft.fields.byId[mirror].value : '',
        }
      })
      break
    }
    case 'DELETE_SECTION_ROW': {
      const { name, pos } = action.payload
      const section = draft.sections.byId[name]
      const deletedFields = section.fields.splice(pos, 1)
      deletedFields[0].fields.forEach((field) => {
        delete draft.fields.byId[field]
        draft.fields.allIds.splice(draft.fields.allIds.indexOf(field), 1)
      })
      break
    }
    case 'MOVE_SECTION_ROW': {
      const { name, row, pos } = action.payload
      const section = draft.sections.byId[name]
      const movingRowIdx = section.fields.findIndex(fieldsRow => fieldsRow.name === row)
      const currentRow = { ...section.fields[pos] }
      const movingRow = { ...section.fields[movingRowIdx] }
      section.fields[movingRowIdx] = currentRow
      section.fields[pos] = movingRow
      break
    }
  }
}, sectionsMockNormalised)
