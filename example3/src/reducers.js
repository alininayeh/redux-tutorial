// The reducers
import {combineReducers} from 'redux';

// The todo reducer
const todo = (state = [], action) => {
  switch(action.type) {
    case 'GET_TODOS':
      return action.payload;
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'CHECK_TODO':
      return state.map(item => {
        if (item.id === action.payload.id) {
          item.checked = action.payload.checked;
        }

        return item;
      });
    default:
      return state;
  }
};

// The combine reducers function will simply merge more reducers to generate one bigger reducer
// The initial state in the store will look like: {todo: []}
const rootReducer = combineReducers({todo});
export default rootReducer;