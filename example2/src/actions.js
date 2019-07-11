// These are the action creators
// They are functions that generate action objects which will be used by the reducers
export const createIncrementCounterAction = () => {
  return {
    type: 'INCREMENT'
  };
};

export const createDecrementCounterAction = () => {
  return {
    type: 'DECREMENT'
  };
};