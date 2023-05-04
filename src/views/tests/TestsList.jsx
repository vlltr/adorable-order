import { useTest } from '@/hooks/useTest'
import { route } from '@/routes'
import { Link } from 'react-router-dom'

function TestsList() {
  const { tests, destroyTest, getTests } = useTest()


  async function onDeleteTest(test) {
    await destroyTest(test)
    await getTests()
  }

  return (
    <div className='flex flex-col mx-auto md:w-3/5 w-full'>
      <h1 className='heading'>Test List</h1>

      <Link to={route('tests.create')} className='btn btn-primary'>
        Add Test
      </Link>

      <div className='border-t h-[1px] my-6'></div>

      <div className="flex flex-col gap-2">
        { tests.length > 0 && tests.map(test => {
          return (
            <div
              key={ test.testid }
              className="flex bg-gray-100 w-full p-2 justify-between"
            >
              <div className="flex items-center overflow-hidden w-full">
                <div className="text-xl plate">
                  ID:{ test.testid }
                </div>
                <div className="font-normal text-gray-600 pl-2 grow truncate">
                  NAME:{ test.testname } - <strong>{ test.datetime }</strong>
                </div>
              </div>
              <div className="flex gap-1">
                <button type="button" className="btn text-white bg-green-600 hover:bg-green-500 text-sm">
                  Show
                </button>
                <Link
                  to={ route('tests.edit', { id: test.testid }) }
                  className="btn btn-secondary text-sm"
                >
                  Edit
                </Link>
                <button type="button"
                  className="btn text-white bg-red-600 hover:bg-red-500 text-sm"
                  onClick={() => {onDeleteTest(test)}}
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

export default TestsList
