import { Component } from 'react'
import PropTypes from 'prop-types'
import { merge } from 'lodash'

import { requestActions } from '../../state/requests/actions'

export class RestMutation extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static defaultProps = {
    query: {},
    options: {},
    action: requestActions.requestStart,
  }

  // eslint-disable-next-line react/sort-comp
  hasMounted = false

  state = {
    loading: false,
    error: undefined,
    result: undefined,
    // TODO: implement networkStatus updates
    // networkStatus: 'string',
  }

  componentDidMount() {
    this.hasMounted = true
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  getMutationResult = () => ({
    ...this.state,
  })

  updateState = data => {
    if (this.hasMounted) {
      this.setState(data)
    }
  }

  runMutation = async options => {
    const { store } = this.context
    const { query, action } = this.props
    const dynamicPayload = options.nativeEvent ? undefined : options

    this.setState({ loading: true })

    try {
      const result = await new Promise((resolve, reject) => {
        const requestAction = action(merge(query, dynamicPayload), {
          resolve,
          reject,
        })

        // Handy to use with thunks
        if (requestAction.then) {
          requestAction.then(resp => resolve(resp)).catch(err => reject(err))
        }

        return store.dispatch(requestAction)
      })

      const newState = { loading: false, result }

      this.updateState(newState)
      return newState
    } catch (error) {
      const newState = { loading: false, error, result: undefined }

      this.updateState(newState)
      return newState
    }
  }

  render() {
    const { children } = this.props

    return children(this.runMutation, this.getMutationResult())
  }
}
