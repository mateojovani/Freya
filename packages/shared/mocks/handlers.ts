import { graphql } from 'msw'

import { sectionTemplates } from './sectionTemplates'
import { cv } from './cv'

const handlers = [
  graphql.query('GET_CV', (_, res, ctx) => {
    return res(
      ctx.data({
        cv,
        sectionTemplates
      })
    )
  })
]

export { handlers }
