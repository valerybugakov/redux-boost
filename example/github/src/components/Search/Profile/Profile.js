import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Space from '../../shared/Space'
import { profileType } from '../../../constants/types'

import { StyledAvatar, Caption, Title, Container } from './styles'

class Profile extends Component {
  testMutation = async () => {
    try {
      const res = await this.props.mutationName.mutate()

      console.log('Got mutation result', res)
    } catch (err) {
      console.warn('Got mutation error', err)
    }
  }

  render() {
    const {
      getUser: { result: user },
      mutationName: { error },
    } = this.props

    if (!user) return null

    return (
      <Space top={10} bottom={10}>
        <StyledAvatar sizes="100" alt={user.name} src={user.avatar} />
        <Title variant="title">{user.name}</Title>
        <Caption variant="caption">{user.bio}</Caption>

        <Button onClick={this.testMutation}>Test POST request</Button>
        {error && <Caption variant="caption">{error}</Caption>}

        <Container>
          <span>
            <Title variant="title">Repositories</Title>
            <Typography variant="subheading">{user.repos}</Typography>
          </span>
          <span>
            <Title variant="title">Followers</Title>
            <Typography variant="subheading">{user.followers}</Typography>
          </span>
          <span>
            <Title variant="title">Following</Title>
            <Typography variant="subheading">{user.following}</Typography>
          </span>
        </Container>
      </Space>
    )
  }
}

Profile.propTypes = profileType

export default Profile
