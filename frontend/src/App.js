import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';
import { rootReducer } from './store';
import Dashboard from './components/DashBoard/Dashboard';

function App() {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
