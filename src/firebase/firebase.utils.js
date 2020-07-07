import * as firebase from "firebase";

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAh7vddZ_ss5oWBZxMFQvJm6WYKOOB4vCQ",
  authDomain: "dbs-software.firebaseapp.com",
  databaseURL: "https://dbs-software.firebaseio.com",
  projectId: "dbs-software",
  storageBucket: "dbs-software.appspot.com",
  messagingSenderId: "852262249357",
  appId: "1:852262249357:web:44c64de86a57dff98b53c4",
  measurementId: "G-BHM5CGNCZ0"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const database = firebase.database();

export default firebase;
