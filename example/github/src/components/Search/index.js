import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'

import Space from '../shared/Space'

import SearchForm from './Form'
import Profile from './Profile'
import RepositoryList from './RepositoryList'

import { StyledPaper } from './styles'

const SearchPage = props => (
  <Fragment>
    <SearchForm {...props} />

    <StyledPaper>
      <Space top={10} bottom={10}>
        <Profile {...props} />
      </Space>
    </StyledPaper>

    <StyledPaper>
      <Space top={30} bottom={10}>
        <Typography variant="title">Repositories</Typography>

        <RepositoryList {...props} />
      </Space>
    </StyledPaper>
  </Fragment>
)

export default SearchPage
