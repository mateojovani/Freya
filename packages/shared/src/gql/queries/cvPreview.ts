import { gql } from 'graphql-request'

const cvPreviewQuery = gql`
  query GET_CV {
    cvPreview {
      url
    }
  }
`

export { cvPreviewQuery }
