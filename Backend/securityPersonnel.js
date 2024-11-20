import { ref, get,child, remove, set } from 'firebase/database';
import { db } from './firebaseConfig'; // Adjust the import according to your project structure

export const fetchPersonnelShifts = async (personnelName, weekDates) => {
  try {
    // Fetch all security personnel to find the user with the matching fullName
    const personnelRef = ref(db, 'securityPersonnel');
    const snapshot = await get(personnelRef);
    if (!snapshot.exists()) {
      throw new Error('No security personnel data available');
    }

    const personnel = snapshot.val();
    let userId = null;

    // Find the user with the matching fullName
    Object.keys(personnel).forEach(key => {
      if (personnel[key].fullName === personnelName) {
        userId = key;
      }
    });

    if (!userId) {
      throw new Error(`No user found with the name ${personnelName}`);
    }

    // Fetch the shifts for the found user
    const shiftsRef = ref(db, `securityPersonnel/${userId}/Shifts`);
    const shiftsSnapshot = await get(shiftsRef);
    if (!shiftsSnapshot.exists()) {
      throw new Error('No shifts data available');
    }

    const shifts = shiftsSnapshot.val();
    const personnelShifts = [];

    Object.keys(shifts).forEach(week => {
      if (week == weekDates) {
        const days = shifts[week];
        const [startDateStr] = week.split(' to ');
        const startDate = new Date(startDateStr.split('-').reverse().join('-'));
        Object.keys(days).forEach(day => {
          const dayOffset = {
            Monday: 0,
            Tuesday: 1,
            Wednesday: 2,
            Thursday: 3,
            Friday: 4,
            Saturday: 5,
            Sunday: 6
          }[day];
          const shiftDate = new Date(startDate);
          shiftDate.setDate(startDate.getDate() + dayOffset);
          const formattedDate = shiftDate.toLocaleDateString('en-GB').split('/').join('-'); // Format date as dd-MM-yyyy
          personnelShifts.push({
            week,
            day,
            date: formattedDate,
            ...days[day]
          });
        });
      }
    });

    return personnelShifts;
  } catch (error) {
    throw new Error(`Fetching personnel shifts error: ${error.message}`);
  }
};

export const cancelShift = async (personnelName, date, day) => {
  try {
    let userId = null;
    let rate = 0;

    const personnelRef = ref(db, 'securityPersonnel');
    const snapshot = await get(personnelRef);
    const personnel = snapshot.val();

    // Find the user with the matching fullName
    Object.keys(personnel).forEach(key => {
      if (personnel[key].fullName === personnelName) {
        userId = key;
        rate = personnel[key].rate; 
      }
    });

    if (!userId) {
      throw new Error(`No user found with the name ${personnelName}`);
    }

    const shiftsRef = ref(db, `securityPersonnel/${userId}/Shifts/${date}/${day}`);
    await remove(shiftsRef);
    // Count the number of days in the week for which shifts are assigned
    const weekShiftsRef = ref(db, `securityPersonnel/${userId}/Shifts/${date}`);
    const weekShiftsSnapshot = await get(weekShiftsRef);
    const daysInWeek = weekShiftsSnapshot.exists() ? Object.keys(weekShiftsSnapshot.val()).length : 0;

    // Calculate the estimated amount
    const estimatedAmount = daysInWeek * rate;

    // Save the estimated amount under the correct path
    const financesRef = ref(db, `securityPersonnel/${userId}/Finances/${date}/estimatedAmount`);
    await set(financesRef, estimatedAmount);
    console.log(`Shift canceled: ${shiftsRef}`);
  } catch (error) {
    console.error('Error deleting club:', error);
  }
};

// Function to check for available personnel for the selected shift's date
export const checkAvailablePersonnel = async (user, shift) => {
  try {
    const personnelRef = ref(db, 'securityPersonnel');
    const snapshot = await get(personnelRef);

    if (!snapshot.exists()) {
      throw new Error('No personnel data found.');
    }

    // Filter out personnel who are already assigned on this shift's date and day
    const availablePersonnel = [];
    
    snapshot.forEach((personnelSnapshot) => {
      const personnel = personnelSnapshot.val();
      const shifts = personnel.Shifts || {};

      let isAssigned = false;  // Flag to track if the personnel is assigned on this day

      // Check if the shift range includes the given shift's date and day
      for (let range in shifts) {
        const days = shifts[range]; // Array of days (e.g., Monday, Thursday, Wednesday)

        // If the shift's day is in the list of assigned days for this range, they are not available
        if (days.hasOwnProperty(shift.day)) {
          isAssigned = true;
          break; // Exit the loop if a conflict is found
        }
      }

      // If no conflicts are found (isAssigned is still false), add the personnel to the available list
      if (!isAssigned && user!==personnel.fullName) {
        availablePersonnel.push(personnel.fullName);
      }
    });

    return availablePersonnel;
  } catch (error) {
    console.error('Error fetching personnel:', error);
    throw error;
  }
};

export const reassignShiftToPersonnel = async (personnelName, clubName, week, day, startTime) => {
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

export const getFinances = async (personnelName, dateRange) => {
  try {
    let userId = null;
    let rate = 0;

    const personnelRef = ref(db, 'securityPersonnel');
    const snapshot = await get(personnelRef);
    const personnel = snapshot.val();

    // Find the user with the matching fullName
    Object.keys(personnel).forEach(key => {
      if (personnel[key].fullName === personnelName) {
        userId = key;
        rate = personnel[key].rate;
      }
    });

    if (!userId) {
      throw new Error(`No user found with the name ${personnelName}`);
    }

    const financeRef = ref(db, `securityPersonnel/${userId}/Finances/${dateRange}`);
    const financeSnapshot = await get(financeRef);

    if (financeSnapshot.exists()) {
      const finances = financeSnapshot.val();
      const result = {
        actualAmount: finances.actualAmount || 0,
        estimatedAmount: finances.estimatedAmount || 0, 
        rate: rate || 0,
      };
      return result;
    } else {
      console.warn('No finances found for the given date range.');
      return { actualAmount: 0, estimatedAmount: 0 , rate: rate || 0 };
    }
  } catch (error) {
    console.error('Error fetching finances:', error);
    throw error;
  }
};

