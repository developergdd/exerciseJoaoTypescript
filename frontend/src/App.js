import React from 'react';
import './App.css';
import Dashboard from './components/DashBoard/Dashboard'
import {Provider} from 'react-redux';
import {rootReducer} from './store'
import {createStore} from 'redux';

function App() {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <Dashboard /> 
    </Provider>
  );
}

export default App;
