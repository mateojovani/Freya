import { combineReducers, createStore, Store } from 'redux'

import sectionsReducer from './editor/reducer'
import { ResumeEditorAction } from './editor/types'
import { AppState } from './types'

const reducers = combineReducers({
  sectionsView: sectionsReducer,
})

export default function configureStore(): Store<AppState, ResumeEditorAction> {
  return createStore(
    reducers,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}
