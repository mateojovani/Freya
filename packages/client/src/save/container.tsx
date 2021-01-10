import * as React from 'react'
import { Layout, Row, Skeleton } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { saveCVForAccountMutation } from 'freya-shared'

import { useMutation } from '../utils'

const Save = () => {
  const history = useHistory()
  const [saveCVForAccount, { response, isLoading }] = useMutation(saveCVForAccountMutation)
  const params = useParams<{ id: string }>()

  React.useEffect(() => {
    saveCVForAccount({ id: params.id })
  }, [params])

  React.useEffect(() => {
    if (response) {
      history.push(`/resume/${response.saveCVForAccount}`)
    }
  }, [response])

  return (
    <Layout>
      <Layout.Content style={{ background: 'white' }}>
        <Row style={{ margin: '50px 50px' }}>
          <Skeleton />
        </Row>
      </Layout.Content>
    </Layout>
  )
}

export { Save }
