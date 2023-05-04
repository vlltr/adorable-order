import { useEffect, useState } from 'react'

export function useResult(){
  const [results, setResults] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    const controller = new AbortController()
    getResults({signal: controller.signal})
    return () => {
      controller.abort()
    }
  }, [])

  async function getResults({signal} = {}){
    return axios.get('results', {signal})
      .then(response => setResults(response.data))
      .catch(() => {})
  }

  return {
    result: { data, setData, errors, loading },
    results,
  }
}

