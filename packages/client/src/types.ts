import { State as SectionsState } from './sections/reducer'
import { State as CVPreviewState } from './preview/reducer'

export interface AppState {
  sectionsView: SectionsState
  cvPreviewView: CVPreviewState
}
