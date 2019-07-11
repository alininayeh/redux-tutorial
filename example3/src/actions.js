export const createAddToDoAction = (e) => {
  // if the key pressed is not Enter return a different action
  if (e.keyCode !== 13) return {
    type: 'KEY_UP'
  };

  const value = e.currentTarget.value;

  // reset the textfield. Not the best approach, but to make it simple
  e.currentTarget.value = '';

  return {
    type: 'ADD_TODO',
    // The payload will contain the newly added todo item
    payload: {
      id: new Date().getTime().toString(),
      text: value,
      checked: false
    }
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