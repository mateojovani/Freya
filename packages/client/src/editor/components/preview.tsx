import * as React from 'react'
import { FunctionComponent } from 'react'
import { Button, Row, Tooltip } from 'antd'
import styled from 'styled-components'
import { CVPreview } from 'freya-shared'
import {
  LeftOutlined,
  RightOutlined,
  CheckCircleTwoTone,
  SyncOutlined,
} from '@ant-design/icons'

interface PreviewProps {
  isAutoSaved: boolean
  source: CVPreview
}

const Container = styled.div`
  padding: 5%;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-flow: column;
`

const ActionRow = styled.div`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
`

const Navigator = styled.div`
  display: flex;
`

export const PreviewComponent: FunctionComponent<PreviewProps> = ({
  isAutoSaved,
  source,
}) => {
  const [currentImage, setCurrentImage] = React.useState(0)

  return (
    <Row style={{ background: 'rgba(0, 0, 0, 0.65)' }}>
      <Container>
        <ActionRow>
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
          {isAutoSaved ? (
            <Tooltip title="Changes saved" placement="left">
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </Tooltip>
          ) : (
            <SyncOutlined spin />
          )}
        </ActionRow>

        <img
          style={{ maxHeight: '100%', maxWidth: '100%' }}
          data-testid="preview"
          src={`data:image/png;base64,${source.urls[currentImage].base64}`}
        />
      </Container>
    </Row>
  )
}
