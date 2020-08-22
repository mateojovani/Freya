import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'

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

app.listen({ port: process.env.API_PORT || 9000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
