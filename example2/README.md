# Example 2: A simple page made in React

This is the same app as in example 1, but this time built in react and using the **react-redux** library.

![screenshot](https://alininayeh-storage.s3.eu-central-1.amazonaws.com/1562062956884Screenshot%202019-07-02%20at%2012.20.52.png)

In order to run the example locally you need to run:

    npm install
    npm start

Here we have the same main parts, but they are linked with the React component using the react-redux library: https://www.npmjs.com/package/react-redux. Also the plain Redux library is used, as in the previous example: https://www.npmjs.com/package/redux.

## The store

    import {createStore} from 'redux';
    import rootReducer from './reducers';

    // The store is created from the imported root reducer
    const store = createStore(rootReducer);
    export default store;

The same createStore method is used, and the store will keep the state of the app, like before.

## The reducers

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

The reducer is the same as before, but now we have a main reducer that merges all reducers and exports a main reducer. In our case we still have only one reducer. The **combineReducers** method is used to generate a final reducer.

## The actions

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

## The react-redux utilities

### Provider

    // The Provider component links the app to the store
    <Provider store={store}>
        <App />
    </Provider>

The **Provider** is a placeholder for our React app. It links the app to the store.

### mapStateToProps

    // This function extracts data from the store's state and returns an object with the data needed
    // This data will be sent to the component as part of the props
    const mapStateToProps = state => ({
        counter: state.counter
    });

The **mapStateToProps** function extracts data from the store's state and returns it in order to be passed to the component as props.

### mapDispatchToProps

    // This function dispatches actions to the store, which will use the reducers to process them, then update the state
    // This should be the only way to update the store's state
    const mapDispatchToProps = dispatch => ({
        incrementCounter: () => dispatch(createIncrementCounterAction()),
        decrementCounter: () => dispatch(createDecrementCounterAction())
    });

The **mapDispatchToProps** function sends actions to the store, which will use the reducers to update the state depening on which action was sent. The functions that generate the actions are passed to the component as props.

The props coming from the functions above are passed to the component like any other props:

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

### connect

The **connect** function is used to generate the props from the **mapStateToProps** and **mapDispatchToProps** functions. The component is exported as a higher-order (definition here: https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99) function:

    export default connect(mapStateToProps, mapDispatchToProps)(App);
