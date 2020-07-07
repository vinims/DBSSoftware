import { ClientActionTypes } from './client.types';

export default function(state = {}, action) {
  switch (action.type) {
      case ClientActionTypes.GET_CLIENTS:
          return action.payload;
      default:
          return state;
  }
}





