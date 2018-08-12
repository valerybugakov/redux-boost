import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import store from './state/store'
import './styles'

import NavBar from './components/shared/NavBar'
import SearchPage from './components/Search'
import CommitListPage from './components/Commits'

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <CssBaseline>
        <NavBar />
        <Route path="/" exact component={SearchPage} />
        <Route path="/:userName/:repo" exact component={CommitListPage} />
      </CssBaseline>
    </Provider>
  </BrowserRouter>
)

render(<App />, document.getElementById('root'))
