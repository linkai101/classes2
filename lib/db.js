import initFirebase from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

initFirebase();
const db = firebase.firestore();

// forEach with async
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const getData = async (uid) => {
  const doc = await db.collection("users").doc(uid).get();
  if (doc.exists) {
    return { ...doc.data(), id: uid };
  } else {
    return null;
  }
}

export const updateData = async (uid, data) => {
  const res = await db.collection("users").doc(uid).set(data)
  .catch((err) => {
    return { error: true, message: err, res: res };
  });
  return res;
}