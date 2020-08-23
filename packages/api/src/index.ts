import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'

import { connect } from './db'

const app = express()

const server = new ApolloServer({
  typeDefs: gql`
    type CV {
      title: String
      author: String
    }

    type Query {
      cvs: [CV]
    }
  `,
  resolvers: {
    Query: {
      cvs: () => [],
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
    console.log('Could not start server')
  }
})()
