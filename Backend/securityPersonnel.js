import { ref, get } from 'firebase/database';
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
      if(week==weekDates){
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
    }});

    return personnelShifts;
  } catch (error) {
    throw new Error(`Fetching personnel shifts error: ${error.message}`);
  }
};

export const cancelShift = async (personnelName, date) => {
  try {
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
    const shiftsRef = ref(db, `securityPersonnel/${userId}/Shifts`);
    await remove(shiftsRef);
  } catch (error) {
    console.error('Error deleting club:', error);
  }
};