import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { fetchFinancesByManager} from '../../Backend/clubManager';
import {  useLocalSearchParams } from 'expo-router';

const allClubsFinances = () => {
  const { managerName } = useLocalSearchParams();
   const [thisWeekPayments, setThisWeekAllPayments] = useState([]);
  const [nextWeekPayments, setNextAllPayments] = useState([]);
  const thisWeekDates = getWeekRange();
  const nextWeekDates = getNextWeekRange();

  useEffect(() => {
    setThisWeekAllPayments([]); 
    setNextAllPayments([]); 
    loadThisWeekAndNextWeekFinances();
    //loadNextWeekFinances();
  }, [managerName,thisWeekDates, nextWeekDates]);

  // Function to load payments data
const loadThisWeekAndNextWeekFinances = async () => {
  try {
    const finances = await fetchFinancesByManager(managerName);
    const thisWeekPayments = [];
    const nextWeekPayments = [];
    Object.entries(finances).forEach(([clubName, clubFinances]) => {
      clubFinances.forEach((finance) => {
        const { dateRange, rate, totalAmount, numberOfShifts,numberOfShiftsEstimate, totalAmountEstimate } = finance;

        // Add to this week if dateRange matches
        if (dateRange === thisWeekDates) {
          thisWeekPayments.push({
            clubName,
            rate: `R${parseFloat(rate).toFixed(2)}`, // Format the rate
            weekRange: dateRange || "No Date Range",
            totalAmount: `R${parseFloat(totalAmount).toFixed(2)}`, // Format total amount
            numberOfShifts: numberOfShifts || "0", // Include number of shifts
          });
        }

        // Add to next week if dateRange matches
        if (dateRange === nextWeekDates) {
          nextWeekPayments.push({
            clubName,
            rate: `R${parseFloat(rate).toFixed(2)}`, // Format the rate
            weekRange: dateRange || "No Date Range",
            totalAmount: `R${parseFloat(totalAmount).toFixed(2)}`, // Format total amount
            numberOfShifts: numberOfShifts || "0", // Include number of shifts
            numberOfShiftsEstimate: numberOfShiftsEstimate || "0", 
            estimateTotal:`R${parseFloat(totalAmountEstimate).toFixed(2)}`,
          });
        }
      });
    });

    // Set the results to state
    setThisWeekAllPayments(thisWeekPayments);
    setNextAllPayments(nextWeekPayments);
  } catch (error) {
    console.error("Error fetching finances:", error);
  }
};

// Function to load payments data
  const loadNextWeekFinances = async () => {
  try {
    const finances = await fetchFinancesByManager(managerName);

    // Flatten and format the data for display
    const formattedPayments = Object.entries(finances).flatMap(([clubName, clubFinances]) =>
      clubFinances.map((finance) => ({
        clubName,
        rate: `R${parseFloat(finance.rate).toFixed(2)}`, // Format the rate
        weekRange: finance.dateRange || "No Date Range", // Use dateRange from the finance object
        totalAmount: `R${parseFloat(finance.totalAmount).toFixed(2)}`, // Format the total amount
        numberOfShifts: finance.numberOfShifts || "0", // Include number of shifts
      }))
    );
    const uniquePayments = Array.from(new Map(formattedPayments.map(item => [item.clubName, item])).values());

    setNextAllPayments(uniquePayments);
  } catch (error) {
    console.error('Error fetching finances:', error);
  }
};


// Function to get the date range for the week
  function getWeekRange(date = new Date()) {
    const currentDate = new Date(date);

    const startOfWeekDay = 1; // Monday
    const currentDay = currentDate.getDay();

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - (currentDay - startOfWeekDay));

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const startFormatted = formatDate(startOfWeek);
    const endFormatted = formatDate(endOfWeek);

    return `${startFormatted} to ${endFormatted}`;
  }

   // fucntion to get the next weeks range
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

 return (
  <SafeAreaView edges={[]} style={styles.safeArea}>
    <ImageBackground source={images.background} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Payment History</Text>
        </View>

        {/* Container for This Week's Payments */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitleHeader}>This Week:</Text>
          <Text style={styles.sectionTitleHeader2}>{thisWeekDates}</Text>
          {thisWeekPayments.map((data, index) => (
            <View key={index} style={styles.earningsContainer}>
              <Text style={styles.sectionTitle}>{data.clubName}</Text>
              <View style={styles.row}>
                <Text style={styles.labelText}>Rate Per Shift:</Text>
                <Text style={styles.valueText}>{data.rate}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Number of Shifts:</Text>
                <Text style={styles.valueText}>{data.numberOfShifts}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Total Amount:</Text>
                <Text style={styles.valueText}>{data.totalAmount}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Container for Next Week's Payments */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitleHeader}>Next Week</Text>
          <Text style={styles.sectionTitleHeader2}>{nextWeekDates}</Text>
          {nextWeekPayments.map((data, index) => (
            <View key={index} style={styles.earningsContainer}>
              <Text style={styles.sectionTitle}>{data.clubName}</Text>
              <View style={styles.row}>
                <Text style={styles.labelText}>Rate Per Shift:</Text>
                <Text style={styles.valueText}>{data.rate}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Estimate Number of Shifts:</Text>
                <Text style={styles.valueText}>{data.numberOfShiftsEstimate}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Estimated Total:</Text>
                <Text style={styles.valueText}>{data.estimateTotal}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  sectionTitleHeader: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  marginHorizontal: 20,
  color: '#FF0000',
},
sectionTitleHeader2: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  marginHorizontal: 20,
  color: '#000',
},
sectionContainer: {
  marginBottom: 20,
  padding: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional for distinction
  borderRadius: 10,
  marginHorizontal: 20,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3,
},


  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
        backgroundColor: '#E21A1A',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
        backgroundColor: '#E21A1A',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
  safeArea: {
    flex: 1,
  },
  background: {
    height: '100%',
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  earningsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FF0000',
    textAlign: 'center',
  },
  sectionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: 10,
  },
  labelText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 16,
    color: '#333',
    width: 100,
  },
});

export default allClubsFinances;
