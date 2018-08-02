# Redux Boost

Save me from Redux anxiety!

### TODO:

[ ] Add API reference
[ ] Add interactive example

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


// Connect component to redux-store and provide mutation props
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getResponse, restMutation } from 'redux-boost'

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
    options: ({ foo, bar, }) => ({
      foo: foo.toUpperCase(),
      bar,
      constant: 1,
    }),
  })
)(ExampleComponent)

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
      exampleSaga: {
        loading,
        mutate,
        result,
        error,
      },
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
