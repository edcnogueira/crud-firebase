import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebase-config";

const usersCollectionRef = collection(db, "users");

export const createUser = async (name, age) => {
  await addDoc(usersCollectionRef, { name, age });
};

export const updateUser = async (id, name, age) => {
  const userDoc = doc(db, "users", id);
  const newFields = { name, age };
  await updateDoc(userDoc, newFields);
};

export const deleteUser = async id => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
};
