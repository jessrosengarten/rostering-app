import { db } from './firebaseConfig';
import { ref, get} from 'firebase/database';

export const getAmountsForAllDateRanges = async () => {
  try {
    // Fetch all clubs
    const clubsRef = ref(db, 'Clubs');
    const clubsSnapshot = await get(clubsRef);
    if (!clubsSnapshot.exists()) {
      console.log('No clubs data available');
      return {};
    }
    const clubsData = clubsSnapshot.val();

    const amountsByDateRange = {};
    for (const clubName in clubsData) {
      const financesRef = ref(db, `Clubs/${clubName}/Finances`);
      const financesSnapshot = await get(financesRef);

      if (!financesSnapshot.exists()) {
        continue;
      }
      const financesData = financesSnapshot.val();

      for (const dateRange in financesData) {
        const daysData = financesData[dateRange];

        if (!amountsByDateRange[dateRange]) {
          amountsByDateRange[dateRange] = {
            totalAmountDue: 0,
            totalEstimatedAmount: 0
          };
        }

        for (const day in daysData) {
          const dayData = daysData[day];
          if (dayData.amountDue) {
            amountsByDateRange[dateRange].totalAmountDue += dayData.amountDue;
          }
          if (dayData.estimatedAmount) {
            amountsByDateRange[dateRange].totalEstimatedAmount += dayData.estimatedAmount;
          }
        }
      }
    }

    return amountsByDateRange;
  } catch (error) {
    console.error('Error fetching amounts for all date ranges:', error);
    return {};
  }
};

// Method to get all security personnel amounts
export const getAllAmountsForSecurityPersonnel = async () => {
  try {
    // Fetch all security personnel
    const personnelRef = ref(db, 'securityPersonnel');
    const personnelSnapshot = await get(personnelRef);

    if (!personnelSnapshot.exists()) {
      console.log('No security personnel data available');
      return {};
    }

    const personnelData = personnelSnapshot.val();

    // Initialize the result object
    const amounts = {};

    // Iterate over all security personnel
    for (const personnelId in personnelData) {
      const personnel = personnelData[personnelId];
      const finances = personnel.Finances;

      if (finances) {
        // Iterate over all date ranges in the finances node
        for (const dateRange in finances) {
          const financeData = finances[dateRange];
          const actualAmount = financeData.actualAmount || 0;
          const estimatedAmount = financeData.estimatedAmount || 0;

          // Ensure the date range exists in the result object
          if (!amounts[dateRange]) {
            amounts[dateRange] = {
              totalAmountDue: 0,
              totalEstimatedAmount: 0,
            };
          }

          // Aggregate the amounts
          amounts[dateRange].totalAmountDue += actualAmount;
          amounts[dateRange].totalEstimatedAmount += estimatedAmount;
        }
      }
    }

    return amounts;
  } catch (error) {
    console.error('Error fetching all amounts for security personnel:', error);
    return {};
  }
};
