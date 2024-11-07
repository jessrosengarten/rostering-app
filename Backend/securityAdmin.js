import { db } from './firebaseConfig';
import { ref,set, get, child, remove, update } from 'firebase/database';

export const fetchAllClubs = async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'Clubs'));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

export const fetchAllSecurityPersonnel = async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'securityPersonnel'));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

export const fetchAllClubManagers = async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'clubManager'));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};