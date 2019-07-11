# React Redux Examples

Understanding Redux can be hard at the beginning, so I decided to make a repo covering the basics of Redux and showing how to use it with React.

Before reading this you should be familiar with React (https://reactjs.org/) and how the state of a component is managed (https://reactjs.org/docs/state-and-lifecycle.html).

## What is Redux?

Redux is a way of managing the state in a web application. Although it's used mainly with React, it can be used with other libraries too. But you'll see it more often in the React ecosystem and if you are working with React there's a very high change of needing to work with it.

The purpose of Redux is to keep the state in a single place instead of having to maintain multiple states across different components. Redux consists of 3 types of elements: **store**, **action**, and **reducer**:

### Store

The store is used to keep the state of the app. Any update on the state is stored here. Creating a store using the redux package is as easy as this:

    import {createStore} from 'redux';
    let store = createStore(counter); // counter here is a reducer, which will be described below

### Actions

An action is an object that is sent to the store, containing a type and some information.

    const addTodoAction = {
        type: 'ADD_TODO', // the type of the action is a string
        payload: {name: 'Learn Redux', id: 1, done: true} // the payload contains some information, for example here it contains the todo item that needs to be added
    };

    // the action is dispatched to the store like this:
    store.dispatch(addToDoAction);

This is the most used format for an action, but actually an action can be of any shape (for example {actionType, actionData}, {a, b}, {foo, bar} etc.). But in the reducer you will need to use the keys that are defined in the action (instead of checking action.type you need to check action.foo or whichever key you used for the type). For consistency I prefer to use the {type, payload} format.

### Reducers

A reducer is a function that gets the action dispatched to the store and sends the store back a processed state, depending on the type of the action and on the data that the action contains.

    // This is an initial state for the reducer.
    const initialState = 0;

    function counter(state = 0, action) {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1;
            default:
                // always return the existing state if the action sent is not in one of the covered cases
                return state;
        }
    }

## When to use Redux?

If your application already has a state management system (like React for example), use that one. If you notice that it's hard to keep track of all the places where there's a state set, then you probably need some extra help and you can use Redux or any other state management concept or library.

You can find a lot of useful advices here: https://redux.js.org/faq/general#when-should-i-use-redux

## Examples

I created a few examples that can help you understand better how Redux works. I commented all the files so it's easy to understand how they work. Just check the source code in this repo to see how Redux can be used.

### Example 1: A simple page with no React

This is just a vanilla JavaScript web app that increases or decreases a counter by 1 if the correspondent buttons are clicked:

![screenshot](https://alininayeh-storage.s3.eu-central-1.amazonaws.com/1562062956884Screenshot%202019-07-02%20at%2012.20.52.png)

The main parts of Redux here are:

#### The store

    import { createStore } from 'redux'
    let store = createStore(counter);

The store keeps the state of the web app. The **createStore** method is used to generate a store from the reducer.

#### The reducer

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

The reducer returns a modified state after an action is dispatched. If the dispatched action is not in one of the cases covered by the reducer the non-modified state is returned.

#### The actions

    store.dispatch({type: 'INCREMENT'});
    store.dispatch({type: 'DECREMENT'});

These are just objects that contain information and are dispatched to the store. The store then passes them to the reducer and gets back the modified state.

The plain redux library is used. The example is taken from here: https://redux.js.org/introduction/getting-started.

You can see the code in the **example1** folder: https://github.com/alininayeh/redux-tutorial/tree/master/example1

### Example 2: A simple page made in React

This is the same app as in example 1, but this time built in react and using the **react-redux** library.

![screenshot](https://alininayeh-storage.s3.eu-central-1.amazonaws.com/1562062956884Screenshot%202019-07-02%20at%2012.20.52.png)

Here we have the same main parts, but they are linked with the React component using the react-redux library. 

#### The store

    // The store
    import {createStore} from 'redux';
    import rootReducer from './reducers';

    // The store is created from the imported root reducer
    const store = createStore(rootReducer);
    export default store;

The same createStore method is used, and the store will keep the state of the app, like before.

#### The reducers

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

The reducer is the same as before, but now we have a main reducer that merges all reducers and exports a main reducer. In our case we still have only one reducer. The **combineReducers** method is used to generate a final reducer.

#### The actions

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

#### The react-redux utilities

#### Provider

    // The Provider component links the app to the store
    <Provider store={store}>
        <App />
    </Provider>

The **Provider** is a placeholder for our React app. It links the app to the store.

#### mapStateToProps

    // This function extracts data from the store's state and returns an object with the data needed
    // This data will be sent to the component as part of the props
    const mapStateToProps = state => ({
        counter: state.counter
    });

The **mapStateToProps** function extracts data from the store's state and returns it in order to be passed to the component as props.

#### mapDispatchToProps

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

#### connect

The **connect** function is used to generate the props from the **mapStateToProps** and **mapDispatchToProps** functions. The component is exported as a higher-order (definition here: https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99) function:

    export default connect(mapStateToProps, mapDispatchToProps)(App);

You can see the code in the **example2** folder: https://github.com/alininayeh/redux-tutorial/tree/master/example2

### Example 3: A to do list with React, Redux and Redux Thunk for async actions

![screenshot](https://alininayeh-storage.s3.eu-central-1.amazonaws.com/1562856446481Screenshot%202019-07-11%20at%2016.31.42.png)





