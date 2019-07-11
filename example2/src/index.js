import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './store';
import './index.css';

ReactDOM.render(
  // The Provider component links the app to the store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
