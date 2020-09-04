import { graphql } from 'msw'

import { sectionTemplates, cv, cvPreview } from './mocks'

const handlers: any = [
  graphql.query('GET_CV', (_, res, ctx) => {
    return res(
      ctx.data({
        cv,
        sectionTemplates,
        cvPreview,
      })
    )
  }),
]

export { handlers }
