import { useResult } from '@/hooks/useResult'
import { route } from '@/routes'
import { useNavigate, useParams } from 'react-router-dom'

function ShowResult() {
  const params = useParams()
  const { result } = useResult(params.id)
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">Show Result: {result.data.resultid ?? ''}</h1>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="testname">
            Test Name
          </label>
          <input
            id="testname"
            name="testname"
            type="text"
            value={result.data.testid + ' - '+ result.data.testname}
            className="form-input plate"
            disabled={true}
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="partnumber">
            Part Number
          </label>
          <input
            id="partnumber"
            name="partnumber"
            type="text"
            value={result.data.partnumber}
            className="form-input plate"
            disabled={true}
          />
        </div>


        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="serialno">
            Serial Number
          </label>
          <input
            id="serialno"
            name="serialno"
            type="text"
            value={result.data.serialno}
            className="form-input plate"
            disabled={true}
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="duration">
            Duration
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            value={result.data.duration}
            className="form-input plate"
            disabled={true}
          />
        </div>

        {result.data.results.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 mb-4">
            <label htmlFor={`defname-${index}`}>
              Default Name
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  id={`defname-${index}`}
                  name={`defname-${index}`}
                  type="text"
                  value={item.defname}
                  className="form-input plate"
                  disabled={true}
                />
              </div>


            </div>
            <div>
            </div>
            <label htmlFor={`read-${index}`}>
               Read
            </label>
            <input
              id={`read-${index}`}
              name={`read-${index}`}
              type="number"
              value={item.read}
              className="form-input plate"
              disabled={true}
            />

            <label htmlFor={`result-${index}`}>
               Result
            </label>
            <input
              id={`read-${index}`}
              name={`read-${index}`}
              type="text"
              value={item.result}
              className="form-input plate"
              disabled={true}
            />


          </div>
        ))}

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
            onClick={() => navigate(route('results.edit', { id: params.id }))}

          >
            Edit
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(route('results.index'))}
          >
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowResult