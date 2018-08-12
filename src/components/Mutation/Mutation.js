import { Component } from 'react'
import { merge } from 'lodash'

export class RestMutationComponent extends Component {
  static defaultProps = {
    query: {},
    options: {},
  }

  static getDerivedStateFromProps({ requestState }, { entities }) {
    if (requestState && requestState.result) {
      return {
        entities,
      }
    }

    return {
      entities: undefined,
    }
  }

  // eslint-disable-next-line react/sort-comp
  hasMounted = false

  state = {
    entities: undefined,
  }

  componentDidMount() {
    this.hasMounted = true
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  getMutationResult = () => ({
    ...this.state,
    ...this.props.requestState,
  })

  updateState = data => {
    if (this.hasMounted) {
      this.setState(data)
    }
  }

  runMutation = async (options = {}) => {
    const { query, fetchStart, action = fetchStart } = this.props

    const dynamicPayload = options.nativeEvent ? undefined : options

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
      })

      this.updateState({
        entities: result.entities,
      })
    } catch (error) {
      throw error
    }
  }

  render() {
    const { children } = this.props

    return children(this.runMutation, this.getMutationResult())
  }
}
