import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import student from './student/sagas';
import plan from './plan/sagas';

export default function* rootSaga() {
  return yield all([auth, user, student, plan]);
}
