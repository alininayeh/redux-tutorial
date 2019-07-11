# Example 3: A to do list with React, Redux and Redux Thunk for async actions

In this case I created a to do list and simulated an API in order to see how Redux work with async actions, which will probably be the case in most of your future projects:
![screenshot](https://alininayeh-storage.s3.eu-central-1.amazonaws.com/1562856446481Screenshot%202019-07-11%20at%2016.31.42.png)

In order to run the example locally you need to run:

    npm install
    npm start

The Redux-related libraries used here are:

redux: https://www.npmjs.com/package/redux
react-redux: https://www.npmjs.com/package/react-redux
redux-thunk: https://www.npmjs.com/package/redux-thunk

## The store

Here the addition is that a middleware is applied to the store (more info here: https://redux.js.org/advanced/middleware). This middleware helps perform different things, including async API calls. Redux Thunk enables async calls:

    import {createStore, applyMiddleware} from 'redux';
    import thunk from 'redux-thunk';
    import rootReducer from './reducers';

    // The store is created from the imported root reducer
    const store = createStore(
        rootReducer,
        // This is the only setup you need to do in order to use redux thunk
        applyMiddleware(thunk)
    );

    export default store;

## The reducers

For the reducers nothing essential changes, except the fact that now the payload of the actions is used:

    import {combineReducers} from 'redux';

    // The todo reducer
    const todos = (state = [], action) => {
    switch(action.type) {
        case 'GET_TODOS':
            return [...action.payload.todos];
        case 'ADD_TODO':
            // Here the payload contains the newly added todo
            return [...state, action.payload];
        case 'CHECK_TODO':
            // Here the payload contains the id of the todo that needs to be modified and if it should be checked or unchecked
            return [...state.map(item => {
                if (item.id === action.payload.id) {
                    item.checked = action.payload.checked;
                }

                return item;
            })];
        default:
            return state;
    }
    };

    // The combine reducers function will simply merge more reducers to generate one bigger reducer
    // The initial state in the store will look like: {todo: []}
    const rootReducer = combineReducers({todos});
    export default rootReducer;

## The actions

Here instead of returning the action immediately we need to return a function that gets the dispatch function as a parameter and dispatches the action to the store.

    import serverMock from "./serverMock";

    export const createGetToDosAction = () => {
        return dispatch => {
            serverMock.getToDos(todos => {
                dispatch({
                    type: 'GET_TODOS',
                    payload: {todos}
                });
            });
        };
    };

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

So for using Redux Thunk we just need to add a middleware to the store and return functions with dispatch as a parameter and dispatch the actions instead of returning them directly.

## The react-redux utilities

The **Provider**, **mapStateToProps**, **mapDispatchToProps**, and **connect** utlities stay exactly the same as in the previous example (https://github.com/alininayeh/redux-tutorial/tree/master/example2). 
