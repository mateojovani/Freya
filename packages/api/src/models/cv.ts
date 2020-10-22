import { Schema, model } from 'mongoose'
import { CV } from 'freya-shared'

const FieldSchema = new Schema({
  name: String,
  title: String,
  type: String,
  value: String,
  defaultValue: String,
})

const SectionSchema = new Schema({
  name: String,
  title: String,
  canMove: Boolean,
  canRepeat: Boolean,
  addLabel: String,
  fields: [[[FieldSchema]]],
})

const PreviewSchema = new Schema({
  urls: [
    {
      base64: String,
    },
  ],
})

const CvSchema = new Schema<CV>(
  {
    sections: [SectionSchema],
    preview: PreviewSchema,
  },
  {
    timestamps: true,
  }
)

const CV = model('CV', CvSchema)
const SectionTemplate = model('SectionTemplate', SectionSchema)

export { CV, SectionTemplate }
