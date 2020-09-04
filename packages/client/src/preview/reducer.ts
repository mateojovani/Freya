import produce, { Draft } from 'immer'
import { CVPreview } from 'freya-shared'

import { CVPreviewAction } from './types'

export interface State {
  cvPreview: CVPreview
  loading: boolean
}

export default produce(
  (draft: Draft<State>, action: CVPreviewAction) => {
    switch (action.type) {
      case 'LOAD_CV_PREVIEW': {
        draft.cvPreview = action.payload.cvPreview
        draft.loading = false
      }
    }
  },
  { cvPreview: { url: '' }, loading: true }
)
