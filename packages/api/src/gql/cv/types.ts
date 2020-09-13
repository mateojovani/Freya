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

  type CVPreview {
    url: String!
  }

  type CV {
    id: ID!
    sections: [Section]!
    preview: CVPreview!
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
    cv(id: ID!): CV!
    sectionTemplates: [Section]!
  }

  type Mutation {
    saveCV(cv: CVInput!): CV
    createCV(template: String): ID
  }
`

export { cvTypes }