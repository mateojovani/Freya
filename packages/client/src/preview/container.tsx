import * as React from 'react'
import { Dispatch, FunctionComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row } from 'antd'
import { cvPreviewQuery } from 'freya-shared'

import { useQuery } from '../utils'
import { AppState } from '../types'
import { CVPreviewAction } from './types'
import { State } from './reducer'
import { loadCVPreview } from './actions'

export const PreviewComponent: FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch<CVPreviewAction>>()
  const { cvPreview, loading } = useSelector<AppState, State>(
    ({ cvPreviewView }) => cvPreviewView
  )
  const { response } = useQuery(cvPreviewQuery)

  useEffect(() => {
    if (response) {
      dispatch(loadCVPreview(response))
    }
  }, [response])

  if (loading) {
    return <div></div>
  }

  return (
    <Row>
      <img
        data-testid="preview"
        width="100%"
        src={`data:image/png;base64,${cvPreview.url}`}
      />
    </Row>
  )
}
