import React, { Component } from 'react'
import List from '@material-ui/core/List'

import { repositoryListType } from '../../../constants/types'

import Repository from './Repository'

import { StyledLink } from './styles'

class RepositoryList extends Component {
  render() {
    const {
      userName,
      getRepos: { result: list = [] },
    } = this.props

    return (
      <List>
        {list.map(repository => (
          <StyledLink
            key={repository.id}
            to={`/${userName}/${repository.name}/`}
          >
            <Repository repository={repository} />
          </StyledLink>
        ))}
      </List>
    )
  }
}

RepositoryList.propTypes = repositoryListType

export default RepositoryList
