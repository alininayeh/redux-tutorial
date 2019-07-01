# React Redux Tutorial

Understanding Redux can be hard at the beginning, so I decided to make a tutorial about the basics of Redux and how to use it with React.

Before reading this tutorial you should be familiar with React (https://reactjs.org/) and how the state of a component is managed (https://reactjs.org/docs/state-and-lifecycle.html).

## What is Redux?

Redux is a way of managing the state in a web application. Although it's used mainly with React, it can be used with other libraries too. But you'll see it more often in the React ecosystem and if you are working with React there's a very high change of needing to work with it.

Redux consists of 3 elements, a store, reducers, and actions:

### Store

The store is used to keep the state of the app. Any update on the state is stored here. Creating a store using the redux package is as easy as this:

    import { createStore } from 'redux';
    let store = createStore(counter); // counter here is a reducer, which is described right below

### Reducers

Reducers are functions that take an initial state and an action as parameters and process the state. For example the following reducer starts with an initial state of 0 and icreases it by 1 if an action called INCREMENT is sent:

    function counter(state = 0, action) { // first, the initial state will be used. After that, the store will send the updated state as a parameter here
        switch (action.type) { // an action is an object like {type: 'INCREMENT', payload: 2} (read below for more details)
            case 'INCREMENT':
                return state + action.payload;
            default:
                return state; // always return the existing state if the action sent is not in one of the covered cases
        }
    }

### Actions

An action is an object that is sent to the store in order for the state to be modified. It looks like this:

    {
        type: 'INCREMENT', // the type of the action is a string
        payload: 2 // this can be renamed to anything and it can contain any type of data. This is used to send data to be processed by the reducer
        // more keys can be added here. I like to use payload and to store the data in it for consistency.
    }



