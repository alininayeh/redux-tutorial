// The reducers
import {combineReducers} from 'redux';

// The counter reducer
const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// The combine reducers function will simply merge more reducers to generate one bigger reducer
// The initial state in the store will look like: {counter: 0}
const rootReducer = combineReducers({counter});
export default rootReducer;