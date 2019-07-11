import React from 'react';
import {connect} from 'react-redux';
import { createIncrementCounterAction, createDecrementCounterAction } from './actions';

// The props are coming from the mapStateToProps and mapDispatchToProps functions
// counter will have an initial value of 0 (coming from the reducer)
// incrementCounter and decrementCounter are functions that will dispatch the actions to the store
const App = ({counter, incrementCounter, decrementCounter}) => {
  return (
    <div className="app">
      <button id="decrementCounter" onClick={decrementCounter}>-</button>
      <span id="counterValue">{counter}</span>
      <button id="incrementCounter" onClick={incrementCounter}>+</button>
    </div>
  );
};

// This function extracts data from the store's state and returns an object with the data needed
// This data will be sent to the component as part of the props
const mapStateToProps = state => ({
  counter: state.counter
});

// This function dispatches actions to the store, which will use the reducers to process them, then update the state
// This should be the only way to update the store's state
const mapDispatchToProps = dispatch => ({
  incrementCounter: () => dispatch(createIncrementCounterAction()),
  decrementCounter: () => dispatch(createDecrementCounterAction())
});

// The connect function takes the mapStateToProps and mapDispatchToProps functions and generates props for the App component
export default connect(mapStateToProps, mapDispatchToProps)(App);