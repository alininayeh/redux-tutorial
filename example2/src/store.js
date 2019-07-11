// The store
import {createStore} from 'redux';
import rootReducer from './reducers';

// The store is created from the imported root reducer
const store = createStore(rootReducer);
export default store;