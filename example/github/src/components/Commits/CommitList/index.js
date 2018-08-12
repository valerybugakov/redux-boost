import { restQuery } from 'redux-boost'

import { getCommits } from '../../../state/api'

import Loader from '../../shared/Loader'
import CommitList from './CommitList'

export default restQuery({
  name: 'getCommits',
  action: getCommits,
  placeholder: Loader,
  options: ({ userName, repo }) => ({ userName, repo }),
})(CommitList)
