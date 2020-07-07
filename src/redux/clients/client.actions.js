import { ClientActionTypes } from './client.types';
import { database } from '../../firebase/firebase.utils';

export function getClients() {
  return dispatch => {
      database.ref("/clients").on(
          'value',
          snapshot => {
              dispatch({
                  type: ClientActionTypes.GET_CLIENTS,
                  payload: snapshot.val()
              });
          },
      );
  };     
}

export function saveClient(client) {
  return dispatch => database.ref("/clients").push(client);
}

export function editClient(id, client) {
  return dispatch => database.ref("/clients").child(id).update(client);
}

export function deleteClient(id) {
  return dispatch => database.ref("/clients").child(id).remove();
}