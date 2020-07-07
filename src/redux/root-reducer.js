import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import clientReducer from './clients/client.reducer';

export default combineReducers({
  user: userReducer,
  client: clientReducer
});
