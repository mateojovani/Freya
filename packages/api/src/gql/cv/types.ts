import { gql } from 'apollo-server-express'

const cvTypes = gql`
  type Field {
    _id: ID
    name: String!
    title: String!
    type: String!
    value: String!
    defaultValue: String!
  }

  type Section {
    _id: ID
    name: String!
    title: String!
    canMove: Boolean!
    canRepeat: Boolean!
    addLabel: String!
    fields: [[[Field]]]
  }

  type Image {
    base64: String!
  }

  type CVPreview {
    urls: [Image]!
  }

  type CV {
    _id: ID!
    sections: [Section]!
    preview: CVPreview!
  }

  input FieldInput {
    _id: String
    name: String!
    title: String!
    type: String!
    value: String!
    defaultValue: String!
  }

  input SectionInput {
    _id: ID!
    name: String!
    title: String!
    canMove: Boolean!
    canRepeat: Boolean!
    addLabel: String!
    fields: [[[FieldInput]]]
  }

  input CVInput {
    _id: String!
    sections: [SectionInput]!
  }

  type Query {
    cv(_id: ID!): CV!
    sectionTemplates: [Section]!
  }

  type Mutation {
    saveCV(cv: CVInput!): CV
    createCV(template: String): ID
  }
`

export { cvTypes }
