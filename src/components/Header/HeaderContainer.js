import { connect } from 'react-redux'

import { reducer } from 'aws-cognito-redux-saga'

import HeaderComponent from './Header'

const mapStatetoProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signedIn: () => {
      dispatch(reducer.signedIn())
    },
    signOut: () => {
      dispatch(reducer.signOut())
    },
    signIn: (username, password) => {
      dispatch(reducer.signIn(username, password))
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(HeaderComponent)
