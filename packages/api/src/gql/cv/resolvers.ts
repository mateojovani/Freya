import fs from 'fs'
import util from 'util'
import path from 'path'
import Handlebars from 'handlebars'
import puppeteer from 'puppeteer'
import { CV, GQLSection, CVPreview, cvPreview } from 'freya-shared'
import { fromBuffer } from 'pdf2pic'
import { Document, Model } from 'mongoose'
import { seedCV, seedSectionTemplates } from '../../seed'

const readFile = util.promisify(fs.readFile)

Handlebars.registerHelper('isLast', function (index, array, options) {
  if (index === array.length - 1) {
    return options.fn(this)
  }
  return options.inverse(this)
})

const getCVPreview = async (cv: CV): Promise<CVPreview> => {
  const templatePath = path.resolve(
    __dirname,
    '../../../../templates/luna/template.hbs'
  )
  const templateStylePath = path.resolve(
    __dirname,
    '../../../../templates/luna/template.css'
  )
  const [html, style] = await Promise.all([
    readFile(templatePath, 'utf8'),
    readFile(templateStylePath, 'utf8'),
  ])
  const compiledTemplate = Handlebars.compile(html)
  const template = compiledTemplate({ style, cv: cv.toTemplate() })

  try {
    const browser = await puppeteer.launch({
      ignoreDefaultArgs: ['--disable-extensions'],
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--proxy-server="direct://"',
        '--proxy-bypass-list=*',
      ],
    })
    const page = await browser.newPage()
    await page.setContent(template)
    const pdf = await page.pdf({ format: 'A4' })
    const images = (await fromBuffer(pdf, {
      quality: 60,
      density: 250,
      width: 1024,
      height: 1268,
    }).bulk(-1, true)) as { base64: string }[]
    await browser.close()

    return { urls: images }
  } catch (error) {
    console.error(error)
    return cvPreview
  }
}

const seededSectionTemplates = seedSectionTemplates()
const seededCV = seedCV()

type CvResolver = (
  _,
  q: { _id: string },
  ctx: { models: { CV: Model<Document> } }
) => Promise<any>

const getCV: CvResolver = async (_, { _id }, { models }) => {
  return models.CV.findById(_id)
}

type SaveCvResolver = (
  _,
  q: { cv: CV },
  ctx: { models: { CV: Model<Document> } }
) => Promise<any>

const saveCV: SaveCvResolver = async (_, { cv }, { models }) => {
  const getTemplate = (name: string) =>
    seededSectionTemplates.find((t) => t.name === name)

  const updatedCV = {
    ...cv,
    sections: cv.sections.map((section, i) => {
      return {
        ...section,
        toTemplate: getTemplate(section.name).toTemplate.bind(section),
      }
    }),
  }
  ;(updatedCV.toTemplate = seededCV.toTemplate.bind(updatedCV)),
    (updatedCV.preview = await getCVPreview(updatedCV))
  await models.CV.findByIdAndUpdate(cv._id, updatedCV)

  return updatedCV
}

type CreateCvResolver = (
  _,
  q: { template?: string },
  ctx: { models: { CV: Model<Document> } }
) => Promise<string>

const createCV: CreateCvResolver = async (
  _,
  __,
  { models }
): Promise<string> => {
  const cvTemplate = { ...seededCV, preview: await getCVPreview(seededCV) }
  const { _id } = await new models.CV(cvTemplate).save()

  return _id.toHexString()
}

const cvResolvers = {
  Query: {
    cv: getCV,
    sectionTemplates: (): GQLSection[] => seededSectionTemplates,
  },
  Mutation: {
    saveCV,
    createCV,
  },
}

export { cvResolvers }
