import { Action } from 'redux'
import { Node } from 'slate'

interface SectionFields {
  name: string
  fields: string[][]
}

export interface Section {
  name: string
  title: string
  canMove: boolean
  canRepeat: boolean
  addLabel: string
  fields: SectionFields[]
}

type FieldsRow = (Field | RichTextField)[][]

export interface TemplateSection {
  name: string
  title: string
  canMove: boolean
  canRepeat: boolean
  addLabel: string
  fields: FieldsRow[]
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
  type:
    | FieldType.Text
    | FieldType.Email
    | FieldType.Number
    | FieldType.Tel
    | FieldType.Date
    | FieldType.File
  value: string
  defaultValue: string
}

export interface RichTextField {
  name: string
  title: string
  type: FieldType.RichText
  value: Node[]
  defaultValue: Node[]
}

export interface State {
  templates: {
    sections: TemplateSection[]
    inUse: string[]
  }
  sections: {
    byId: { [key: string]: Section }
    fixedIds: string[]
    nonFixedIds: string[]
    allIds: string[]
  }
  fields: {
    byId: { [key: string]: Field | RichTextField }
    allIds: string[]
  }
}

export interface SectionsLoadedAction extends Action {
  type: 'LOAD_SECTIONS'
  payload: State
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
  payload: { id: string; row: string; pos: number }
}

export type SectionsAction =
  | SectionsLoadedAction
  | FieldValueSetAction
  | AddSectionAction
  | SectionMovedAction
  | SectionRowAddedAction
  | SectionRowDeletedAction
  | SectionRowMovedAction
