import { connect } from 'react-redux'

import { reducer } from 'aws-cognito-redux-saga'

import SignInComponent from './SignIn'

const mapStatetoProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(reducer.init())
    },
    signIn: (username, password, code) => {
      dispatch(reducer.signIn(username, password, code))
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(SignInComponent)
