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