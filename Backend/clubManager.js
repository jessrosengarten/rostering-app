import { db } from './firebaseConfig';
import { ref,set, get, child, remove, update } from 'firebase/database';

// adding security personnel needed: 
export const addPersonnelNeeded = async (clubName, week, day, personnelNum) => {
  try {
    const clubRef = ref(db, `Clubs/${clubName}/Shifts/${week}/${day}`);
    await set(clubRef, personnelNum);
    return clubName;
  } catch (error) {
    console.error('Uploading number of personnel error:', error);
    throw error;
  }
};

// getting a list of clubs by the specific club manager:
export const fetchClubsByManager = async (managerName) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'Clubs'));
  if (snapshot.exists()) {
    const clubs = snapshot.val();
    const filteredClubs = Object.keys(clubs)
      .filter((clubKey) => clubs[clubKey].manager === managerName)
      .reduce((result, clubKey) => {
        result[clubKey] = clubs[clubKey];
        return result;
      }, {});
    return filteredClubs;
  } else {
    return {};
  }
};
