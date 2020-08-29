import * as React from 'react'
import { client } from 'freya-shared'

export const useQuery = (query) => {
  const [response, setResponse] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    client
      .request(query)
      .then((res) => {
        setIsLoading(false)
        setResponse(res)
      })
      .catch(setError)
  }, [])

  return { response, error, isLoading }
}
