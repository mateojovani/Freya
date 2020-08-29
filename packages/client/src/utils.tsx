import * as React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { client } from 'freya-shared/gql-client'

import sectionsReducer, { State } from './sections/reducer'
import { SectionsAction } from './sections/types'
import { AppState } from './types'

const reducers = combineReducers<AppState, SectionsAction>({
  sectionsView: sectionsReducer,
})

export const renderWithStore = (
  Component,
  state = { sectionsView: { templates: null, sections: null, fields: null, loading: true } }
) => {
  const store = createStore(reducers, state)
  return render(<Provider store={store}>{Component}</Provider>)
}

export const useQuery = (query) => {
  const [response, setResponse] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    client
      .request(query)
      .then((res) => {
        setIsLoading(false)
        setResponse(res)
      })
      .catch(setError)
  }, [])

  return { response, error, isLoading }
}
