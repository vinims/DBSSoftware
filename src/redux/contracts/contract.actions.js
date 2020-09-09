import { ContractActionTypes } from './contract.types';
import { firestore } from '../../firebase/firebase.utils';

export function getContracts() {
  return async dispatch => {
    const snapshot = await firestore.collection("contracts").get()
    const docs = snapshot.docs.map(doc => doc.data());
    console.log(docs)
              dispatch({
                  type: ContractActionTypes.GET_CONTRACTS,
                  payload: docs
              });
  };     
}

export function getContract(id) {
  console.log(id)
  return async dispatch => {
    const snapshot = await firestore.collection("contracts").doc(id).get()
     const data = snapshot.data();
              dispatch({
                  type: ContractActionTypes.GET_CONTRACT,
                  payload: data
              });
              return data;
  };     
}

export function getContractsByArrayOfIds(ids) {
  return async dispatch => {
    let data = [];
  for (let i = 0; i < ids.length; i++) {
    console.log(`${ids[i]}`)
    let snapshot = await firestore.collection("contracts").doc(`${ids[i]}`).get()
    console.log(snapshot)
     let contractData = snapshot.data();
     console.log(contractData)
     data.push(contractData);
    }
              dispatch({
                  type: ContractActionTypes.GET_CONTRACTBYARRAYOFIDS,
                  payload: data
              });
              console.log(data)
            return data;
  };     
}

export const saveContract = (contract, additionalData) => {
  return dispatch => {
  if (!contract) return;
  const contractRef = firestore.collection("contracts").doc(contract.id);
  const { id, name , priority , phone , imageFile , address , completeAddress , createdBy } = contract;
    const createdAt = new Date();
    try {
      contractRef.set({
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
  return contractRef;
}; 
}

export function deleteContract(id) {
  return dispatch => firestore.collection("contracts").doc(id).delete();
}
