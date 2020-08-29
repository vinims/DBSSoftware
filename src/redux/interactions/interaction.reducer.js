import { InteractionActionTypes } from './interaction.types';

export default function(state = {}, action) {
  switch (action.type) {
      case InteractionActionTypes.GET_INTERACTIONS:
          return action.payload;
      default:
          return state;
  }
}
