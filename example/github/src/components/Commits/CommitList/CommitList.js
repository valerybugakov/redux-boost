import React, { Component } from 'react'
import List from '@material-ui/core/List'

import { commitListType } from '../../../constants/types'
import Commit from './Commit'

class CommitList extends Component {
  render() {
    const {
      getCommits: { result: list = [] },
    } = this.props

    return (
      <List>
        {list.map(commit => (
          <Commit key={commit.sha} commit={commit} />
        ))}
      </List>
    )
  }
}

CommitList.propTypes = commitListType

export default CommitList
