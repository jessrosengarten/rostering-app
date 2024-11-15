import { db } from './firebaseConfig';
import { ref, set, get, child, remove, update } from 'firebase/database';

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

export const getSchedule = async (clubName, week) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `Clubs/${clubName}/Shifts/${week}`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
};
export const getSecurityPersonnelShifts = async (clubName, dateRange) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'securityPersonnel'));
  const result = [];

  if (snapshot.exists()) {
    const personnel = snapshot.val();
    for (const email in personnel) {
      const shifts = personnel[email].Shifts;
      if (shifts) {
        for (const range in shifts) {
          // Check if the current shift range matches the given dateRange
          if (range === dateRange) {
            for (const day in shifts[range]) {
              const shift = shifts[range][day];
              if (shift.clubName === clubName) {
                result.push({
                  email,
                  day,
                  attendance: shift.attendance || '',
                  ...personnel[email],
                  shiftDetails: shift
                });
              }
            }
          }
        }
      }
    }
  }
  return result;
};

// adding attendance:  
export const addingAttendance = async (personnelName, dateRange, day, attendance) => {
  try {
    const clubRef = ref(db, `securityPersonnel/${personnelName}/Shifts/${dateRange}/${day}`);
    await update(clubRef, {
      attendance: attendance,
    });
    return attendance;
  } catch (error) {
    console.error('Uploading attendance error:', error);
    throw error;
  }
};