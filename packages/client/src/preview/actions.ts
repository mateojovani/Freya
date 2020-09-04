import { ActionCreator } from 'redux'
import { CVPreview } from 'freya-shared'

import { CVPreviewLoadedAction } from './types'

export const loadCVPreview: ActionCreator<CVPreviewLoadedAction> = ({
  cvPreview,
}: {
  cvPreview: CVPreview
}) => ({
  type: 'LOAD_CV_PREVIEW',
  payload: {
    cvPreview,
  },
})
