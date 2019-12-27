import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import student from './student/reducers';
import plan from './plan/reducers';
import registration from './registration/reducers';
import helpOrders from './helpOrders/reducers';

export default combineReducers({
  auth,
  user,
  student,
  plan,
  registration,
  helpOrders,
});
