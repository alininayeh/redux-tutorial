// The store
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// The store is created from the imported root reducer
const store = createStore(
  rootReducer,
  // This is the only setup you need to do in order to use redux thunk
  applyMiddleware(thunk)
);

export default store;