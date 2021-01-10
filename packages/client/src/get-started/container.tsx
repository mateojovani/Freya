import * as React from 'react'
import { Form, Input, Button, Typography, Layout, Row, Col } from 'antd'
import { useHistory } from 'react-router-dom'

import { useMutation } from '../utils'
import { createCVMutation } from 'freya-shared'

const GetStarted = () => {
  const history = useHistory()
  const [createCV, { response, isLoading }] = useMutation(createCVMutation)

  React.useEffect(() => {
    if (response) {
      history.push(`/start/${response.createCV}`)
    }
  }, [response])

  const onFinish = (values = { firstname: '', lastname: '' }) => {
    createCV({
      input: { firstName: values.firstname, lastName: values.lastname },
    })
  }

  return (
    <Layout>
      <Layout.Content style={{ background: 'white' }}>
        <Row
          style={{
            height: '50%',
            overflow: 'auto',
            margin: 'auto',
            position: 'absolute',
            top: '0',
            left: '10%',
            bottom: '0',
            right: '0',
          }}
        >
          <Col>
            <Typography.Title level={3}>
              Before we get you going
            </Typography.Title>
            <Typography.Title level={4}>
              Tell us a bit about yourself
            </Typography.Title>

            <Form style={{ marginTop: '30px' }} onFinish={onFinish}>
              <Form.Item label="First name" name="firstname">
                <Input />
              </Form.Item>
              <Form.Item label="Last name" name="lastname">
                <Input />
              </Form.Item>

              <Form.Item>
                <Button loading={isLoading} type="primary" htmlType="submit">
                  Next
                </Button>
                <Button
                  disabled={isLoading}
                  type="link"
                  onClick={() => onFinish()}
                >
                  Skip
                </Button>
                {isLoading ? <div>Generating your CV...</div> : null}
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}

export { GetStarted }
