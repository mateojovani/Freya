import { Action } from 'redux'

interface SectionFields {
  name: string
  fields: string[]
}

export interface Section {
  name: string
  title: string
  canMove: boolean
  canRepeat: boolean
  addLabel: string
  fields: SectionFields[]
}

export enum FieldType {
  Text = 'text',
  RichText = 'richtext',
  Email = 'email',
  Number = 'number',
  Tel = 'tel',
  Date = 'date',
  File = 'file',
}

export interface Field {
  name: string
  title: string
  type: FieldType
  value: string
}

export interface State {
  sections: {
    byId: { [key: string]: Section }
    fixedIds: string[]
    nonFixedIds: string[]
    allIds: string[]
  }
  fields: {
    byId: { [key: string]: Field }
    allIds: string[]
  }
  currentSectionId: string
}

export interface SectionsLoadedAction extends Action {
  type: 'LOAD_SECTIONS'
  payload: State
}

export interface FieldValueSetAction extends Action {
  type: 'SET_FIELD_VALUE'
  payload: { name: string; value: string }
}

export interface CurrentSectionSetAction extends Action {
  type: 'SET_CURRENT_SECTION'
  payload: { section: string }
}

export interface SectionMovedAction extends Action {
  type: 'MOVE_SECTION'
  payload: { name: string; pos: string }
}

export interface SectionRowAddedAction extends Action {
  type: 'ADD_SECTION_ROW'
  payload: { name: string; pos: number; copy: boolean }
}

export interface SectionRowDeletedAction extends Action {
  type: 'DELETE_SECTION_ROW'
  payload: { name: string; pos: number }
}

export interface SectionRowMovedAction extends Action {
  type: 'MOVE_SECTION_ROW'
  payload: { name: string; row: string; pos: number }
}

export type SectionsAction =
  | SectionsLoadedAction
  | FieldValueSetAction
  | CurrentSectionSetAction
  | SectionMovedAction
  | SectionRowAddedAction
  | SectionRowDeletedAction
  | SectionRowMovedAction
