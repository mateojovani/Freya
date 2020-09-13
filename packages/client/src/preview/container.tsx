import * as React from 'react'
import { Dispatch, FunctionComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row } from 'antd'
import { cvPreviewQuery } from 'freya-shared'
import styled from 'styled-components'

import { useQuery } from '../utils'
import { AppState } from '../types'
import { CVPreviewAction } from './types'
import { State } from './reducer'
import { loadCVPreview } from './actions'

const Container = styled.div`
  background: rgba(0, 0, 0, 0.65);
  padding: 5%;
  height: 100vh;
  display: flex;
  align-items: center;
`

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
      <Container>
        <img
          style={{ maxHeight: '1000px' }}
          data-testid="preview"
          width="100%"
          src={`data:image/png;base64,${cvPreview.url}`}
        />
      </Container>
    </Row>
  )
}
