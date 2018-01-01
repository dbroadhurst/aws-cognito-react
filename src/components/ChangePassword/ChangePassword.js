import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { TextField } from 'redux-form-material-ui'

import { RaisedButton, Paper } from 'material-ui'

import { state } from 'aws-cognito-redux-saga'

import validator from 'validator'

const required = value => (value ? undefined : 'Required')
const passwordMatch = (value, values) =>
  values.password !== values.passwordMatch && 'Passwords must match'
const minLength = value => (value.length >= 8 ? undefined : 'Min Length 8')
const email = value =>
  validator.isEmail(value) ? undefined : 'Not Valid Email'

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: '16px',
    width: '80%'
  },
  field: {
    margin: '8px 32px'
  },
  error: {
    width: '80%',
    color: 'rgb(200,0,0)',
    margin: '8px',
    height: '32px'
  }
}

class ChangePassword extends Component {
  static propTypes = {
    history: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    auth: PropTypes.object,
    init: PropTypes.func
  }

  componentWillMount() {
    this.props.init()
  }

  changePassword = values => {
    this.props.changePassword(
      values.email.toLowerCase(),
      values.code,
      values.password
    )
  }

  signIn = () => {
    this.props.history.push('/signin')
  }

  renderChangePassword() {
    const { handleSubmit, auth } = this.props
    return (
      <div style={style.layout}>
        <Paper style={style.paper} zDepth={5}>
          <form style={style.form}>
            <div style={style.title}>Change Password</div>

            <Field
              style={style.button}
              name="email"
              validate={[required, email]}
              component={TextField}
              type="email"
              floatingLabelText="Email"
            />

            <Field
              style={style.field}
              name="code"
              validate={[required]}
              component={TextField}
              type="string"
              floatingLabelText="Code"
            />

            <Field
              style={style.field}
              name="password"
              validate={[required, minLength]}
              component={TextField}
              type="password"
              floatingLabelText="Password"
            />

            <Field
              style={style.field}
              name="passwordMatch"
              validate={[required, passwordMatch, minLength]}
              component={TextField}
              type="password"
              floatingLabelText="Password"
            />

            <div style={style.error}>{auth.error.message}</div>

            <RaisedButton
              style={style.button}
              onClick={handleSubmit(this.changePassword)}
              primary
            >
              Change Password
            </RaisedButton>
          </form>
        </Paper>
      </div>
    )
  }

  renderSignIn() {
    const { handleSubmit } = this.props
    return (
      <div style={style.layout}>
        <Paper style={style.paper} zDepth={5}>
          <form style={style.form}>
            <div style={style.title}>Password Changed</div>

            <RaisedButton
              style={style.button}
              onClick={handleSubmit(this.signIn)}
              primary
            >
              Sign In
            </RaisedButton>
          </form>
        </Paper>
      </div>
    )
  }

  render() {
    const { auth } = this.props
    return auth.hasChangedPassword === state.AUTH_SUCCESS
      ? this.renderSignIn()
      : this.renderChangePassword()
  }
}

// Decorate the form component
export default reduxForm({
  form: 'changePassword'
})(ChangePassword)
