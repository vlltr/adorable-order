import { useResult } from '@/hooks/useResult'
import { route } from '@/routes'
import { Link } from 'react-router-dom'

function ResultList() {
  const { results, destroyResult, getResults} = useResult()

  async function onDeleteResult(result) {
    await destroyResult(result)
    await getResults()
  }
  return (
    <div className='flex flex-col mx-auto md:w-3/5 w-full'>
      <h1 className='heading'>Result List</h1>

      <Link to={route('results.create')} className='btn btn-primary'>
        Add Result
      </Link>

      <div className='border-t h-[1px] my-6'></div>

      <div className="flex flex-col gap-2">
        { results.length > 0 && results.map(result => {
          return (
            <div
              key={ result.resultid }
              className="flex bg-gray-100 w-full p-2 justify-between"
            >
              <div className="flex items-center overflow-hidden w-full">
                <div className="text-xl plate">
                  ID:{ result.resultid }
                </div>
                <div className="font-normal text-gray-600 pl-2 grow truncate">
                  NAME:{ result.testname } - <strong>{ result.datetime }</strong>
                </div>
              </div>
              <div className="flex gap-1">
                <Link
                  className="btn text-white bg-green-600 hover:bg-green-500 text-sm">
                  Show
                </Link>
                <Link
                  className="btn btn-secondary text-sm"
                >
                  Edit
                </Link>
                <button type="button"
                  className="btn text-white bg-red-600 hover:bg-red-500 text-sm"
                  onClick={() => {onDeleteResult(result)}}
                >
                  X
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ResultList