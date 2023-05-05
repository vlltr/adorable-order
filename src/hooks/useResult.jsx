import { route } from '@/routes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useResult(){
  const navigate = useNavigate()
  const [results, setResults] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(
    {
      'testid': null,
      'partnumber': '',
      'serialno': '',
      'duration': 0,
      'results': [
        {
          'defname': null,
          'read': 0,
          'result': null,
        },
      ],
    },
  )

  const resultOptions = ['pass', 'fail']

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

  function addItem() {
    const newDefaultItem = {
      defname: '',
      read: 0,
      result: null,
    }
    setData((prevState) => ({
      ...prevState,
      results: [...prevState.results, newDefaultItem],
    }))
  }

  function removeItem(index) {
    setData((prevState) => ({
      ...prevState,
      results: prevState.results.filter((_, i) => i !== index),
    }))
  }

  function createResult(data) {
    setLoading(true)
    setErrors({})

    return axios
      .post('results', data)
      .then(() => navigate(route('results.index')))
      .catch((error) => {
        console.log(error)
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }

  function destroyResult(result){
    return axios.delete(`results/${result.resultid}`)
  }
  return {
    result: { data, setData, errors, loading },
    results,
    createResult,
    addItem,
    removeItem,
    resultOptions,
    destroyResult,
    getResults,
  }
}

