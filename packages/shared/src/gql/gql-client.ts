import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(process.env.GQL_API)

export { client }
