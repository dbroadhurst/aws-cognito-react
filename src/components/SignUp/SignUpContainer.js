import { connect } from 'react-redux'

import { reducer } from 'aws-cognito-redux-saga'

import SignUpComponent from './SignUp'

const mapStatetoProps = state => {
  return {
    isSignedIn: state.auth.signedIn,
    signUpError: state.auth.signUpError,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(reducer.init())
    },
    signUp: (username, password) => {
      dispatch(reducer.signUp(username, password))
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(SignUpComponent)
