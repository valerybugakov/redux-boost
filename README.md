
# Redux Boost

`redux-boost` works with [React Redux](https://github.com/reactjs/react-redux) to enable smooth HTTP request handling in [React](https://github.com/facebook/react) using [Redux](https://github.com/reactjs/redux) to store all the request updates.

## TODO:

- [x] Add [interactive example app](https://codesandbox.io/s/3rqv2q3695)
- [x] Add Getting Started section
- [ ] Add API reference (WIP)

## Installation

`npm install --save redux-boost`

or

`yarn add redux-boost`


## Documentation

* [**Getting Started**](#getting-started)
    - [Overview](#overview)
    - [Data flow](#data-flow)
    - [Basic Usage Guide](#basic-usage-guide)
* [**API**](#api)
  - [createRequestMiddleware()](#createrequestmiddlewareconfig)
  - [createActions()](#createactionsactiontypes--prefix)
  - [createReducer()](#createreducerhandlers--defaultstate)
  - [restQuery()](#)
  - [restMutation()](#)
  - [createSaga()](#)
  - [selectors](#)
* [**Examples**](#examples)
    + [Store configuration](#store-configuration)
    + [React integration](#react-integration)


## Getting Started

The basic implementation of `redux-boost` is simple. However, to make the most of it, it's recommended to have basic knowledge on:

- [Redux](http://redux.js.org/) state container,
- [React](https://facebook.github.io/react/) and [Higher-Order Components (HOCs)](https://facebook.github.io/react/docs/higher-order-components.html).

### Overview

To connect your React form components to your Redux store you'll need the following pieces from the `redux-boost` package:

- Redux middleware `createRequestMiddleware()`.
- Redux Reducers: `requestsReducer` and `dataReducer`,
- React HOC `restQuery()` for `GET` requests.
- React HOC `restMutation()` for other types of requests.

It's important to understand their responsibilities:

|               | type        | responsibility                                                                                                                                                   |
| ------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `requestsReducer` `dataReducer` | _reducer_   | function that tells how to update the Redux store based on changes coming from the application; those changes are described by Redux actions                     |
| `restQuery()` `restMutation()` | _HOC_       | function that takes configuration object and returns a new function; use it to wrap your React component and bind user interaction to dispatch of Redux actions |
| `requestMiddleware` | _middleware_       | function that provides a third-party extension point between dispatching an action, and the moment it reaches the reducer |


### Data flow

The diagram below represents the simplified data flow. Note that in most cases you don't need to worry about the [action creators](http://redux-form.com/7.4.2/docs/api/ActionCreators.md/) for yourself, as they're already bound to dispatch for certain actions.

Let's go through a simple example. We have a React component wrapped with `restQuery()`. There is a list inside of it that need data to be fetched from the server to be rendered correctly. The data flows like this:

1.  Component gets rendered for the first time,
2.  `restQuery` dispatches `fetchStart` action with `query` description passed into it,
3.  `requestMiddleware` catches this action and initiates HTTP request,
4.  `requestsReducer` catches this action too and updatse Redux state with request state,
5.  `restQuery` updates wrapped component passing request state into it,
6.  On request resolution `requestMiddleware` dispatches a relevant action, either `fetchSuccess` or `fetchFail`,
7.  `requestsReducer` updates request state with the result or an error
8.  `restQuery` updates wrapped component with the final request state,

With `redux-boost` comes a lot more: hooks for error handling and props to refetch the data, data selectors and action creators.
This guide describes the basic usage – feel free to dig deeper.

### Basic Usage Guide

#### Step 1 of 3: Request middleware

The store should know how to handle actions with quert descriptions to intiate HTTP requests. To enable this, we need to pass the `createRequestMiddleware` to your store.

```js
import axios from 'axios'
import { applyMiddleware } from 'redux'
import { createRequestMiddleware } from 'redux-boost'

const middlewares = [
  createRequestMiddleware({
    // Executor is function that will initiate HTTP requests
    executor: axios
 }),
  // ...otherMiddlewares,
]

export const enhancer = applyMiddleware(...middlewares)
```

Now your store knows how to initiate HTTP requests received from the certain actions.

#### Step 2 of 3: Request and data reducers

The store should know how to handle actions coming from the form components. To enable this, we need to pass the `requestsReducer` and `dataReducer` to your store. It serves for **all of your form components**, so you only have to pass it once.

```js
import { createStore, combineReducers } from 'redux'
import { dataReducer, requestsReducer } from 'redux-boost'

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass requestsReducer under 'requests' key,
  // and dataReducer under 'data` key.
  data: dataReducer,
  requests: requestsReducer,
})

const store = createStore(rootReducer)
```

Now your store knows how to handle actions coming from the form components.

**NOTE:** The keys used to pass the `redux-boost` reducer should be named **`requests`** and **`data`**.

#### Step 3 of 3: High-order components

To make your React component communicate with the store, we need to wrap it with `restQuery()` to receive data from the server or `restMutation()` to mutate data on the server. It will provide the props about the current request state and function to refetch data.

```js
import React from 'react'
import { restQuery } from 'redux-form'

const FriendList = props => {
  // getFriends prop updates on each request stage: [START, SUCCESS, FAIL]
  const { getFriends: { result, loading, error } } = props

  if (loading) return <Spinner>...loading</Spinner>
  if (error) return <Error>{error.message}</Error>

  return result.map(friend => <div key={friend.id}>{friend.name}</div>)
}

export default restQuery({
  // a unique name the request, will be used as a prop name and redux state key
  name: 'getFriends'

  // options allows to use ownProps of the component
  // to create dynamic parts of the query
  options: ({ userId }) => ({
    // payload will be passed to the executor function, it's axios in our example
    payload: 'http://awesome.api.com/friends?userId=${userId}'
  }),

  // we don't want to fetch anything if userId is not defined
  skip: ({ userId }) => !userId,
})(FriendList)
```

**NOTE**: If the `()()` syntax seems confusing, you can always break it down
into two steps:

```js
// ...

// create new, "configured" function
createRestQuery = restQuery(configuration)

// evaluate it for FriendList component
const FriendListContainer = createRestQuery(FriendList)

export default FriendListContainer
```
## API

#### `createRequestMiddleware(config)`

Creates a middleware that will handle request actions generated by the library to make network requests. Configuration keys:


| Key         | Default value     | Description                                                                                                                                                                                                                                                                                                             |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| method    | `'GET'`  | Default HTTP method to use if no method passed in the request action.                                                                                                                                                                                                                               |                                                                                                                                               |
| executor       | `fetch()`   | A function that will execute HTTP request `executor(...requestAction.payload)` |
| prepareExecutor    |    | A function that is called before the request to alter executor in some way using request description. `prepareExecutor(executor, requestAction)`           
| serialize      |   | A function that is called with the body of the response, allowing you to transform it. `serialize(response)`                                                                                         |
| onSuccess        |   | A function that is only called on network request successful completion. `onSuccess({ name, result })`                                                                                                                                                                                       |
| onError     |  | A function that is only called on network request error. `onError({ name, error })`                                                                                                                                                                                                                            |


#### `createActions(actionTypes [, prefix])`

Returns an object with [action creators](#action-creator). If `prefix` is passed, it will be used to prefix type in each action creator.

```js
const actions = createActions([
  'set',
  'delete',
  'update',
], 'users')

// actions.set(profile)         -> { type: 'users/set', payload: profile }
// actions.delete({ id: 77 })   -> { type: 'users/delete', payload: { id: 77 } }

// actions.set.type             === 'users/set'
// String(actions.set)          === 'users/set'
// actions.set.isReduxAction    === true
```
Apart from `payload`, the second argument in action creator creates `meta` property, which can be useful in middlewares.
```js
// actions.update({ name }, callback) -> 
// {
//   type: 'users/update',
//   payload: { name },
//   meta: callback
// }
```

#### `createReducer(handlers [, defaultState])`

Returns a new reducer.

- **handlers**: `object`, that provides mapping between action types and action handlers.
- **defaultState** (anything, optional): the initial state of the reducer. Must not be empty if you plan to use this reducer inside a `combineReducers`

```javascript
import { actions } from './actions'

const DECREMENT_ACTION_TYPE = 'DECREMENT'

const counterReducer = createReducer({
  [actions.increment]: (state) => state + 1,
  [actions.add]: (state, payload) => state + payload,
  [DECREMENT_ACTION_TYPE]: state => state - 1,
}, 0)
```

## Examples

### Store configuration

```js
/* eslint-disable */
import { combineReducers } from 'redux'
import {
  boostStore,
  createStore,
  dataReducer,
  requestsReducer,
} from 'redux-boost'

const myReducer = combineReducers({
  data: dataReducer,
  requests: requestsReducer,
})

const { store, persistor } = createStore({
  initialState: {},
  reducer: myReducer,

  reduxLogger: 'fallback',
  devtoolExtension: true,

  // --- Redux persist config
  reduxPersist: {
    key: 'root',
    whitelist: ['auth'],
    // storage,
  },

  // --- Middlewares config
  middlewares: {
    saga: true,
    thunk: true,
    eventFilter: true,
  },

  // middlewares: [
  //   ...customMiddlewaresArray,
  // ],
})

// If store is not created by redux-boost
// `boostStore` call is required to enable binded `fetchStart` action
boostStore(store)
```

### React integration

`restQuery` — HOC for `GET` requests.

`restMutation` – HOC for other types of requests.

API is similar to [React-Apollo](https://github.com/apollographql/react-apollo) library.

First wrap React component into HOC to receive desired functionality.

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getResponse, restMutation, restQuery } from 'redux-boost'

import exampleSaga from 'modules/sagas/exampleSaga'

import ExampleComponent from './ExampleComponent'

const mapStateToProps = state => ({
  latestQuote: getResponse(state, { operation: 'operationName' }),
})

export default compose(
  connect(mapStateToProps),

  // On componentDidMount will execute declared action which should
  // return promise to track request status and receive result later in props
  restQuery({
    name: 'requiredData',
    action: fetchRequiredData,
    options: props => ({
      userId: props.userId,
    }),
  }),

  // Provides props to make request, track it's status and receive result
  restMutation({
    // {
    //   name: 'exampleSaga',
    //   action: exampleSagaAction,
    // }
    ...exampleSaga,

    // Will be passed to the executor as a request params
    options: ({ foo, bar }) => ({
      foo: foo.toUpperCase(),
      bar,
      constant: 1,
    }),
  })
)(ExampleComponent)
```

Then use provided props to send mutation request and display queried data.

```js
// In React component use mutation name to access passed properties
import React, { Component } from 'react'

class ExampleComponent extends Component {
  executeMutation = async () => {
    // Mutation result promise which resolves with result of the mutation
    // But anyway mutation result will be passed as a prop to the component too
    const result = await this.props.exampleSaga.mutate({
      additionalProp: 'value', // Will be merged into the params defined in container
    })

    console.log(result)
  }

  render() {
    const {
      requiredData,
      exampleSaga: { loading, mutate, result, error },
    } = this.props

    if (requiredData.loading) {
      return <div>...loading</div>
    }

    return (
      <div>
        <Data {...requiredData.result} />
        <button onClick={this.executeMutation}>Mutate</button>

        {loading && '...mutation result is loading'}
        {result && <ResultComponent {...result} />}
      </div>
    )
  }
}
```
