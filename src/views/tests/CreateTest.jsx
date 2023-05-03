import IconSpinner from '@/components/IconSpinner'
import ValidationError from '@/components/ValidationError'
import { useTest } from '@/hooks/useTest'
import { route } from '@/routes'
import { useNavigate } from 'react-router-dom'

function CreateTest() {
  const { test, createTest, removeItem, addItem } = useTest()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    await createTest(test.data)
  }
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">New Test</h1>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="testname" className="required">
            Test Name
          </label>
          <input
            id="testname"
            name="testname"
            type="text"
            value={test.data.testname}
            onChange={(event) =>
              test.setData({
                ...test.data,
                testname: event.target.value,
              })
            }
            className="form-input plate"
            disabled={test.loading}
          />
          <ValidationError errors={test.errors} field="testname" />
        </div>
        <div className='mb-2'>
          <ValidationError errors={test.errors} field="defaults" />
        </div>
        {test.data.defaults.map((item, index) => (
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
                    const newDefaults = [...test.data.defaults]
                    newDefaults[index].defname = event.target.value
                    test.setData({
                      ...test.data,
                      defaults: newDefaults,
                    })
                  }}
                  className="form-input plate"
                  disabled={test.loading}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={test.loading}
                  onClick={() => removeItem(index)}
                >
                  <span>Remove</span>
                </button>
              </div>

            </div>
            <div>
              <ValidationError errors={test.errors} field={`defaults.${index}.defname`} />
            </div>
            <label htmlFor={`min-${index}`} className="required">
              Minimum Value
            </label>
            <input
              id={`min-${index}`}
              name={`min-${index}`}
              type="number"
              value={item.min}
              onChange={(event) => {
                const newDefaults = [...test.data.defaults]
                newDefaults[index].min = Number(event.target.value)
                test.setData({
                  ...test.data,
                  defaults: newDefaults,
                })
              }}
              className="form-input plate"
              disabled={test.loading}
            />
            <ValidationError errors={test.errors} field={`defaults.${index}.min`} />

            <label htmlFor={`max-${index}`} className="required">
              Maximum Value
            </label>
            <input
              id={`max-${index}`}
              name={`max-${index}`}
              type="number"
              value={item.max}
              onChange={(event) => {
                const newDefaults = [...test.data.defaults]
                newDefaults[index].max = Number(event.target.value)
                test.setData({
                  ...test.data,
                  defaults: newDefaults,
                })
              }}
              className="form-input plate"
              disabled={test.loading}
            />
            <ValidationError errors={test.errors} field={`defaults.${index}.max`} />

          </div>
        ))}


        <div className="flex items-center gap-2 mb-2">
          <button
            type='button'
            onClick={addItem}
            className="btn bg-green-200 w-full"
            disabled={test.loading}
          >
            Add Item
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={test.loading}
          >
            {test.loading && <IconSpinner />}
            Save Test
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            disabled={test.loading}
            onClick={() => navigate(route('tests.index'))}
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateTest
