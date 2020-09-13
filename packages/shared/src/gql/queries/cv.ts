import { gql } from 'graphql-request'

const cvQuery = gql`
  query GET_CV($id: ID!) {
    cv(id: $id) {
      id
      sections {
        id
        name
        title
        canMove
        canRepeat
        addLabel
        fields {
          id
          name
          title
          type
          value
          defaultValue
        }
      }
    }
    sectionTemplates {
      id
      name
      title
      canMove
      canRepeat
      addLabel
      fields {
        name
        title
        type
        value
        defaultValue
      }
    }
  }
`

const saveCVMutation = gql`
  mutation SAVE_CV($cv: CVInput!) {
    saveCV(cv: $cv) {
      url
    }
  }
`

const createCVMutation = gql`
  mutation CREATE_CV($template: String) {
    createCV(template: $template)
  }
`

export { cvQuery, saveCVMutation, createCVMutation }
