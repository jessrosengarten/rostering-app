import { db } from './firebaseConfig';
import { ref, set, get, child, remove, update } from 'firebase/database';

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

// Function to get the next week's range
function getNextWeekRange(date = new Date()) {
  const currentDate = new Date(date);

  const startOfWeekDay = 1; // Monday
  const currentDay = currentDate.getDay();

  const startOfNextWeek = new Date(currentDate);
  startOfNextWeek.setDate(currentDate.getDate() - (currentDay - startOfWeekDay) + 7);

  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const startFormatted = formatDate(startOfNextWeek);
  const endFormatted = formatDate(endOfNextWeek);

  return { startFormatted, endFormatted };
}

export const fetchPersonnelNeeded = async (clubName) => {
  try {
    // Fetch the club's data to get the opening time
    const clubRef = ref(db, `Clubs/${clubName}`);
    const clubSnapshot = await get(clubRef);
    if (!clubSnapshot.exists()) {
      console.log('No club data available');
      return [];
    }
    const clubData = clubSnapshot.val();
    const openingTime = clubData.openingTime;

    // Fetch the shifts data
    const shiftsRef = ref(db, `Clubs/${clubName}/Shifts`);
    const shiftsSnapshot = await get(shiftsRef);
    if (!shiftsSnapshot.exists()) {
      console.log('No shifts data available');
      return [];
    }
    const shiftsData = shiftsSnapshot.val();

    // Fetch all personnel data once
    const personnelRef = ref(db, 'securityPersonnel');
    const personnelSnapshot = await get(personnelRef);
    if (!personnelSnapshot.exists()) {
      console.log('No personnel data available');
      return [];
    }
    const personnelData = personnelSnapshot.val();

    // Get the next week's date range
    const { startFormatted, endFormatted } = getNextWeekRange();

    // Add the assigned property to each shift for the next week
    const schedule = [];
    for (const week in shiftsData) {
      if (week >= startFormatted && week <= endFormatted) {
        for (const day in shiftsData[week]) {
          const personnelNum = shiftsData[week][day];
          const assigned = checkIfAssigned(personnelData, clubName, week, day);
          schedule.push({
            week,
            day,
            personnelNum,
            openingTime,
            assigned
          });
        }
      }
    }

    return schedule;
  } catch (error) {
    console.error('Error fetching personnel needed:', error);
    return [];
  }
};

export const fetchSecurityPersonnelFullNames = async () => {
  try {
    const personnelRef = ref(db, 'securityPersonnel');
    const snapshot = await get(personnelRef);
    if (snapshot.exists()) {
      const personnel = snapshot.val();
      const fullNames = Object.values(personnel).map(person => person.fullName);
      return fullNames;
    } else {
      console.log('No data available');
      return [];
    }
  } catch (error) {
    console.error('Fetching security personnel error:', error);
    throw error;
  }
};

export const assignPersonnelToShift = async (personnelName, clubName, week, day, startTime) => {
  try {
    // Fetch all security personnel to find the user with the matching fullName
    const personnelRef = ref(db, 'securityPersonnel');
    const snapshot = await get(personnelRef);
    if (!snapshot.exists()) {
      console.log('No security personnel data available');
      return;
    }

    const personnel = snapshot.val();
    let userId = null;
    let rate = 0;

    // Find the user with the matching fullName and get their rate
    Object.keys(personnel).forEach(key => {
      if (personnel[key].fullName === personnelName) {
        userId = key;
        rate = personnel[key].rate; // Assuming rate is stored under each user
      }
    });

    if (!userId) {
      console.log(`No user found with the name ${personnelName}`);
      return;
    }

    const shiftData = {
      clubName,
      startTime,
      shiftStatus: 'assigned',
      attendance: ""
    };

    // Check if the personnel already has a shift for the specified day
    const personnelShiftRef = ref(db, `securityPersonnel/${userId}/Shifts/${week}/${day}`);
    const existingShiftSnapshot = await get(personnelShiftRef);
    if (existingShiftSnapshot.exists()) {
      throw new Error(`Personnel ${personnelName} already has a shift assigned for ${day} in week ${week}`);
    }

    // Save the shift data under the correct user
    await set(personnelShiftRef, shiftData);

    // Count the number of days in the week for which shifts are assigned
    const weekShiftsRef = ref(db, `securityPersonnel/${userId}/Shifts/${week}`);
    const weekShiftsSnapshot = await get(weekShiftsRef);
    const daysInWeek = weekShiftsSnapshot.exists() ? Object.keys(weekShiftsSnapshot.val()).length : 0;

    // Calculate the estimated amount
    const estimatedAmount = daysInWeek * rate;

    // Save the estimated amount under the correct path
    const financesRef = ref(db, `securityPersonnel/${userId}/Finances/${week}/estimatedAmount`);
    await set(financesRef, estimatedAmount);

    return personnelName;
  } catch (error) {
    //console.error('Assigning personnel to shift error:', error);
    throw error;
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

export const checkIfAssigned = (personnelData, clubName, week, day) => {
  for (const userId in personnelData) {
    const shifts = personnelData[userId].Shifts;
    if (shifts && shifts[week] && shifts[week][day] && shifts[week][day].clubName === clubName) {
      return true;
    }
  }
  return false;
};

export const fetchAllClubsByManager = async (managerName) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'Clubs'));

  const result = [];

  if (snapshot.exists()) {
    const clubs = snapshot.val();

    for (const clubId in clubs) {
      const club = clubs[clubId];

      if (club.manager === managerName) {
        result.push(clubId);
      }
    }
  } else {
    console.log("No clubs found in the database.");
    return [];
  }
  return result;
};

