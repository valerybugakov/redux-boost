import { requestActions } from 'redux-boost'
import { connect } from 'react-redux'

import { searchFormActions } from '../../../state/searchForm'

import SearchForm from './SearchForm'

const mapDispatchToProps = {
  resetRequests: requestActions.resetRequests,
  setUsername: searchFormActions.setUsername,
  fetchStart: requestActions.fetchStart,
}

export default connect(
  null,
  mapDispatchToProps
)(SearchForm)
