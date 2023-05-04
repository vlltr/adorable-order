import { useTest } from '@/hooks/useTest'
import { route } from '@/routes'
import { useNavigate, useParams } from 'react-router-dom'

function ShowTest() {
  const params = useParams()
  const { test } = useTest(params.id)
  const navigate = useNavigate()


  return (
    <div>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">Show Test: {test.data.testid ?? ''}</h1>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="testname">
            Test Name
          </label>
          <input
            id="testname"
            name="testname"
            type="text"
            value={test.data.testname}
            className="form-input plate"
            disabled={true}
          />
        </div>

        {test.data.defaults.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 mb-4">
            <label htmlFor={`defname-${index}`} >
              Default Name
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  id={`defname-${index}`}
                  name={`defname-${index}`}
                  type="text"
                  value={item.defname ?? ''}
                  className="form-input plate"
                  disabled={true}
                />
              </div>
              <div>
              </div>
            </div>
            <div>

            </div>
            <label htmlFor={`min-${index}`} >
              Minimum Value
            </label>
            <input
              id={`min-${index}`}
              name={`min-${index}`}
              type="number"
              value={item.min ?? ''}
              className="form-input plate"
              disabled={true}
            />

            <label htmlFor={`max-${index}`} >
              Maximum Value
            </label>
            <input
              id={`max-${index}`}
              name={`max-${index}`}
              type="number"
              value={item.max ?? ''}
              className="form-input plate"
              disabled={true}
            />
          </div>
        ))}


        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
            onClick={() => navigate(route('tests.edit', { id: params.id }))}

          >
            Edit
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(route('tests.index'))}
          >
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowTest
