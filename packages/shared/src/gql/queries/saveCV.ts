import { gql } from 'graphql-request'

const saveCVMutation = gql`
  mutation SAVE_CV($cv: CVInput!) {
    saveCV(cv: $cv) {
      url
    }
  }
`

export { saveCVMutation }
