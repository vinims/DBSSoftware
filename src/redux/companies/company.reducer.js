import { companyActionTypes } from './company.types';

export default function(state = {}, action) {
  switch (action.type) {
      case companyActionTypes.GET_COMPANIES:
          return action.payload;
      default:
          return state;
  }
}





