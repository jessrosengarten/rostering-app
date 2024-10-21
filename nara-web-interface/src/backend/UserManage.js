import { db } from './firebaseConfig';
import { ref, get, child, remove, update } from 'firebase/database';

export const fetchUsers = async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'users'));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

export const deleteUserFromDatabase = async (email) => {
  const userRef = ref(db, 'users/' + email.replace('.', ','));
  await remove(userRef);
};

export const updateUser = async (email, updatedData) => {
  const userRef = ref(db, 'users/' + email.replace('.', ','));
  await update(userRef, updatedData);
};