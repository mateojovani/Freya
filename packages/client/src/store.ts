import { combineReducers, createStore, Store } from 'redux'

import sectionsReducer from './sections/reducer'
import cvPreviewReducer from './preview/reducer'
import { SectionsAction } from './sections/types'
import { AppState } from './types'
import { CVPreviewAction } from './preview/types'

const reducers = combineReducers({
  sectionsView: sectionsReducer,
  cvPreviewView: cvPreviewReducer,
})

export default function configureStore(): Store<
  AppState,
  SectionsAction & CVPreviewAction
> {
  return createStore(
    reducers,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}
