import * as React from 'react'
import { FunctionComponent } from 'react'
import { Row } from 'antd'
import styled from 'styled-components'

interface PreviewProps {
  url: string
}

const Container = styled.div`
  background: rgba(0, 0, 0, 0.65);
  padding: 5%;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PreviewComponent: FunctionComponent<PreviewProps> = ({ url }) => {
  return (
    <Row>
      <Container>
        <img
          style={{ maxHeight: '100%', maxWidth: '100%' }}
          data-testid="preview"
          src={`data:image/png;base64,${url}`}
        />
      </Container>
    </Row>
  )
}
