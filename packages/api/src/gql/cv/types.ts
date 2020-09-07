import { gql } from 'apollo-server-express'

const cvTypes = gql`
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

  type Query {
    cv: CV!
    sectionTemplates: [Section]!
    cvPreview: CVPreview!
  }

  type Mutation {
    saveCV(cv: CVInput!): CVPreview
  }
`

export { cvTypes }
