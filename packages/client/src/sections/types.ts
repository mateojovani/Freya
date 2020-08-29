import { Action } from 'redux'
import { GQLSection, CV } from 'freya-shared'

export interface CVLoadedAction extends Action {
  type: 'LOAD_CV'
  payload: { cv: CV; sectionTemplates: GQLSection[] }
}

export interface FieldValueSetAction extends Action {
  type: 'SET_FIELD_VALUE'
  payload: { id: string; value: string }
}

export interface AddSectionAction extends Action {
  type: 'ADD_SECTION'
  payload: { templateIndex: number }
}

export interface SectionMovedAction extends Action {
  type: 'MOVE_SECTION'
  payload: { id: string; pos: string }
}

export interface SectionRowAddedAction extends Action {
  type: 'ADD_SECTION_ROW'
  payload: { id: string; pos: number; copy: boolean }
}

export interface SectionRowDeletedAction extends Action {
  type: 'DELETE_SECTION_ROW'
  payload: { id: string; pos: number }
}

export interface SectionRowMovedAction extends Action {
  type: 'MOVE_SECTION_ROW'
  payload: { id: string; rowIdx: number; pos: number }
}

export type SectionsAction =
  | CVLoadedAction
  | FieldValueSetAction
  | AddSectionAction
  | SectionMovedAction
  | SectionRowAddedAction
  | SectionRowDeletedAction
  | SectionRowMovedAction
