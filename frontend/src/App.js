import './App.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import React from 'react'
import { rootReducer } from './store'
import Dashboard from './components/DashBoard/Dashboard'
import { SWRConfig } from 'swr'

function App() {
  const store = createStore(rootReducer)
  
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then(res => { res.json() }),
        onError: (error) => {
          console.error(error)
        }
      }}
    >
      <Provider store={store}>
            <Dashboard />
      </Provider>
    </SWRConfig>
  )
}

export default App
