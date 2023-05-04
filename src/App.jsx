import { Outlet } from 'react-router-dom'
import NamedLink from './components/NamedLink'

function App() {
  return (
    <div className="App">
      <header className="py-6 bg-gray-100 shadow">
        <div className="container md:px-2 px-4 mx-auto">
          <nav className="flex gap-4 justify-between">
            <div className="flex gap-4 items-center">
              <img src="https://gsassembly.com/website/wp-content/uploads/2019/09/cropped-GSAlogoFInal-1.png" width={100} alt="Logo" />
              <NamedLink name="home">
                Home
              </NamedLink>
              <NamedLink name="tests.index">
                Tests
              </NamedLink>
              <NamedLink name="results.index">
                Results
              </NamedLink>
            </div>
          </nav>
        </div>
      </header>
      <div className="container md:px-2 px-4 pt-8 md:pt-16 mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default App