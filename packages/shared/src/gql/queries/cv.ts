import { gql } from 'graphql-request'

const cvQuery = gql`
  query GET_CV($_id: ID!) {
    cv(_id: $_id) {
      _id
      preview {
        urls {
          base64
        }
      }
      sections {
        _id
        name
        title
        canMove
        canRepeat
        addLabel
        fields {
          _id
          name
          title
          type
          value
          defaultValue
        }
      }
    }
    sectionTemplates {
      _id
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
      preview {
        urls {
          base64
        }
      }
    }
  }
`

const createCVMutation = gql`
  mutation CREATE_CV($template: String) {
    createCV(template: $template)
  }
`

export { cvQuery, saveCVMutation, createCVMutation }
