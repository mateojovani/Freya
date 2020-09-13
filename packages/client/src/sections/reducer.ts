import moment = require('moment')
import produce, { Draft } from 'immer'
import { uuid } from 'uuidv4'
import { Field, CV, Section, GQLSection, FieldType } from 'freya-shared'

import { SectionsAction } from './types'

export interface NormalisedSection {
  name: string
  title: string
  canMove: boolean
  canRepeat: boolean
  addLabel: string
  fields: string[][][]
}

export interface State {
  templates: {
    sections: Section[]
    inUse: string[]
  }
  sections: {
    byId: { [key: string]: NormalisedSection }
    fixedIds: string[]
    nonFixedIds: string[]
    allIds: string[]
  }
  fields: {
    byId: { [key: string]: Field }
    allIds: string[]
  }
  cvId: string
  hasChanges: boolean
  loading: boolean
}

const normalize = (cv: CV, sectionTemplates: GQLSection[]): State => {
  const sections = {
    byId: {},
    fixedIds: [],
    nonFixedIds: [],
    allIds: [],
  }

  const fields = {
    byId: {},
    allIds: [],
  }

  const sectionsAndFields = cv.sections.reduce(
    ({ sections, fields }, section) => {
      sections.byId[section.id] = {
        ...section,
        fields: section.fields.map((sectionFields) =>
          sectionFields.map((flds) =>
            flds.map((fld) => {
              fields.allIds.push(fld.id)
              fields.byId[fld.id] = {
                ...fld,
                value: JSON.parse(fld.value),
                defaultValue: JSON.parse(fld.defaultValue),
              }
              return fld.id
            })
          )
        ),
      }
      if (section.canMove) {
        sections.nonFixedIds.push(section.id)
      } else {
        sections.fixedIds.push(section.id)
      }
      sections.allIds.push(section.id)
      return { sections, fields }
    },
    { sections, fields }
  )

  return {
    ...sectionsAndFields,
    templates: {
      sections: sectionTemplates.map((section) => ({
        ...section,
        fields: section.fields.map((secFlds) =>
          secFlds.map((flds) =>
            flds.map((fld) => ({
              ...fld,
              value: JSON.parse(fld.value),
              defaultValue: JSON.parse(fld.defaultValue),
            }))
          )
        ),
      })),
      inUse: sectionsAndFields.sections.allIds,
    },
    cvId: cv.id,
    hasChanges: false,
    loading: true,
  }
}

export const denormalize = (state: State): CV => {
  const getSection = (id: string): GQLSection => {
    const section = state.sections.byId[id]

    return {
      ...section,
      id,
      fields: section.fields.map((subSection) =>
        subSection.map((row) =>
          row.map((fieldId) => {
            const field = state.fields.byId[fieldId]
            return {
              ...field,
              id: fieldId,
              value: JSON.stringify(field.value),
              defaultValue: JSON.stringify(field.defaultValue),
            }
          })
        )
      ),
    }
  }

  return {
    id: state.cvId,
    sections: [
      ...state.sections.fixedIds.map(getSection),
      ...state.sections.nonFixedIds.map(getSection),
    ],
  }
}

export default produce(
  (draft: Draft<State>, action: SectionsAction) => {
    switch (action.type) {
      case 'LOAD_CV': {
        const { cv, sectionTemplates } = action.payload
        const { sections, fields, templates, cvId } = normalize(
          cv,
          sectionTemplates
        )
        draft.sections = sections
        draft.fields = fields
        draft.templates = templates
        draft.cvId = cvId
        draft.hasChanges = false
        draft.loading = false
        break
      }
      case 'SAVE_CV': {
        draft.hasChanges = false
        break
      }
      case 'SET_FIELD_VALUE': {
        const { id, value } = action.payload
        draft.fields.byId[id].value = value
        draft.hasChanges = true
        break
      }
      case 'ADD_SECTION': {
        const { templateIndex } = action.payload
        const sectionId = uuid()
        const template = draft.templates.sections[templateIndex]
        draft.templates.inUse.push(template.id)
        draft.sections.byId[sectionId] = {
          ...template,
          fields: template.fields.map((row) =>
            row.map((fields) =>
              fields.map((field) => {
                const fieldId = uuid()
                draft.fields.byId[fieldId] = {
                  ...field,
                  id: fieldId,
                }
                draft.fields.allIds.push(fieldId)
                return fieldId
              })
            )
          ),
        }
        draft.sections.allIds.push(sectionId)
        template.canMove
          ? draft.sections.nonFixedIds.push(sectionId)
          : draft.sections.fixedIds.push(sectionId)
        draft.hasChanges = true
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
        draft.hasChanges = true
        break
      }
      case 'ADD_SECTION_ROW': {
        const { id, pos, copy } = action.payload
        const section = draft.sections.byId[id]
        const mirrorRowIdx = pos !== undefined ? pos : section.fields.length - 1
        const sectionFields = section.fields[mirrorRowIdx]
        const repeated = sectionFields.map((row) =>
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
        )

        section.fields.splice(mirrorRowIdx + 1, 0, repeated)
        draft.hasChanges = true
        break
      }
      case 'DELETE_SECTION_ROW': {
        const { id, pos } = action.payload
        const section = draft.sections.byId[id]
        const deletedFields = section.fields.splice(pos, 1)
        deletedFields[0].forEach((row) => {
          row.forEach((field) => {
            delete draft.fields.byId[field]
            draft.fields.allIds.splice(draft.fields.allIds.indexOf(field), 1)
          })
        })
        draft.hasChanges = true
        break
      }
      case 'MOVE_SECTION_ROW': {
        const { id, rowIdx, pos } = action.payload
        const section = draft.sections.byId[id]
        const currentRow = section.fields[pos]
        const movingRow = section.fields[rowIdx]
        section.fields[rowIdx] = currentRow
        section.fields[pos] = movingRow
        draft.hasChanges = true
        break
      }
    }
  },
  {
    templates: {},
    fields: {},
    sections: {},
    cvId: null,
    hasChanges: false,
    loading: true,
  }
)
