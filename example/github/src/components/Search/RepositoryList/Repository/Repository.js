import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import { repositoryType } from '../../../../constants/types'

import { GoldStar } from './styles'

class Repository extends Component {
  render() {
    const { repository } = this.props

    return (
      <ListItem button>
        <ListItemText primary={repository.name} />
        <Typography>{repository.stars} &nbsp;</Typography>
        <ListItemIcon>
          <GoldStar />
        </ListItemIcon>
      </ListItem>
    )
  }
}

Repository.propTypes = {
  repository: repositoryType,
}

Repository.defaultProps = {
  repository: {},
}

export default Repository
