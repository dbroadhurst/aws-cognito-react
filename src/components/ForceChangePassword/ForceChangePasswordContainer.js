import { connect } from 'react-redux'

import { reducer } from 'aws-cognito-redux-saga'

import ForceChangePasswordComponent from './ForceChangePassword'

const mapStatetoProps = state => {
  return {
    hasChangedPassword: state.auth.hasChangedPassword,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(reducer.init())
    },
    completeNewPassword: (username, password) => {
      dispatch(reducer.completeNewPassword(username, password))
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(
  ForceChangePasswordComponent
)
