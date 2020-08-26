import { systemConfigsActionTypes } from './systemConfig.types';

export default function(state = {}, action) {
  switch (action.type) {
      case systemConfigsActionTypes.GET_SYSTEMCONFIGS:
          return action.payload;
      default:
          return state;
  }
}





