import { InteractionActionTypes } from './interaction.types';
import { firestore } from '../../firebase/firebase.utils';

export function getInteractions() {
  return async dispatch => {
    const snapshot = await firestore.collection("interactions").get()
    const docs = snapshot.docs.map(doc => doc.data());
    console.log(docs)
              dispatch({
                  type: InteractionActionTypes.GET_INTERACTIONS,
                  payload: docs
              });
  };     
}

export function getInteraction(id) {
  console.log(id)
  return async dispatch => {
    const snapshot = await firestore.collection("interactions").doc(id).get()
     const data = snapshot.data();
              dispatch({
                  type: InteractionActionTypes.GET_INTERACTION,
                  payload: data
              });
              return data;
  };     
}

export const saveInteraction = (interaction, additionalData) => {
  return dispatch => {
  if (!interaction) return;
  const interactionRef = firestore.collection("interactions").doc(interaction.id);
  const { id, name , priority , phone , imageFile , address , completeAddress , createdBy } = interaction;
    const createdAt = new Date();
    try {
      interactionRef.set({
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
  return interactionRef;
}; 
}

export function deleteInteraction(id) {
  return dispatch => firestore.collection("interactions").doc(id).delete();
}
