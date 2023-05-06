import { useEffect, useState } from 'react'


export function useData(){
  const [data, setData] = useState()

  useEffect(() => {
    const controller = new AbortController()
    getData({signal: controller.signal})
    return () => {
      controller.abort()
    }
  }, [])

  async function getData({signal} = {}){
    return axios.get('dashboard', {signal})
      .then(response => setData(response.data))
      .catch(() => {})
  }

  return {
    data,
  }
}