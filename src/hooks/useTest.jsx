import { route } from '@/routes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useTest(id = null) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    'testname': '',
    'defaults': [
      {
        'defname' : '',
        'min': 0,
        'max': 0,
      },
    ],
  })

  const [tests, setTests] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    getTests({signal: controller.signal})
    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    if (id !== null) {
      const controller = new AbortController()
      getTest(id, {signal: controller.signal})
      return () => {
        controller.abort()
      }
    }
  }, [id])

  async function getTests({signal} = {}){
    return axios.get('tests', {signal})
      .then(response => setTests(response.data))
      .catch(() => {})
  }

  async function getTest(id, {signal} = {}){
    setLoading(true)
    return axios.get(`tests/${id}`, {signal})
      .then(response => setData(response.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  async function updateTest(test){
    setLoading(true)
    setErrors({})

    return axios.put(`tests/${test.testid}`, test)
      .then(() => navigate(route('tests.index')))
      .catch(error => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }

  function addItem() {
    const newDefaultItem = {
      defname: '',
      min: 0,
      max: 0,
    }
    setData((prevState) => ({
      ...prevState,
      defaults: [...prevState.defaults, newDefaultItem],
    }))
  }

  function removeItem(index) {
    setData((prevState) => ({
      ...prevState,
      defaults: prevState.defaults.filter((_, i) => i !== index),
    }))
  }
  function createTest(data) {
    setLoading(true)
    setErrors({})

    return axios
      .post('tests', data)
      .then(() => navigate(route('tests.index')))
      .catch((error) => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }

  function destroyTest(test){
    return axios.delete(`tests/${test.testid}`)
  }

  return {
    test: { data, setData, errors, loading },
    createTest,
    addItem,
    removeItem,
    tests,
    updateTest,
    destroyTest,
    getTests,
  }
}
