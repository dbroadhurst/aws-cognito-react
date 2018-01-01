import { connect } from 'react-redux'

import AppComponent from './App'

const mapStatetoProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStatetoProps, mapDispatchToProps)(AppComponent)
