import * as React from 'react'
import { Empty, Button } from 'antd'
import { useHistory } from 'react-router-dom'

import { useMutation } from '../utils'
import { createCVMutation } from 'freya-shared'

export const Library = () => {
  const history = useHistory()
  const [createCV, { response, isLoading }] = useMutation(createCVMutation)

  React.useEffect(() => {
    if (response) {
      history.push(`/resume/${response.createCV}`)
    }
  }, [response])

  return (
    <Empty
      style={{ marginTop: '50px' }}
      description={<span>Create your first resume</span>}
    >
      <Button
        type="primary"
        loading={isLoading}
        onClick={() => {
          createCV({ template: '' })
        }}
      >
        Get started
      </Button>
      {isLoading ? <div>Generating your CV...</div> : null}
    </Empty>
  )
}
