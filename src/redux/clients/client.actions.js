import { ClientActionTypes } from './client.types';
import { firestore } from '../../firebase/firebase.utils';

export function getClients() {
  return async dispatch => {
    const snapshot = await firestore.collection("clients").get()
    const docs = snapshot.docs.map(doc => doc.data());
              dispatch({
                  type: ClientActionTypes.GET_CLIENTS,
                  payload: docs
              });
  };     
}

export function getClient(id) {
  return async dispatch => {
    const snapshot = await firestore.collection("clients").doc(id).get()
     const data = snapshot.data();
              dispatch({
                  type: ClientActionTypes.GET_CLIENT,
                  payload: data
              });
              return data;
  };     
}

export const saveClient = (client, additionalData) => {
  return dispatch => {
  if (!client) return;
  const clientRef = firestore.collection("clients").doc(client.id);
  const { id, name , priority , phone , imageFile , address , completeAddress , createdBy } = client;
    const createdAt = new Date();
    try {
      clientRef.set({
        id,
        imageFile,
        name,
        priority,
        phone,
        address,
        completeAddress,
        createdAt,
        createdBy,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  return clientRef;
}; 
}

// export function getClients() {
//   return dispatch => {
//       database.ref("clients").on(
//           'value',
//           snapshot => {
//               dispatch({
//                   type: ClientActionTypes.GET_CLIENTS,
//                   payload: snapshot.val()
//               });
//           },
//       );
//   };     
// }

// export function saveClient(client) {
//   return dispatch => database.ref("/clients").push(client);
// }

// export function editClient(id, client) {
//   return dispatch => database.ref("/clients").child(id).update(client);
// }

export function deleteClient(id) {
  return dispatch => firestore.collection("clients").doc(id).delete();
}
