import React, { Component } from 'react'
import { RestMutation } from './MutationContainer'

export const restMutation = config => WrappedComponent => {
  let lastResultProps
  const {
    // This properties will be passed to the request middleware
    name,
    method = 'post',
    serialize,
    executor,
    prepareExecutor,

    // `query` object will be merged with properties above
    query,

    // `options` fn creates an object using `ownProps` that
    // will be merged with properties above
    options,
  } = config

  class RestMutationHoc extends Component {
    applyProps = fn => {
      if (typeof fn === 'function') {
        return fn(this.props)
      }

      return fn
    }

    render() {
      config.query = {
        name,
        method,
        serialize,
        executor,
        prepareExecutor,
        ...query,
        ...this.applyProps(options),
      }

      return (
        <RestMutation {...config} {...this.props}>
          {(mutate, r) => {
            const result = { mutate, ...r }

            const propName = config.name || 'data'
            let childProps = { [propName]: result }

            if (config.props) {
              const newResult = {
                [propName]: result,
                ownProps: this.props,
              }

              lastResultProps = config.props(newResult, lastResultProps)
              childProps = lastResultProps
            }

            return <WrappedComponent {...this.props} {...childProps} />
          }}
        </RestMutation>
      )
    }
  }

  return RestMutationHoc
}
