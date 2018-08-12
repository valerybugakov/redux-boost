import { Component } from 'react'

export class RestQueryComponent extends Component {
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
    this.fetchData()
    this.hasMounted = true
  }

  componentDidUpdate({ query }) {
    const queryUpdated = Object.keys(query).some(
      key => query[key] !== this.props.query[key]
    )

    if (queryUpdated) {
      this.fetchData()
    }
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  getQueryResult = () => ({
    fetchData: this.fetchData,
    ...this.state,
    ...this.props.requestState,
  })

  updateState = data => {
    if (this.hasMounted) {
      this.setState(data)
    }
  }

  fetchData = async () => {
    if (this.props.shouldSkip) return null

    const { query, fetchStart, action = fetchStart } = this.props

    try {
      const result = await new Promise((resolve, reject) => {
        const requestAction = action(query, {
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

      return result
    } catch (error) {
      throw error
    }
  }

  render() {
    const { children } = this.props
    const queryResult = this.getQueryResult()

    return children(queryResult)
  }
}
