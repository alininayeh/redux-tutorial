import serverMock from "./serverMock";

export const createAddToDoAction = (e) => {
  // with async actions a function needs to be returned
  // the function will dispatch the action whenever it's ready
  // no other stuff needs to be done, the rest stays the same
  return dispatch => {
    // if the key pressed is not Enter dispatch a different action
    if (e.keyCode !== 13) {
      dispatch({type: 'KEY_UP'});
      return;
    }

    const value = e.currentTarget.value;

    // reset the textfield. Not the best approach, but to make it simple
    e.currentTarget.value = '';

    const todoItem = {
      id: new Date().getTime().toString(),
        text: value,
        checked: false
    };

    // we'll consider this is actually going ot a server and the response will come back in 1s
    // the new action will be added directly though, to avoid another "request to the database"
    serverMock.addToDo(todoItem, () => {
      dispatch({
        type: 'ADD_TODO',
        payload: todoItem
      });
    });
  }
};

export const createCheckToDoAction = (e) => {
  return {
    type: 'CHECK_TODO',
    payload: {
      id: e.currentTarget.dataset.id,
      checked: e.currentTarget.checked
    }
  };
};