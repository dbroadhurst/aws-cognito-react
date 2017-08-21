import React from 'react'
import PropTypes from 'prop-types'

import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'

import { Link } from 'react-router-dom'

import { state } from 'aws-cognito-redux-saga'

export default class HeaderComponent extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.string,
    signUpError: PropTypes.bool,
    signOut: PropTypes.func,
    signIn: PropTypes.func,
    signUp: PropTypes.func,
    auth: PropTypes.object
  }

  signOut = () => {
    this.props.signOut()
  }

  render() {
    const { auth } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarTitle text="Cognito" />
          {this.props.isSignedIn !== state.AUTH_SUCCESS
            ? <ToolbarGroup>
                <FlatButton
                  containerElement={<Link to="/signin" />}
                  label="Sign Up / Sign In"
                  onClick={this.signIn}
                />
              </ToolbarGroup>
            : <ToolbarGroup>
                {auth.info.username}
                <FlatButton label="Sign Out" onClick={this.signOut} />
              </ToolbarGroup>}
        </Toolbar>
      </div>
    )
  }
}
