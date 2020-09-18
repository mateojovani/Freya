import { Node } from 'slate'
import { Moment } from 'moment'

enum FieldType {
  Text = 'text',
  RichText = 'richtext',
  Email = 'email',
  Number = 'number',
  Tel = 'tel',
  Date = 'date',
  DateRange = 'date-range',
  File = 'file',
}

interface BasicField<T> {
  id?: string
  name: string
  title: string
  type:
    | FieldType.Text
    | FieldType.Email
    | FieldType.Number
    | FieldType.Tel
    | FieldType.Date
    | FieldType.File
  value: T
  defaultValue: T
}

interface RichTextField<T> {
  id?: string
  name: string
  title: string
  type: FieldType.RichText
  value: T
  defaultValue: T
}

interface DateRangeField<T> {
  id?: string
  name: string
  title: string
  type: FieldType.DateRange
  value: T
  defaultValue: T
}

type UnParsedField =
  | BasicField<string>
  | RichTextField<string>
  | DateRangeField<string>

type Field =
  | BasicField<string>
  | RichTextField<Node[]>
  | DateRangeField<[Moment, Moment]>

interface GenericSection<T> {
  id: string
  name: string
  title: string
  canMove: boolean
  canRepeat: boolean
  addLabel: string
  fields: T[][][]
  toTemplate?: () => any
}

type Section = GenericSection<Field>

type GQLSection = GenericSection<UnParsedField>

type CVPreview = { urls: { base64: string }[] }

interface CV {
  id: string
  sections: GQLSection[]
  preview: CVPreview
  toTemplate?: () => any
}

export { CV, Section, FieldType, GQLSection, Field, CVPreview }
