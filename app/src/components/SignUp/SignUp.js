import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator'

import { Link } from 'react-router-dom'

import { TextField } from 'redux-form-material-ui'

import { RaisedButton } from 'material-ui'

import { state } from 'aws-cognito-redux-saga'

const required = value => (value ? undefined : 'Required')
const email = value =>
  validator.isEmail(value) ? undefined : 'Not Valid Email'
const passwordMatch = (value, values) =>
  values.password !== values.passwordMatch && 'Passwords must match'
const minLength = value => (value.length >= 8 ? undefined : 'Min Length 8')

const style = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh'
  },
  title: {
    margin: '8px',
    fontSize: '32px',
    textAlign: 'center'
  },
  form: {
    boxShadow: '2px 2px 5px rgb(80,80,80)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpButton: {
    margin: '32px',
    width: '80%'
  },
  field: {
    margin: '8px 32px'
  },
  error: {
    margin: '8px',
    color: 'rgb(200,0,0)'
  },
  validateTitle: {
    margin: '8px 32px',
    fontSize: '24px',
    textAlign: 'center'
  }
}

class SignUp extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    signUpError: PropTypes.bool,
    auth: PropTypes.object,
    init: PropTypes.func
  }

  componentWillMount() {
    this.props.init()
  }

  signUp = values => {
    this.props.signUp(values.email.toLowerCase(), values.password)
  }

  signUpForm = () => {
    const { handleSubmit, auth } = this.props
    return (
      <form style={style.form}>
        <div style={style.title}>Sign Up</div>

        <Field
          style={style.field}
          name="email"
          validate={[required, email]}
          component={TextField}
          type="email"
          floatingLabelText="Email"
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
          style={style.signUpButton}
          onClick={handleSubmit(this.signUp)}
          primary
        >
          Sign Up
        </RaisedButton>
      </form>
    )
  }

  signedUp = () => {
    return (
      <div style={style.form}>
        <div style={style.validateTitle}>
          A verification code has been emailed
        </div>

        <RaisedButton
          style={style.signUpButton}
          containerElement={<Link to="/signin" />}
          primary
        >
          Sign In
        </RaisedButton>
      </div>
    )
  }

  render() {
    const { auth } = this.props

    return (
      <div style={style.layout}>
        {auth.hasSignedUp === state.AUTH_UNKNOWN
          ? this.signUpForm()
          : this.signedUp()}
      </div>
    )
  }
}

// Decorate the form component
export default reduxForm({
  form: 'signUp'
})(SignUp)
