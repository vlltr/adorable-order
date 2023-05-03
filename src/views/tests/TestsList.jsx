import { route } from '@/routes'
import { Link } from 'react-router-dom'

function TestsList() {
  return (
    <div className='flex flex-col mx-auto md:w-96 w-full'>
      <h1 className='heading'>Test</h1>

      <Link to={route('tests.create')} className='btn btn-primary'>
        Add Test
      </Link>

      <div className='border-t h-[1px] my-6'></div>

      <div>There will be tests list</div>
    </div>
  )
}

export default TestsList
