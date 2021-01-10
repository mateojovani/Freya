import { gql } from 'graphql-request'

const cvQuery = gql`
  query GET_CV($_id: ID!) {
    cv(_id: $_id) {
      _id
      userId
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

const cvsQuery = gql`
  query GET_CVS {
    cvs {
      _id
      preview {
        urls {
          base64
        }
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

const saveCVForAccountMutation = gql`
  mutation SAVE_CV_ACCOUNT($id: String!) {
    saveCVForAccount(id: $id)
  }
`

const createCVMutation = gql`
  mutation CREATE_CV($input: CreateCVInput) {
    createCV(input: $input)
  }
`

export {
  cvQuery,
  cvsQuery,
  saveCVMutation,
  createCVMutation,
  saveCVForAccountMutation,
}
