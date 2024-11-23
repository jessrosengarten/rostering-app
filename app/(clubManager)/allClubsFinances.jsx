import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { fetchFinancesByManager} from '../../Backend/clubManager';
import { useRouter, useLocalSearchParams } from 'expo-router';

const allClubsFinances = () => {
  const router = useRouter();
  const { managerName } = useLocalSearchParams();
   const [thisWeekPayments, setThisWeekAllPayments] = useState([]);
  const [nextWeekPayments, setNextAllPayments] = useState([]);
  const thisWeekDates = getWeekRange();
  const nextWeekDates = getNextWeekRange();
  const { club: clubParam } = useLocalSearchParams();
    const club = JSON.parse(decodeURIComponent(clubParam));

  useEffect(() => {
    setThisWeekAllPayments([]); 
    setNextAllPayments([]); 
    loadThisWeekFinances();
    loadNextWeekFinances();
  }, [managerName,thisWeekDates, nextWeekDates]);

  // Function to load payments data
  const loadThisWeekFinances = async () => {
  try {
    const finances = await fetchFinancesByManager(managerName, thisWeekDates);

    // Format data for display
    const formattedPayments = finances.map((finance) => ({
      rate : `R${parseFloat(finance.rate)}`,
      weekRange: finance.dateRange, // Keep date range as-is
      totalAmount: `R${finance.totalAmount.toFixed(2)}`, // Format totalAmount as currency,
      numberOfShifts: finance.numberOfShifts,
    }));

    setAllPayments(formattedPayments);
  } catch (error) {
    console.error("Error fetching finances:", error);
  }
};

// Function to load payments data
  const loadNextWeekFinances = async () => {
  try {
    const finances = await fetchFinancesByManager(managerName, nextWeekDates);

    // Format data for display
    const formattedPayments = finances.map((finance) => ({
      rate : `R${parseFloat(finance.rate)}`,
      weekRange: finance.dateRange, // Keep date range as-is
      totalAmount: `R${finance.totalAmount.toFixed(2)}`, // Format totalAmount as currency,
      numberOfShifts: finance.numberOfShifts,
    }));

    setAllPayments(formattedPayments);
  } catch (error) {
    console.error("Error fetching finances:", error);
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
            <Text style={styles.headerText}>Earnings History</Text>
          </View>

          {thisWeekPayments.map((data, index) => (
            <View key={index} style={styles.earningsContainer}>
              <Text style={styles.sectionTitle}>{data.weekRange || "No Date Range"}</Text>
              <View style={styles.row}>
                <Text style={styles.labelText}>Rate Per Shift:</Text>
                <Text style={styles.valueText}>{data.rate || "R0.00"}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Number of shifts:</Text>
                <Text style={styles.valueText}>{data.numberOfShifts || "0"}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Total Amount:</Text>
                <Text style={styles.valueText}>{data.totalAmount || "R0.00"}</Text>
              </View>
            </View>
          ))}
          {nextWeekPayments.map((data, index) => (
            <View key={index} style={styles.earningsContainer}>
              <Text style={styles.sectionTitle}>{data.weekRange || "No Date Range"}</Text>
              <View style={styles.row}>
                <Text style={styles.labelText}>Rate Per Shift:</Text>
                <Text style={styles.valueText}>{data.rate || "R0.00"}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Number of shifts:</Text>
                <Text style={styles.valueText}>{data.numberOfShifts || "0"}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Total Amount:</Text>
                <Text style={styles.valueText}>{data.totalAmount || "R0.00"}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    color: '#000',
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
