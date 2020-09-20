import fs from 'fs'
import util from 'util'
import path from 'path'
import Handlebars from 'handlebars'
import puppeteer from 'puppeteer'
import {
  sectionTemplates,
  cv,
  CV,
  GQLSection,
  CVPreview,
  cvPreview,
} from 'freya-shared'
import { fromBuffer } from 'pdf2pic'

const readFile = util.promisify(fs.readFile)

const getCVPreview = async (): Promise<CVPreview> => {
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
  const template = compiledTemplate({ style, cv: mockCV.toTemplate() })

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

let mockCV = { ...cv }

const cvResolvers = {
  Query: {
    cv: async (_, { id }: { id: string }): Promise<CV> => {
      return { ...mockCV, preview: await getCVPreview() }
    },
    sectionTemplates: (): GQLSection[] => sectionTemplates,
  },
  Mutation: {
    saveCV: async (_, { cv }: { cv: CV }): Promise<CV> => {
      const getTemplate = (name: string) =>
        sectionTemplates.find((t) => t.name === name)

      mockCV = {
        ...mockCV,
        preview: null,
        sections: cv.sections.map((section, i) => {
          return {
            ...mockCV.sections[i],
            ...section,
            toTemplate: getTemplate(section.name).toTemplate.bind(section),
          }
        }),
      }

      mockCV.preview = await getCVPreview()

      return mockCV
    },
    createCV: async (
      _,
      { template }: { template?: string }
    ): Promise<string> => {
      mockCV = { ...cv }
      return mockCV.id
    },
  },
}

export { cvResolvers }
