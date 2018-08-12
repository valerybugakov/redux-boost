import React, { Component } from 'react'
import ListItemText from '@material-ui/core/ListItemText'

import { formatDate } from '../../../../utils'
import { commitType } from '../../../../constants/types'

import { StyledListItem } from './styles'

class Commit extends Component {
  handleClick = () => {
    const {
      commit: { url },
    } = this.props

    const win = window.open(url, '_blank')
    win.focus()
  }

  render() {
    const { commit } = this.props

    return (
      <StyledListItem onClick={this.handleClick} button>
        <ListItemText
          primary={commit.title}
          secondary={
            <span>
              <b>{commit.author && commit.author.login}</b>
              {` committed on ${formatDate(commit.date)}`}
            </span>
          }
        />
      </StyledListItem>
    )
  }
}

Commit.propTypes = {
  commit: commitType,
}

Commit.defaultProps = {
  commit: {},
}

export default Commit
