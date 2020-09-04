import * as React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import sectionsReducer from './sections/reducer'
import previewReducer from './preview/reducer'
import { SectionsAction } from './sections/types'
import { AppState } from './types'
import { CVPreviewAction } from './preview/types'

const reducers = combineReducers<AppState, SectionsAction | CVPreviewAction>({
  sectionsView: sectionsReducer,
  cvPreviewView: previewReducer,
})

export const renderWithStore = (
  Component,
  state = {
    sectionsView: {
      templates: null,
      sections: null,
      fields: null,
      loading: true,
      hasChanges: false,
      cvId: null,
    },
    cvPreviewView: {
      cvPreview: { url: '' },
      loading: true
    },
  }
) => {
  const store = createStore(reducers, state)
  return render(<Provider store={store}>{Component}</Provider>)
}
