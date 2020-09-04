import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import util from 'util'
import path from 'path'
import Handlebars from 'handlebars'
import puppeteer from 'puppeteer'
import { sectionTemplates, cv, CV, GQLSection, CVPreview } from 'freya-shared'

import { connect } from './db'

const readFile = util.promisify(fs.readFile)
const app = express()
app.use(cors())

const getCVPreview = async (): Promise<CVPreview> => {
  const templatePath = path.resolve(
    __dirname,
    '../../templates/luna/template.hbs'
  )
  const templateStylePath = path.resolve(
    __dirname,
    '../../templates/luna/template.css'
  )
  const [html, style] = await Promise.all([
    readFile(templatePath, 'utf8'),
    readFile(templateStylePath, 'utf8'),
  ])
  const compiledTemplate = Handlebars.compile(html)
  const template = compiledTemplate({ style, cv: mockCV.toTemplate() })

  const browser = await puppeteer.launch()
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
const server = new ApolloServer({
  typeDefs: gql`
    type Field {
      id: String
      name: String!
      title: String!
      type: String!
      value: String!
      defaultValue: String!
    }

    type Section {
      id: ID!
      name: String!
      title: String!
      canMove: Boolean!
      canRepeat: Boolean!
      addLabel: String!
      fields: [[[Field]]]
    }

    type CV {
      id: ID!
      sections: [Section]!
    }

    type CVPreview {
      url: String!
    }

    type Query {
      cv: CV!
      sectionTemplates: [Section]!
      cvPreview: CVPreview!
    }

    input FieldInput {
      id: String
      name: String!
      title: String!
      type: String!
      value: String!
      defaultValue: String!
    }

    input SectionInput {
      id: ID!
      name: String!
      title: String!
      canMove: Boolean!
      canRepeat: Boolean!
      addLabel: String!
      fields: [[[FieldInput]]]
    }

    input CVInput {
      id: String!
      sections: [SectionInput]!
    }

    type Mutation {
      saveCV(cv: CVInput!): CVPreview
    }
  `,
  resolvers: {
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
  },
})

server.applyMiddleware({ app })
;(async () => {
  try {
    await connect()
    app.listen({ port: process.env.PORT || 4000 }, () =>
      console.log(`🚀 Server ready at port: ${process.env.PORT}`)
    )
  } catch (e) {
    console.log('Could not start server', e)
  }
})()
