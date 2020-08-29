import { gql } from 'graphql-request'

const cvQuery = gql`
  query GET_CV {
    cv {
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

export { cvQuery }
