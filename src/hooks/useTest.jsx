import { route } from '@/routes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useTest() {
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

  async function getTests({signal} = {}){
    return axios.get('tests', {signal})
      .then(response => setTests(response.data))
      .catch(() => {})
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
  return {
    test: { data, setData, errors, loading },
    createTest,
    addItem,
    removeItem,
    tests,
  }
}
