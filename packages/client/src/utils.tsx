import * as React from 'react'
import { client } from 'freya-shared'

export const useQuery = (query, variables?) => {
  const [response, setResponse] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    client
      .request(query, variables)
      .then((res) => {
        setIsLoading(false)
        setResponse(res)
      })
      .catch(setError)
  }, [])

  return { response, error, isLoading }
}

export const useMutation = (
  mutation
): [(variables) => void, { response; error; isLoading }] => {
  const [response, setResponse] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const mutate = (variables = {}) => {
    setIsLoading(true)
    client
      .request(mutation, variables)
      .then((res) => {
        setIsLoading(false)
        setResponse(res)
      })
      .catch(setError)
  }

  return [mutate, { response, error, isLoading }]
}
