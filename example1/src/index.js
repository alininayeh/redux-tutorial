// We need to import the createStore function from redux.
//This will help us to create the store.
import { createStore } from 'redux'

// This is a reducer. This checks for the INCREMENT and DECREMENT actions and returns a new state when these actions are called.
// The initial state of this reducer is 0, since we start the counter at 0.
// The reducer doesn't modify the state, it returns a new one from the previous state.
// Always return the previous state if the action called is not one of the ones we care about.
function counter(state = 0, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// This is the store. The reducer is passed as a parameter and it will modify the store which is assigned to.
let store = createStore(counter);

// The subscribe method checks when the store's state is modified.
// The getState() method returns the state of the store. In our case the state will be 0, 1, 2 ...
store.subscribe(() => {
  const state = store.getState();
  document.getElementById('counterValue').innerHTML = state;
});

// When clicking the plus or minus buttons an action is dispatched (sent) to the store using the dispatch method
document.getElementById('decrementCounter').addEventListener('click', () => {
  store.dispatch({type: 'DECREMENT'});
});

document.getElementById('incrementCounter').addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'});
});



