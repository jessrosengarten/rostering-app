import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { getFinances} from '../../Backend/securityPersonnel';
import { useRouter, useLocalSearchParams } from 'expo-router';

const Finances = () => {
  const thisWeekDates = getWeekRange();
  const nextWeekDates = getNextWeekRange();
  const [thisWeekPayments, setThisWeekPayments] = useState([]);
  const [nextWeekPayments, setNextWeekPayments] = useState([]);
  const { personnelName } = useLocalSearchParams();

  useEffect(() => {
    setThisWeekPayments([]); 
    setNextWeekPayments([]); 
    loadFinancesThisWeek();
    loadFinancesNextWeek();
  }, [personnelName, thisWeekDates, nextWeekDates]);

  // Function to load this week payments data
  const loadFinancesThisWeek = async () => {
    try {
      const financesThisWeek = await getFinances(personnelName, thisWeekDates); 
      setThisWeekPayments(financesThisWeek);
    } catch (error) {
      console.error("Error fetching this week payments:", error);
    }
  };

   // Function to load next week payments data
  const loadFinancesNextWeek = async () => {
    try {
      const financesNextWeek = await getFinances(personnelName, nextWeekDates); 
      setNextWeekPayments(financesNextWeek); 
    } catch (error) {
      console.error("Error fetching next week payments:", error);
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
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.background}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Finances</Text>
          </View>

          {/* Projected Weekly Earnings Section */}
          <View style={styles.earningsContainer}>
            <Text style={styles.sectionTitle}>This Weeks Earnings</Text>
            <Text style={styles.dateRange}>{thisWeekDates}</Text>
            <View style={styles.row}>
              <Text style={styles.labelText}>Rate per shift:</Text>
              <Text style={styles.valueText}>R {thisWeekPayments.rate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Number of shifts:</Text>
              <Text style={styles.valueText}>4</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Estimated Amount:</Text>
              <Text style={styles.valueText}>R {thisWeekPayments.estimatedAmount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Actual Amount:</Text>
              <Text style={styles.valueText}>R {thisWeekPayments.actualAmount}</Text>
            </View>
          </View>

          {/* Previous Weeks Earnings Section */}
          <View style={styles.earningsContainer}>
            <Text style={styles.sectionTitle}>Next Weeks Projected Earnings</Text>
            <Text style={styles.dateRange}>{nextWeekDates}</Text>
            <View style={styles.row}>
              <Text style={styles.labelText}>Rate per shift:</Text>
              <Text style={styles.valueText}>R{nextWeekPayments.rate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Number of shifts:</Text>
              <Text style={styles.valueText}>3</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Estimated Amount:</Text>
              <Text style={styles.valueText}>R {nextWeekPayments.estimatedAmount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Actual Amount:</Text>
              <Text style={styles.valueText}>R {nextWeekPayments.actualAmount}</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  earningsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  dateRange: {
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
  background: {
    height: '100%',
    width: '100%',
  },
});

export default Finances;
