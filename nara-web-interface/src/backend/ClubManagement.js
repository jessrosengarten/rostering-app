import { db } from './firebaseConfig';
import { ref,set, get, child, remove, update } from 'firebase/database';

//Method to create a club
export const createClub = async (clubName, address, contactNum, openingTime, closingTime, manager, rate) => {
  try {
    const clubRef = ref(db, 'Clubs/' + clubName);
    await set(clubRef, {address,contactNum, openingTime, closingTime, manager, rate});
    return clubName;
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
};

//Method to fetch all clubs
export const fetchClubs = async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'Clubs'));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

//Method to fetch all managers
export const fetchManagers = async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'clubManager'));
  if (snapshot.exists()) {
    const managersObject = snapshot.val();
    return Object.keys(managersObject).map(key => managersObject[key].fullName); 
  } else {
    return [];
  }
};

//Method to delete a club
export const deleteClubsFromDatabase = async (clubName) => {
  try {
    const clubRef = ref(db, 'Clubs/' + clubName);
    await remove(clubRef);
  } catch (error) {
    console.error('Error deleting club:', error);
  }
};

//Method to update a club
export const updateClub = async (clubName, address, contactNum, openingTime, closingTime, manager, rate) => {
  const clubRef = ref(db, 'Clubs/' + clubName);
  await update(clubRef, {address, contactNum, openingTime, closingTime, manager, rate });
};