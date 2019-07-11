import React from 'react';
import {connect} from 'react-redux';
import {createAddToDoAction, createCheckToDoAction, createGetToDosAction} from './actions';

// The props are coming from the mapStateToProps and mapDispatchToProps functions
// todo will have an initial value of [] (coming from the reducer)
// createToDoAction will dispatch the action to the store
const App = ({createAddToDoAction, createCheckToDoAction, createGetToDosAction, todos}) => {
  if (!window.dataLoaded) {
    createGetToDosAction();
    window.dataLoaded = true;
  }
  
  return (
    <div className='app'>
      <input type='text' placeholder='Add your todo' onKeyUp={createAddToDoAction} />
      <div className="todos">
        {
          todos.map((item, i) => (
            <div className='todo' key={i}>
              <input type='checkbox' data-id={item.id} onChange={createCheckToDoAction} />
              {item.checked ? <span className='checked'>{item.text}</span> : item.text}
            </div>
          ))
        }
      </div>
    </div>
  );
};

// This function extracts data from the store's state and returns an object with the data needed
// This data will be sent to the component as part of the props
const mapStateToProps = state => ({
  todos: state.todos
});

// This function dispatches actions to the store, which will use the reducers to process them, then update the state
// This should be the only way to update the store's state
const mapDispatchToProps = dispatch => ({
  createAddToDoAction: (e) => dispatch(createAddToDoAction(e)),
  createCheckToDoAction: (e) => dispatch(createCheckToDoAction(e)),
  createGetToDosAction: () => dispatch(createGetToDosAction())
});

// The connect function takes the mapStateToProps and mapDispatchToProps functions and generates props for the App component
export default connect(mapStateToProps, mapDispatchToProps)(App);