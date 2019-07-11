# Example 1: A simple page with no React

This is just a vanilla JavaScript web app that increases or decreases a counter by 1 if the correspondent buttons are clicked:
![screenshot](https://alininayeh-storage.s3.eu-central-1.amazonaws.com/1562062956884Screenshot%202019-07-02%20at%2012.20.52.png)

Here the **redux** library is used: https://www.npmjs.com/package/redux and the following example was used as inspiration: https://redux.js.org/introduction/getting-started.

In order to run the example locally you need to run:

    npm install
    npm start

The main parts of Redux here are:

## The store

    import { createStore } from 'redux'
    let store = createStore(counter);

The store keeps the state of the web app. The **createStore** method is used to generate a store from the reducer.

## The reducer

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

## The actions

    store.dispatch({type: 'INCREMENT'});
    store.dispatch({type: 'DECREMENT'});

These are just objects that contain information and are dispatched to the store. The store then passes them to the reducer and gets back the modified state.