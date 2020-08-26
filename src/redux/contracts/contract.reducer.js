import { ContractActionTypes } from './contract.types';

export default function(state = {}, action) {
  switch (action.type) {
      case ContractActionTypes.GET_CONTRACTS:
          return action.payload;
      default:
          return state;
  }
}





