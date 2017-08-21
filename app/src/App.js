import React from 'react'
import './App.css'
import Landing from './components/Landing'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Header from './components/Header'
import Auth from './components/Auth'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="screen">
            <Auth />
            <Header />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
