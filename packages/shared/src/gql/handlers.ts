import { graphql } from 'msw'

import { sectionTemplates, cv, cvs } from './mocks'

const handlers: any = [
  graphql.query('GET_CV', (_, res, ctx) => {
    return res(
      ctx.data({
        cv,
        sectionTemplates,
      })
    )
  }),
  graphql.mutation('SAVE_CV', (_, res, ctx) => {
    return res(
      ctx.data({
        saveCV: {
          preview: {
            urls: [{ base64: 'image-after-save' }],
          },
        },
      })
    )
  }),
  graphql.query('GET_CVS', (_, res, ctx) => {
    return res(
      ctx.data({
        cvs,
      })
    )
  }),
]

export { handlers }
