import { compose } from 'redux'
import { connect } from 'react-redux'
import { restQuery, restMutation } from 'redux-boost'

import { getUser } from '../../../state/api'

import Loader from '../../shared/Loader'
import Profile from './Profile'

const mapStateToProps = state => ({
  userName: state.searchForm.userName,
})

export default compose(
  connect(mapStateToProps),
  restMutation({
    name: 'mutationName',
    options: ({ userName }) => ({
      payload: [
        'post-request',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName,
          }),
        },
      ],
    }),
  }),
  restQuery({
    ...getUser,
    placeholder: Loader,
    skip: ({ userName }) => userName.length === 0,
  })
)(Profile)
