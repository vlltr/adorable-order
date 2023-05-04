import App from '@/App'
import '@/assets/main.css'
import { route } from '@/routes'
import Home from '@/views/Home'
import CreateTest from '@/views/tests/CreateTest'
import EditTest from '@/views/tests/EditTest'
import ShowTest from '@/views/tests/ShowTest'
import TestsList from '@/views/tests/TestsList'

import ResultList from '@/views/results/ResultList'


import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import axios from 'axios'

window.axios = axios

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// window.axios.defaults.withCredentials = true
window.axios.defaults.baseURL = 'http://localhost/api'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={ route('home') } element={<App />}>
          <Route index element={<Home />} />
          <Route path={ route('tests.index') } element={<TestsList />} />
          <Route path={ route('tests.create') } element={<CreateTest />} />
          <Route path={ route('tests.edit') } element={<EditTest />} />
          <Route path={ route('tests.show') } element={<ShowTest />} />
          <Route path={ route('results.index') } element={<ResultList />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)