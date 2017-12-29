import React from 'react'
import PropTypes from 'prop-types'

import { config } from 'aws-cognito-redux-saga'

class Auth extends React.Component {
  static propTypes = {
    getUser: PropTypes.func,
    isSignedIn: PropTypes.string
  }

  componentWillMount() {
    config.config.set({
      region: 'us-east-1',
      IdentityPoolId: '',
      UserPoolId: 'us-east-1_EEtXcO2PV',
      ClientId: '79c2ieo8ubsibcqn7msk19ea89'
    })

    this.props.getUser()
  }

  render() {
    return null
  }
}

export default Auth
