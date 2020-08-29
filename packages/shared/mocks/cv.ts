import { uuid } from 'uuidv4'
import { CV } from 'freya-shared'
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
}

export { cv }
