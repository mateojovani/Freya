import * as React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import sectionsReducer from './editor/reducer'
import { ResumeEditorAction } from './editor/types'
import { AppState } from './types'

const reducers = combineReducers<AppState, ResumeEditorAction>({
  sectionsView: sectionsReducer,
})

export const renderWithStore = (
  Component,
  wrapper: React.ComponentType = null,
  state = {
    sectionsView: {
      templates: null,
      preview: { urls: [{ base64: '' }] },
      sections: null,
      fields: null,
      loading: true,
      hasChanges: false,
      cvId: null,
    },
  }
) => {
  const store = createStore(reducers, state)
  return render(<Provider store={store}>{Component}</Provider>, { wrapper })
}
