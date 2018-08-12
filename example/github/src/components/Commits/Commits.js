import React from 'react'
import Typography from '@material-ui/core/Typography'

import CommitList from './CommitList'

import { StyledPaper } from './styles'

const CommitListPage = props => {
  const { repo, userName } = props.match.params

  return (
    <StyledPaper>
      <Typography variant="title">Commits for {repo}</Typography>

      <CommitList userName={userName} repo={repo} />
    </StyledPaper>
  )
}

export default CommitListPage
