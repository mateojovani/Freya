import { uuid } from 'uuidv4'
import { CV } from '../../schema'
import { sectionTemplates } from './sectionTemplates'

const fieldsWithId = sectionTemplates[0].fields.map((secFlds) =>
  secFlds.map((flds) => flds.map((fld) => ({ ...fld, id: uuid() })))
)

const cv: CV = {
  id: uuid(),
  sections: [
    {
      ...sectionTemplates[0],
      fields: fieldsWithId,
    },
  ],
  toTemplate() {
    return this.sections.reduce((acc, section) => {
      acc[section.name] = section.toTemplate()

      return acc
    }, {})
  },
}

export { cv }
