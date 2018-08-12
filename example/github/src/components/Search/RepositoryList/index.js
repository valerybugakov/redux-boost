import { compose } from 'redux'
import { connect } from 'react-redux'
import { restQuery } from 'redux-boost'

import { getRepos } from '../../../state/api'

import Loader from '../../shared/Loader'
import RepositoryList from './RepositoryList'

const mapStateToProps = ({ searchForm: { userName } }) => ({
  userName,
})

export default compose(
  connect(mapStateToProps),
  restQuery({
    ...getRepos,
    placeholder: Loader,
    skip: ({ userName }) => userName.length === 0,
  })
)(RepositoryList)
