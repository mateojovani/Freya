import { uuid } from 'uuidv4'
import { FieldType, GQLSection } from 'freya-shared'

const sectionTemplates: GQLSection[] = [
  {
    id: uuid(),
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
  },
  {
    id: uuid(),
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
  },
  {
    id: uuid(),
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
  },
]

export { sectionTemplates }
