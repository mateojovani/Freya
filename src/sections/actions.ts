import { ActionCreator } from 'redux'

import {
  State,
  SectionsLoadedAction,
  FieldValueSetAction,
  CurrentSectionSetAction,
  SectionMovedAction,
  SectionRowAddedAction,
  SectionRowDeletedAction,
  SectionRowMovedAction
} from './types'

export const loadSections: ActionCreator<SectionsLoadedAction> = (
  sections: State
) => ({
  type: 'LOAD_SECTIONS',
  payload: sections,
})

export const setFieldValue: ActionCreator<FieldValueSetAction> = (
  name: string,
  value: string
) => ({
  type: 'SET_FIELD_VALUE',
  payload: { name, value },
})

export const setCurrentSection: ActionCreator<CurrentSectionSetAction> = (
  section: string
) => ({
  type: 'SET_CURRENT_SECTION',
  payload: { section },
})

export const moveSection: ActionCreator<SectionMovedAction> = (
  name: string,
  pos: string
) => ({
  type: 'MOVE_SECTION',
  payload: { name, pos },
})

export const addSectionRow: ActionCreator<SectionRowAddedAction> = (
  name: string, pos?: number, copy?: boolean
) => ({
  type: 'ADD_SECTION_ROW',
  payload: { name, pos, copy },
})

export const deleteSectionRow: ActionCreator<SectionRowDeletedAction> = (
  name: string, pos: number
) => ({
  type: 'DELETE_SECTION_ROW',
  payload: { name, pos },
})

export const moveSectionRow: ActionCreator<SectionRowMovedAction> = (
  name: string, row: string, pos: number
) => ({
  type: 'MOVE_SECTION_ROW',
  payload: { name, row, pos },
})
