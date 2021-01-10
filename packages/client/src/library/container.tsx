import * as React from 'react'
import { Empty, Button, Card, Skeleton, Row } from 'antd'
import { useHistory } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { useMutation, useQuery } from '../utils'
import { createCVMutation, CV, cvsQuery } from 'freya-shared'

export const Library = () => {
  const history = useHistory()
  const { response: cvsResponse, isLoading: cvsLoading } = useQuery(cvsQuery)

  const [
    createCV,
    { response: createCVResponse, isLoading: createCVLoading },
  ] = useMutation(createCVMutation)

  React.useEffect(() => {
    if (createCVResponse) {
      history.push(`/resume/${createCVResponse.createCV}`)
    }
  }, [createCVResponse])

  if (cvsLoading) {
    return (
      <Card style={{ width: 240, margin: '50px 50px' }}>
        <Skeleton loading={cvsLoading} avatar active></Skeleton>
      </Card>
    )
  }

  if (cvsResponse && cvsResponse.cvs.length) {
    return (
      <div style={{ margin: '50px 50px' }}>
        <Row gutter={16}>
          {cvsResponse.cvs.map((cv: CV) => (
            <Card
              key={cv._id}
              hoverable
              style={{ width: 240, margin: '20px 20px' }}
              cover={
                <img
                  data-testid="preview"
                  style={{ width: '99%', margin: 'auto' }}
                  src={`data:image/png;base64,${cv.preview.urls[0].base64}`}
                />
              }
              onClick={() => {
                history.push(`/resume/${cv._id}`)
              }}
            ></Card>
          ))}
        </Row>
        <Row>
          <Button
            type="primary"
            loading={createCVLoading}
            onClick={() => {
              createCV({ input: { template: '' } })
            }}
          >
            Create
          </Button>
          {createCVLoading ? (
            <div style={{ marginLeft: '5px' }}>Generating your CV...</div>
          ) : null}
        </Row>
      </div>
    )
  }

  return (
    <Empty
      style={{ margin: '50px 50px' }}
      description={<span>Create your first resume</span>}
    >
      <Button
        type="primary"
        loading={createCVLoading}
        onClick={() => {
          createCV({ input: { template: '' } })
        }}
      >
        Create
      </Button>
      {createCVLoading ? <div>Generating your CV...</div> : null}
    </Empty>
  )
}

export const LibraryComponent = withAuthenticationRequired(Library)
