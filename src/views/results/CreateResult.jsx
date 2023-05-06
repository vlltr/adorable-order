import IconSpinner from '@/components/IconSpinner'
import ValidationError from '@/components/ValidationError'
import { useResult } from '@/hooks/useResult'
import { useTest } from '@/hooks/useTest'
import { route } from '@/routes'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateResult() {
  const { tests } = useTest()
  const { result, createResult, addItem, removeItem, resultOptions } = useResult()
  const navigate = useNavigate()

  useEffect(() => {result.setData({
    ...result.data,
    testid: tests[0]?.testid,
  })}, [tests])


  async function handleSubmit(event) {
    event.preventDefault()

    await createResult(result.data)
  }
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">New Result</h1>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="testid" className="required">Test</label>
          <select
            id="testid"
            className="form-input"
            value={ result.data.testid || '' }
            onChange={ (event) => result.setData({
              ...result.data,
              testid: event.target.value,
            }) }
            disabled={ result.loading }
          >
            { tests.length > 0 && tests.map((test) => {
              return <option key={ test.testid } value={ test.testid }>
                { test.testid } - {test.testname.toUpperCase() }
              </option>
            }) }
          </select>
          <ValidationError errors={ result.errors } field="testid" />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="partnumber" className="required">
            Part Number
          </label>
          <input
            id="partnumber"
            name="partnumber"
            type="text"
            value={result.data.partnumber}
            onChange={(event) =>
              result.setData({
                ...result.data,
                partnumber: event.target.value,
              })
            }
            className="form-input plate"
            disabled={result.loading}
          />
          <ValidationError errors={result.errors} field="partnumber" />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="partnumber" className="required">
            Serial Number
          </label>
          <input
            id="serialno"
            name="serialno"
            type="text"
            value={result.data.serialno}
            onChange={(event) =>
              result.setData({
                ...result.data,
                serialno: event.target.value,
              })
            }
            className="form-input plate"
            disabled={result.loading}
          />
          <ValidationError errors={result.errors} field="serialno" />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="duration" className="required">
            Duration
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            value={result.data.duration}
            onChange={(event) =>
              result.setData({
                ...result.data,
                duration: event.target.value,
              })
            }
            className="form-input plate"
            disabled={result.loading}
          />
          <ValidationError errors={result.errors} field="duration" />
        </div>
        <div className='mb-2'>
          <ValidationError errors={result.errors} field="results" />
        </div>
        {result.data.results.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 mb-4">
            <label htmlFor={`defname-${index}`} className="required">
              Default Name
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  id={`defname-${index}`}
                  name={`defname-${index}`}
                  type="text"
                  value={item.defname}
                  onChange={(event) => {
                    const newDefaults = [...result.data.results]
                    newDefaults[index].defname = event.target.value
                    result.setData({
                      ...result.data,
                      results: newDefaults,
                    })
                  }}
                  className="form-input plate"
                  disabled={result.loading}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={result.loading}
                  onClick={() => removeItem(index)}
                >
                  <span>Remove</span>
                </button>
              </div>

            </div>
            <div>
              <ValidationError errors={result.errors} field={`results.${index}.defname`} />
            </div>
            <label htmlFor={`read-${index}`} className="required">
               Read
            </label>
            <input
              id={`read-${index}`}
              name={`read-${index}`}
              type="number"
              value={item.read}
              onChange={(event) => {
                const newDefaults = [...result.data.results]
                newDefaults[index].read = Number(event.target.value)
                result.setData({
                  ...result.data,
                  results: newDefaults,
                })
              }}
              className="form-input plate"
              disabled={result.loading}
            />
            <ValidationError errors={result.errors} field={`results.${index}.read`} />

            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="testid" className="required">Result</label>
              <select
                id="testid"
                className="form-input"
                value={ item.result || '' }
                onChange={(event) => {
                  const newDefaults = [...result.data.results]
                  newDefaults[index].result = event.target.value
                  result.setData({
                    ...result.data,
                    results: newDefaults,
                  })
                }}
                disabled={ result.loading }
              >
                <option value="" hidden selected>-- select option --</option>
                { resultOptions.length > 0 && resultOptions.map((option, index) => {
                  return <option key={ index } value={ option }>
                    { option.toUpperCase() }
                  </option>
                }) }
              </select>
              <ValidationError errors={ result.errors } field={`results.${index}.result`} />
            </div>
          </div>
        ))}

        <div className="flex items-center gap-2 mb-2">
          <button
            type='button'
            onClick={addItem}
            className="btn bg-green-200 w-full"
            disabled={result.loading}
          >
            Add Item
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={result.loading}
          >
            {result.loading && <IconSpinner />}
            Save Result
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            disabled={result.loading}
            onClick={() => navigate(route('results.index'))}
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateResult