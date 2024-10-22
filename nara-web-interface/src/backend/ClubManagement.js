import { auth } from './firebaseConfig';
import { db } from './firebaseConfig';
import { ref,set, get, child, remove, update } from 'firebase/database';

export const createClub = async (clubName, contactNum, openingTime, closingTime, manager) => {
  try {
    const clubRef = ref(db, 'Clubs/' + clubName);
    await set(clubRef, {contactNum, openingTime, closingTime, manager });
    return clubName;
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
};

export const fetchClubs = async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'Clubs'));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

export const deleteClubsFromDatabase = async (clubName) => {
  try {
    const clubRef = ref(db, 'Clubs/' + clubName);
    console.log(`Attempting to delete: Clubs/${clubName}`);  // Log for debugging
    await remove(clubRef);
    console.log(`Successfully deleted: ${clubName}`);
  } catch (error) {
    console.error('Error deleting club:', error);
  }
};


export const updateClub = async (clubName, contactNum, openingTime, closingTime, manager) => {
  const clubRef = ref(db, 'Clubs/' + clubName);
  await update(clubRef, {contactNum, openingTime, closingTime, manager });
};