import { connect } from 'react-redux'

import { reducer } from 'aws-cognito-redux-saga'

import AuthComponent from './Auth'

const mapStatetoProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(reducer.getUser())
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AuthComponent)
