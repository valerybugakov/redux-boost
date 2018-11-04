import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

import { StyledPaper, ImageWrapper, StyledForm } from './styles'

class SearchForm extends Component {
  state = {
    username: '',
  }

  handleInputChange = event => {
    this.setState({ username: event.target.value })
    this.handleSearchDebounced()
  }

  handleSearchUser = () => {
    const { username } = this.state

    // TODO: add working example with `fetchStart` action
    // this.props.fetchStart({
    //   name: 'test',
    //   payload: `https://swapi.co/api/people/${username}`,
    //   // saveRequestResult: false,
    //   serialize: resp => {
    //     console.log('REST', resp)
    //
    //     return resp.films
    //   }
    // })

    if (username.length) {
      this.props.resetRequests(['mutationName'])
      this.props.setUsername(username)
    } else {
      this.props.resetRequests(['getUser', 'getRepos', 'mutationName'])
    }
  }

  handleSearchDebounced = debounce(this.handleSearchUser, 500)

  render() {
    return (
      <StyledPaper>
        <ImageWrapper>
          <img alt="github" height="75" src="/github.svg" />
        </ImageWrapper>

        <StyledForm>
          <TextField
            autoFocus
            label="Github username"
            onChange={this.handleInputChange}
            value={this.state.username}
          />
        </StyledForm>
      </StyledPaper>
    )
  }
}

export default SearchForm
