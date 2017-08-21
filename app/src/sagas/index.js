import { all, fork } from 'redux-saga/effects'

import { sagas } from 'aws-cognito-redux-saga'

export default function* root() {
  yield all([fork(sagas)])
}
