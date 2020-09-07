import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'

import { connect } from './db'
import { combinedTypes } from './gql/combinedTypes'
import { combinedResovers } from './gql/combinedResolvers'

const app = express()
app.use(cors())

const server = new ApolloServer({
  typeDefs: combinedTypes,
  resolvers: combinedResovers,
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
