import { companyActionTypes } from './company.types';
import { firestore } from '../../firebase/firebase.utils';

export function getcompanies() {
  return async dispatch => {
    const snapshot = await firestore.collection("companies").get()
    const docs = snapshot.docs.map(doc => doc.data());
              dispatch({
                  type: companyActionTypes.GET_COMPANIES,
                  payload: docs
              });
  };     
}

export const saveCompany = (company, additionalData) => {
  return dispatch => {
  if (!company) return;
  const companyRef = firestore.collection("companies").doc(company.id);
  const { id, name , priority , phone } = company;
    const createdAt = new Date();
    try {
      companyRef.set({
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
  return companyRef;
}; 
}

export function deleteCompany(id) {
  return dispatch => firestore.collection("companies").doc(id).delete();
}