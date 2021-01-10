import { Types } from 'mongoose'
import { CV, CVPreview } from '../../schema'
import { sectionTemplates } from './sectionTemplates'

const fieldsWithId = sectionTemplates[0].fields.map((secFlds) =>
  secFlds.map((flds) =>
    flds.map((fld) => ({ ...fld, _id: Types.ObjectId().toHexString() }))
  )
)

const cvPreview: CVPreview = {
  urls: [
    {
      base64:
        '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',
    },
  ],
}

const cv: CV = {
  _id: Types.ObjectId().toHexString(),
  sections: [
    {
      ...sectionTemplates[0],
      fields: fieldsWithId,
    },
  ],
  preview: cvPreview,
  toTemplate() {
    return this.sections.reduce((acc, section) => {
      acc[section.name] = section.toTemplate()

      return acc
    }, {})
  },
}

const cvs: Partial<CV>[] = [
  {
    _id: Types.ObjectId().toHexString(),
    preview: cvPreview,
  },
]

export { cvPreview, cv, cvs }
