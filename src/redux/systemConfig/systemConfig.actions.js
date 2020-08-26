import { systemConfigsActionTypes } from './systemConfig.types';
import { firestore } from '../../firebase/firebase.utils';

export function getSystemConfigs() {
  return async dispatch => {
    const snapshot = await firestore.collection("systemConfigs").get()
    const docs = snapshot.docs.map(doc => doc.data());
              dispatch({
                  type: systemConfigsActionTypes.GET_SYSTEMCONFIGS,
                  payload: docs
              });
  };     
}

export const saveSystemConfigs = (systemConfigs, additionalData) => {
  return dispatch => {
  if (!systemConfigs) return;
  const systemConfigsRef = firestore.collection("systemConfigs").doc(systemConfigs.id);
  const { id, name , priority , phone } = systemConfigs;
    const createdAt = new Date();
    try {
      systemConfigsRef.set({
        id,
        name,
        priority,
        phone,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  return systemConfigsRef;
}; 
}

export function deleteSystemConfigs(id) {
  return dispatch => firestore.collection("systemConfigs").doc(id).delete();
}