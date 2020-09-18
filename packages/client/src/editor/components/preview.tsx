import * as React from 'react'
import { FunctionComponent } from 'react'
import { Button, Row } from 'antd'
import styled from 'styled-components'
import { CVPreview } from 'freya-shared'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

interface PreviewProps {
  source: CVPreview
}

const Container = styled.div`
  background: rgba(0, 0, 0, 0.65);
  padding: 5%;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column;
`

const Navigator = styled.div`
  display: flex;
  color: white;
`

export const PreviewComponent: FunctionComponent<PreviewProps> = ({
  source,
}) => {
  const [currentImage, setCurrentImage] = React.useState(0)

  return (
    <Row>
      <Container>
        <Navigator>
          <Button
            type="link"
            icon={
              <div style={{ color: 'white' }}>
                <LeftOutlined />
              </div>
            }
            onClick={() => {
              if (currentImage > 0) {
                setCurrentImage(currentImage - 1)
              }
            }}
          ></Button>
          <div style={{ margin: '5px' }}>
            {currentImage + 1}/{source.urls.length}
          </div>
          <Button
            type="link"
            icon={
              <div style={{ color: 'white' }}>
                <RightOutlined />
              </div>
            }
            onClick={() => {
              if (currentImage < source.urls.length - 1) {
                setCurrentImage(currentImage + 1)
              }
            }}
          ></Button>
        </Navigator>

        <img
          style={{ maxHeight: '100%', maxWidth: '100%' }}
          data-testid="preview"
          src={`data:image/png;base64,${source.urls[currentImage].base64}`}
        />
      </Container>
    </Row>
  )
}
