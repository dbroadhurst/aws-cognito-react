import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { TextField } from 'redux-form-material-ui'

import { RaisedButton, Paper } from 'material-ui'

const required = value => (value ? undefined : 'Required')

const style = {
  paper: { padding: '16px' },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 56px)'
  },
  title: {
    fontSize: '32px',
    textAlign: 'center'
  },
  form: {
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '80%',
    margin: '24px 0'
  },
  error: {
    margin: '8px',
    color: 'rgb(200,0,0)',
    minHeight: '48px',
    width: '80%',
    fontSize: '15px'
  }
}

class ResetPassword extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired,
    auth: PropTypes.object,
    init: PropTypes.func,
    history: PropTypes.object
  }

  componentWillMount() {
    this.props.init()
  }

  forgotPassword = values => {
    this.props.forgotPassword(values.email.toLowerCase())
  }

  changePassword = () => {
    this.props.history.push('/changePassword')
  }

  render() {
    const { handleSubmit, auth } = this.props
    return (
      <div style={style.layout}>
        <Paper style={style.paper} zDepth={5}>
          <form style={style.form}>
            <div style={style.title}>Reset Password</div>

            <Field
              style={style.button}
              name="email"
              validate={[required]}
              component={TextField}
              type="string"
              floatingLabelText="Email"
            />

            {auth.hasSentCode !== 'AUTH_SUCCESS' ? (
              <RaisedButton
                style={style.button}
                primary
                onClick={handleSubmit(this.forgotPassword)}
              >
                Send Code
              </RaisedButton>
            ) : (
              <RaisedButton
                style={style.button}
                primary
                onClick={handleSubmit(this.changePassword)}
              >
                Change Password
              </RaisedButton>
            )}

            <div style={style.error}>{auth.error && auth.error.message}</div>
          </form>
        </Paper>
      </div>
    )
  }
}

// Decorate the form component
export default reduxForm({
  form: 'resetPassword'
})(ResetPassword)
