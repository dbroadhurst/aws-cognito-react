import React from 'react'
import './App.css'
import Landing from './components/Landing'
import Protected from './components/Protected'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Header from './components/Header'
import Auth from './components/Auth'
import PrivateRoute from './components/PrivateRoute'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="screen">
            <Auth />
            <Header />
            <Switch>
              <PrivateRoute path="/protected" component={Protected} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
