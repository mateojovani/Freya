const moment = require('moment')
import { GQLSection, CV, FieldType, renderEditor } from 'freya-shared'

function dateRangeParser(field) {
  const value = JSON.parse(field.value)
  if (!value) {
    return []
  }

  const [start, end] = value
  const range = []
  if (start) {
    range.push(moment(start).format('MMMM YYYY'))
  } else {
    return range
  }
  if (end) {
    range.push(moment(end).format('MMMM YYYY'))
  } else {
    range.push('Present')
  }

  return range
}

function seedSectionTemplates(): GQLSection[] {
  return [
    {
      name: 'bio',
      title: 'Personal information',
      canMove: false,
      canRepeat: false,
      addLabel: 'Add information',
      fields: [
        [
          [
            {
              name: 'firstName',
              title: 'First name',
              type: FieldType.Text,
              value: JSON.stringify(''),
              defaultValue: JSON.stringify(''),
            },
            {
              name: 'lastName',
              title: 'Last name',
              type: FieldType.Text,
              value: JSON.stringify(''),
              defaultValue: JSON.stringify(''),
            },
          ],
          [
            {
              name: 'title',
              title: 'Your Title',
              type: FieldType.Text,
              value: JSON.stringify(''),
              defaultValue: JSON.stringify(''),
            },
          ],
          [
            {
              name: 'email',
              title: 'Email',
              type: FieldType.Email,
              value: JSON.stringify(''),
              defaultValue: JSON.stringify(''),
            },
            {
              name: 'phone',
              title: 'Phone',
              type: FieldType.Tel,
              value: JSON.stringify(''),
              defaultValue: JSON.stringify(''),
            },
          ],
          [
            {
              name: 'summary',
              title: 'Short summary',
              type: FieldType.RichText,
              value: JSON.stringify([
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
              ]),
              defaultValue: JSON.stringify([
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
              ]),
            },
          ],
        ],
      ],
      toTemplate() {
        return this.fields[0]
          .flatMap((row) => row.flatMap((fields) => fields))
          .reduce((acc, field) => {
            if (field.type === 'richtext') {
              const editor = renderEditor(JSON.parse(field.value))
              acc[field.name] = editor
              return acc
            }
            acc[field.name] = JSON.parse(field.value)
            return acc
          }, {})
      },
    },
    {
      name: 'experience',
      title: 'Work experience',
      canMove: true,
      canRepeat: true,
      addLabel: 'Add job',
      fields: [
        [
          [
            {
              name: 'job_title',
              title: 'Job title',
              type: FieldType.Text,
              value: JSON.stringify(''),
              defaultValue: JSON.stringify(''),
            },
          ],
          [
            {
              name: 'company',
              title: 'Company',
              type: FieldType.Text,
              value: JSON.stringify(''),
              defaultValue: JSON.stringify(''),
            },
            {
              name: 'company_web',
              title: 'Company website',
              type: FieldType.Text,
              value: JSON.stringify(''),
              defaultValue: JSON.stringify(''),
            },
          ],
          [
            {
              name: 'start_end_date',
              title: 'Start & End Date',
              type: FieldType.DateRange,
              value: JSON.stringify([null, null]),
              defaultValue: JSON.stringify([null, null]),
            },
          ],
          [
            {
              name: 'job_desc',
              title: 'Job description',
              type: FieldType.RichText,
              value: JSON.stringify([
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
              ]),
              defaultValue: JSON.stringify([
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
              ]),
            },
          ],
        ],
      ],
      toTemplate() {
        return this.fields.map((subSection) =>
          subSection
            .flatMap((row) => row.flatMap((fields) => fields))
            .reduce((acc, field) => {
              switch (field.type) {
                case 'richtext': {
                  const editor = renderEditor(JSON.parse(field.value))
                  acc[field.name] = editor
                  break
                }
                case 'date-range': {
                  acc[field.name] = dateRangeParser(field)
                  break
                }
                default: {
                  acc[field.name] = JSON.parse(field.value)
                  break
                }
              }
              return acc
            }, {})
        )
      },
    },
    {
      name: 'education',
      title: 'Education',
      canMove: true,
      canRepeat: true,
      addLabel: 'Add education',
      fields: [
        [
          [
            {
              name: 'school',
              title: 'School',
              type: FieldType.Text,
              value: JSON.stringify(''),
              defaultValue: JSON.stringify(''),
            },
            {
              name: 'school_web',
              title: 'School website',
              type: FieldType.Text,
              value: JSON.stringify(''),
              defaultValue: JSON.stringify(''),
            },
          ],
          [
            {
              name: 'degree',
              title: 'Degree/Major',
              type: FieldType.Text,
              value: JSON.stringify(''),
              defaultValue: JSON.stringify(''),
            },
          ],
          [
            {
              name: 'sc_start_end_date',
              title: 'Start & End Date',
              type: FieldType.DateRange,
              value: JSON.stringify([null, null]),
              defaultValue: JSON.stringify([null, null]),
            },
          ],
          [
            {
              name: 'sc_desc',
              title: 'Description',
              type: FieldType.RichText,
              value: JSON.stringify([
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
              ]),
              defaultValue: JSON.stringify([
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
              ]),
            },
          ],
        ],
      ],
      toTemplate() {
        return this.fields.map((subSection) =>
          subSection
            .flatMap((row) => row.flatMap((fields) => fields))
            .reduce((acc, field) => {
              switch (field.type) {
                case 'richtext': {
                  const editor = renderEditor(JSON.parse(field.value))
                  acc[field.name] = editor
                  break
                }
                case 'date-range': {
                  acc[field.name] = dateRangeParser(field)
                  break
                }
                default: {
                  acc[field.name] = JSON.parse(field.value)
                  break
                }
              }
              return acc
            }, {})
        )
      },
    },
  ]
}

function seedCV(): CV {
  return {
    sections: [seedSectionTemplates()[0]],
    preview: {
      urls: [
        {
          base64: '',
        },
      ],
    },
    toTemplate() {
      return this.sections.reduce((acc, section) => {
        acc[section.name] = section.toTemplate()

        return acc
      }, {})
    },
  }
}

export { seedSectionTemplates, seedCV }
