import reducer, { State } from './reducer'
import { loadCVPreview } from './actions'

const initialState: State = {
  loading: true,
  cvPreview: { url: '' },
}

describe('Preview Reducer', () => {
  test('Load cv preview', () => {
    const state = reducer(
      initialState,
      loadCVPreview({ cvPreview: { url: 'mock.jpeg' } })
    )
    expect(state.loading).toBeFalse()
    expect(state.cvPreview.url).toEqual('mock.jpeg')
  })
})
