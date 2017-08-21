import { connect } from 'react-redux'

import { reducer } from 'aws-cognito-redux-saga'

import AuthComponent from './Auth'

const mapStatetoProps = state => {
  return {
    isSignedIn: state.auth.signedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signedIn: () => {
      dispatch(reducer.signedIn())
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AuthComponent)
