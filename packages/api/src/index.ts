import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import { CV, GQLSection } from 'freya-shared/schema'
import { sectionTemplates, cv } from 'freya-shared/mocks'

import { connect } from './db'

const app = express()

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

    type Query {
      cv: CV!
      sectionTemplates: [Section]!
    }
  `,
  resolvers: {
    Query: {
      cv: (): CV => cv,
      sectionTemplates: (): GQLSection[] => sectionTemplates,
    },
  },
})

server.applyMiddleware({ app })
;(async () => {
  try {
    await connect()
    app.listen({ port: process.env.API_PORT || 4000 }, () =>
      console.log(`🚀 Server ready at port: ${process.env.API_PORT}`)
    )
  } catch (e) {
    console.log('Could not start server', e)
  }
})()
