import fs from 'fs'
import util from 'util'
import path from 'path'
import Handlebars from 'handlebars'
import puppeteer from 'puppeteer'
import { sectionTemplates, cv, CV, GQLSection, CVPreview } from 'freya-shared'

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

  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setContent(template)
  // await page.pdf({ format: 'A4' })
  const image = await page.screenshot({
    encoding: 'base64',
    fullPage: true,
  })
  await browser.close()

  return { url: image }
}

let mockCV = cv

const cvResolvers = {
  Query: {
    cv: (): CV => mockCV,
    sectionTemplates: (): GQLSection[] => sectionTemplates,
    cvPreview: getCVPreview,
  },
  Mutation: {
    saveCV: async (_, { cv }: { cv: CV }): Promise<CVPreview> => {
      mockCV = {
        ...mockCV,
        sections: cv.sections.map((section, i) => {
          return { ...mockCV.sections[i], ...section }
        }),
      }

      return getCVPreview()
    },
  },
}

export { cvResolvers }
