import { Action } from 'redux'
import { CVPreview } from 'freya-shared'

export interface CVPreviewLoadedAction extends Action {
  type: 'LOAD_CV_PREVIEW'
  payload: { cvPreview: CVPreview }
}

export type CVPreviewAction = CVPreviewLoadedAction
