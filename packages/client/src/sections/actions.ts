import { ActionCreator } from 'redux'

import {
  CVLoadedAction,
  FieldValueSetAction,
  AddSectionAction,
  SectionMovedAction,
  SectionRowAddedAction,
  SectionRowDeletedAction,
  SectionRowMovedAction,
  CVSavedAction,
} from './types'
import { CV, GQLSection } from 'freya-shared'

export const loadCV: ActionCreator<CVLoadedAction> = ({
  cv,
  sectionTemplates,
}: {
  cv: CV
  sectionTemplates: GQLSection[]
}) => ({
  type: 'LOAD_CV',
  payload: {
    cv,
    sectionTemplates,
  },
})

export const saveCV: ActionCreator<CVSavedAction> = ({ cv }: { cv: CV }) => ({
  type: 'SAVE_CV',
  payload: {
    cv,
  },
})

export const setFieldValue: ActionCreator<FieldValueSetAction> = (
  id: string,
  value: string
) => ({
  type: 'SET_FIELD_VALUE',
  payload: { id, value },
})

export const addSection: ActionCreator<AddSectionAction> = (
  templateIndex: number
) => ({
  type: 'ADD_SECTION',
  payload: { templateIndex },
})

export const moveSection: ActionCreator<SectionMovedAction> = (
  id: string,
  pos: string
) => ({
  type: 'MOVE_SECTION',
  payload: { id, pos },
})

export const addSectionRow: ActionCreator<SectionRowAddedAction> = (
  id: string,
  pos?: number,
  copy?: boolean
) => ({
  type: 'ADD_SECTION_ROW',
  payload: { id, pos, copy },
})

export const deleteSectionRow: ActionCreator<SectionRowDeletedAction> = (
  id: string,
  pos: number
) => ({
  type: 'DELETE_SECTION_ROW',
  payload: { id, pos },
})

export const moveSectionRow: ActionCreator<SectionRowMovedAction> = (
  id: string,
  rowIdx: number,
  pos: number
) => ({
  type: 'MOVE_SECTION_ROW',
  payload: { id, rowIdx, pos },
})
