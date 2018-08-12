import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { requestActions } from '../../state/requests/actions'
import { getRequest } from '../../state/requests/selectors'

import { RestMutationComponent } from './Mutation'

const mapStateToProps = (state, { name }) => ({
  requestState: getRequest(state, { operation: name }),
})

const mapDispatchToProps = (dispatch, { action }) => () =>
  bindActionCreators(
    {
      action,
      ...requestActions,
    },
    dispatch
  )

export const RestMutation = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestMutationComponent)
