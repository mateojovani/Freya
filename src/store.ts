import { combineReducers, createStore, Store, Reducer } from 'redux'
import sectionsReducer from './sections/reducer'
import { SectionsAction } from './sections/types'

import { AppState } from './types'

const reducers: Reducer<AppState> = combineReducers<AppState, SectionsAction>({
  sectionsView: sectionsReducer,
})

export default function configureStore(): Store<AppState, SectionsAction> {
  return createStore(
    reducers /* preloadedState, */,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}
