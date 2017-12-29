import React from 'react'
import PropTypes from 'prop-types'
import Route from 'react-router-dom/Route'
import Redirect from 'react-router-dom/Redirect'
import { state } from 'aws-cognito-redux-saga'

class PrivateRoute extends React.Component {
  static propTypes = {
    component: PropTypes.func,
    auth: PropTypes.object
  }

  render() {
    let isSignedIn = this.props.auth.isSignedIn

    return (
      <Route
        render={() => {
          return isSignedIn !== state.AUTH_FAIL ? (
            <this.props.component />
          ) : (
            <Redirect to="/landing" />
          )
        }}
      />
    )
  }
}

export default PrivateRoute
