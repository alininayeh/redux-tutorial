# React Redux Examples

Understanding Redux can be hard at the beginning, so I decided to make a repo covering the basics of Redux and showing how to use it with React.

Before reading this you should be familiar with React (https://reactjs.org/) and how the state of a component is managed (https://reactjs.org/docs/state-and-lifecycle.html).

## What is Redux?

Redux is a way of managing the state in a web application. Although it's used mainly with React, it can be used with other libraries too. But you'll see it more often in the React ecosystem and if you are working with React there's a very high change of needing to work with it.

The purpose of Redux is to keep the state in a single place instead of having to maintain multiple states across different components. Redux consists of 3 elements, a store, reducers, and actions:

### Store

The store is used to keep the state of the app. Any update on the state is stored here. Creating a store using the redux package is as easy as this:

    import { createStore } from 'redux';
    let store = createStore(counter); // counter here is a reducer, which is described right below

### Reducers

Reducers are functions that take an initial state and an action as parameters and process the state. For example the following reducer starts with an initial state of 0 and icreases it by 1 if an action called INCREMENT is sent:

    function counter(state = 0, action) { // first, the initial state will be used. After that, the store will send the updated state as a parameter here
        switch (action.type) { // an action is just an object like {type: 'INCREMENT'}
            case 'INCREMENT':
                return state + 1;
            default:
                return state; // always return the existing state if the action sent is not in one of the covered cases
        }
    }

### Actions

An action is an object that is sent to the store in order for the state to be modified. It contains a type key and it might contain some other info (for example a new item to be added to the state). It looks like this:

    {
        type: 'ADD_TODO', // the type of the action is a string
        payload: {name: 'Learn Redux', id: 1, done: true} // the payload contains some information, for example here it contains the todo item that needs to be added
    }

This is the most used format for an action, but actually an action can be of any shape (for example {actionType, actionData}, {a, b}, {foo, bar} etc.). But in the reducer you will need to use the keys that are defined in the action (instead of checking action.type you need to check action.foo or whichever key you used for the type). For consistency I prefer to use the {type, payload} format.

## Examples

I created a few examples that can help you understand better how Redux works. I commented all the files so it's easy to understand how they work. Just check the source code in this repo to see how Redux can be used.

### Example 1: A simple page with no React

This is just a vanilla JavaScript web app that increases or decreases a counter by 1 if the correspondent buttons are clicked:





