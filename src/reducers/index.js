
import { combineReducers } from 'redux'
import { reducer as authReducer } from 'aws-cognito-redux-saga'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  auth: authReducer.reducer,
  form: formReducer
})

export default reducers

