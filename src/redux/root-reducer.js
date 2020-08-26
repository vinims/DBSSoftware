import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import clientReducer from './clients/client.reducer';
import companyReducer from './companies/company.reducer';
import systemConfigsReducer from './systemConfig/systemConfig.reducer';
import contractReducer from './contracts/contract.reducer';


export default combineReducers({
  user: userReducer,
  client: clientReducer,
  company: companyReducer,
  contract: contractReducer,
  systemConfigs: systemConfigsReducer
});
