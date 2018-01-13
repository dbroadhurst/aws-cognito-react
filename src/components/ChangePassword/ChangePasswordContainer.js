import { connect } from 'react-redux'

import { reducer } from 'aws-cognito-redux-saga'

import ChangePasswordComponent from './ChangePassword'

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
    changePassword: (username, code, password) => {
      dispatch(reducer.changePassword(username, code, password))
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(
  ChangePasswordComponent
)
