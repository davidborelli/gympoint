import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import student from './student/reducers';
import plan from './plan/reducers';

export default combineReducers({
  auth,
  user,
  student,
  plan,
});
