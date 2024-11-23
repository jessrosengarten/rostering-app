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
    const nextWeekRange = getNextWeekRange();

    // Add the assigned property to each shift for the next week
    const schedule = [];
    for (const week in shiftsData) {
      if (week === nextWeekRange) {
        for (const day in shiftsData[week]) {
          let personnelNum = shiftsData[week][day];
          const assignedCount = getAssignedCount(personnelData, week, day, clubName);
          const remainingPersonnelNum = personnelNum - assignedCount;
          const assigned = remainingPersonnelNum <= 0;
          schedule.push({
            week,
            day,
            personnelNum: remainingPersonnelNum > 0 ? remainingPersonnelNum : 0,
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

// Helper function to get the assigned count
const getAssignedCount = (personnelData, week, day, clubName) => {
  let assignedCount = 0;
  for (const userId in personnelData) {
    const userShifts = personnelData[userId].Shifts;
    if (userShifts && userShifts[week] && userShifts[week][day] && userShifts[week][day].clubName === clubName) {
      assignedCount++;
    }
  }
  return assignedCount;
};

export const fetchSecurityPersonnelFullNames = async (day, week) => {
  try {
    const personnelRef = ref(db, 'securityPersonnel');
    const snapshot = await get(personnelRef);
    if (snapshot.exists()) {
      const personnel = snapshot.val();
      const availablePersonnel = Object.values(personnel).filter(person => {
        const userShifts = person.Shifts;
        return !(userShifts && userShifts[week] && userShifts[week][day]);
      });
      const fullNames = availablePersonnel.map(person => person.fullName);
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

export const getAmountsForAllClubs = async () => {
  try {
    // Fetch all clubs
    const clubsRef = ref(db, 'Clubs');
    const clubsSnapshot = await get(clubsRef);
    if (!clubsSnapshot.exists()) {
      console.log('No clubs data available');
      return {};
    }
    const clubsData = clubsSnapshot.val();

    // Get the current week's and next week's date ranges
    const currentWeekRange = getCurrentWeekRange();
    const nextWeekRange = getNextWeekRange();

    // Initialize the result object
    const estimatedAmounts = {
      currentWeekRange,
      nextWeekRange,
      clubs: {}
    };

    // Iterate over all clubs
    for (const clubName in clubsData) {
      const financesRef = ref(db, `Clubs/${clubName}/Finances`);
      const financesSnapshot = await get(financesRef);
      if (!financesSnapshot.exists()) {
        //console.log(`No finances data available for club ${clubName}`);
        continue;
      }
      const financesData = financesSnapshot.val();

      // Extract the estimated amounts for the current week and next week
      const currentWeekAmounts = [];
      const nextWeekAmounts = [];

      if (financesData[currentWeekRange]) {
        for (const day in financesData[currentWeekRange]) {
          const dayData = financesData[currentWeekRange][day];
          if (dayData.amountDue) {
            currentWeekAmounts.push({
              day,
              amount: dayData.amountDue
            });
          }
        }
      }

      if (financesData[nextWeekRange]) {
        for (const day in financesData[nextWeekRange]) {
          const dayData = financesData[nextWeekRange][day];
          if (dayData.estimatedAmount) {
            nextWeekAmounts.push({
              day,
              amount: dayData.estimatedAmount
            });
          }
        }
      }

      // Only add the club to the result if there are amounts for either week
      if (currentWeekAmounts.length > 0 || nextWeekAmounts.length > 0) {
        estimatedAmounts.clubs[clubName] = {
          currentWeek: currentWeekAmounts,
          nextWeek: nextWeekAmounts
        };
      }
    }
    return estimatedAmounts;
  } catch (error) {
    console.error('Error fetching estimated amounts for all clubs:', error);
    return {};
  }
};
export const getAmountsForAllSecurityPersonnel = async () => {
  try {
    // Fetch all security personnel
    const personnelRef = ref(db, 'securityPersonnel');
    const personnelSnapshot = await get(personnelRef);
    if (!personnelSnapshot.exists()) {
      console.log('No security personnel data available');
      return {};
    }
    const personnelData = personnelSnapshot.val();

    // Get the current week's and next week's date ranges
    const currentWeekRange = getCurrentWeekRange();
    const nextWeekRange = getNextWeekRange();

    // Initialize the result object
    const amounts = {
      currentWeekRange,
      nextWeekRange,
      personnel: []
    };

    // Iterate over all security personnel
    for (const personnelId in personnelData) {
      const personnel = personnelData[personnelId];
      const finances = personnel.Finances;

      const currentWeekAmount = finances && finances[currentWeekRange] ? finances[currentWeekRange].actualAmount || 0 : 0;
      const nextWeekAmount = finances && finances[nextWeekRange] ? finances[nextWeekRange].estimatedAmount || 0 : 0;

      amounts.personnel.push({
        name: personnel.fullName,
        currentWeekAmount,
        nextWeekAmount
      });
    }

    return amounts;
  } catch (error) {
    console.error('Error fetching amounts for all security personnel:', error);
    return {};
  }
};

// Method to get shifts attended by a specific personnel for the current week
export const getShiftsForPersonnel = async (personnelName) => {
  try {
    // Fetch all security personnel
    const personnelRef = ref(db, 'securityPersonnel');
    const personnelSnapshot = await get(personnelRef);
    if (!personnelSnapshot.exists()) {
      console.log('No security personnel data available');
      return {};
    }
    const personnelData = personnelSnapshot.val();

    // Get the current week's date range
    const currentWeekRange = getCurrentWeekRange();

    // Find the personnel by name
    const personnel = Object.values(personnelData).find(p => p.fullName === personnelName);
    if (!personnel) {
      console.log(`No personnel found with name ${personnelName}`);
      return {};
    }

    // Get the shifts attended for the current week
    const shifts = personnel.Shifts && personnel.Shifts[currentWeekRange] ? personnel.Shifts[currentWeekRange] : {};
    const ratePerShift = personnel.rate || 0;

    // Create a shifts object with the rate for each day and calculate the total
    const shiftsWithAmounts = Object.keys(shifts).reduce((acc, day) => {
      if (shifts[day].attendance === "Attended") {
        acc[day] = ratePerShift;
      }
      return acc;
    }, {});

    // Calculate the total
    const total = Object.values(shiftsWithAmounts).reduce((sum, amount) => sum + amount, 0);

    return {
      shifts: shiftsWithAmounts,
      total,
      weekRange: currentWeekRange
    };
  } catch (error) {
    console.error('Error fetching shifts for personnel:', error);
    return {
      shifts: {},
      total: 0,
      weekRange: ''
    };
  }
};

export const getClubFinances = async (clubName) => {
  try {
    const dbRef = ref(db);

    // Get the date range for the current week
    const currentWeekRange = getCurrentWeekRange();

    // Fetch finances for the current week
    const currentWeekSnapshot = await get(child(dbRef, `Clubs/${clubName}/Finances/${currentWeekRange}`));
    const currentWeekFinances = currentWeekSnapshot.exists() ? currentWeekSnapshot.val() : {};

    // Process the results
    const result = {
      weekRange: currentWeekRange,
      finances: []
    };

    for (const day in currentWeekFinances) {
      const { amountDue = 0, estimatedAmount = 0 } = currentWeekFinances[day];
      result.finances.push({ day, amountDue, estimatedAmount });
    }

    return result; // Object containing the week range and list of all days with their amounts
  } catch (error) {
    console.error('Error fetching finances:', error);
    throw error;
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

  return `${startFormatted} to ${endFormatted}`;
}

// Helper function to get the current week's date range
const getCurrentWeekRange = () => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 7));
  const start = `${startOfWeek.getDate()}-${startOfWeek.getMonth() + 1}-${startOfWeek.getFullYear()}`;
  const end = `${endOfWeek.getDate()}-${endOfWeek.getMonth() + 1}-${endOfWeek.getFullYear()}`;
  return `${start} to ${end}`;
};