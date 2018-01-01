import { connect } from 'react-redux'
import { ProtectedComponent } from './Protected'

const mapStatetoProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStatetoProps, mapDispatchToProps)(ProtectedComponent)
