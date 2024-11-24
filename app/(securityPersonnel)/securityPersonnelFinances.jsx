import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { getFinances} from '../../Backend/securityPersonnel';
import { useRouter, useLocalSearchParams } from 'expo-router';

const Finances = () => {
  const router = useRouter();
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
      console.log(nextWeekPayments);
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
    const diff = (currentDay === 0 ? 6 : currentDay - startOfWeekDay);
    startOfWeek.setDate(currentDate.getDate() - diff);

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
    const diff = (currentDay === 0 ? 6 : currentDay - startOfWeekDay); 
    startOfNextWeek.setDate(currentDate.getDate() - diff + 7);

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

  const handleViewHistory = () => {
    router.push(`/securityPersonnelEarningHistory?personnelName=${personnelName}`)
  };

  const renderthisWeekPayments = (title, dateRange, payments) => {
    return (
      <View style={styles.tableContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.dateRange}>{dateRange}</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Rate per shift: R {(payments.rate || 0)}</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}></Text>
          <Text style={styles.tableHeaderText}>Number of shifts</Text>
          <Text style={styles.tableHeaderText}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Estimated Amount: </Text>
          <Text style={styles.tableCell}>{(payments.estimatedAmount / payments.rate || 0)}</Text>
          <Text style={styles.tableCell}>R {(payments.estimatedAmount || 0).toFixed(2)}</Text>
        </View>
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Actual Amount: </Text>
            <Text style={styles.tableCell}>{(payments.actualAmount / payments.rate || 0)} </Text>
            <Text style={styles.tableCell}>R {(payments.actualAmount || 0).toFixed(2)}</Text>
          </View>
      </View>
    );
  };

  const rendernextWeekPayments = (title,dateRange, payments) => {
    return (
      <View style={styles.tableContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.dateRange}>{dateRange}</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Rate per shift: R {(payments.rate || 0)}</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}></Text>
          <Text style={styles.tableHeaderText}>Number of shifts</Text>
          <Text style={styles.tableHeaderText}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Estimated Amount: </Text>
          <Text style={styles.tableCell}>{(payments.estimatedAmount / payments.rate || 0)}</Text>
          <Text style={styles.tableCell}>R {(payments.estimatedAmount || 0).toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.background}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Finances</Text>
          </View>

          {/* Projected Weekly Earnings Section */}
          <View style={styles.earningsContainer}>
            {renderthisWeekPayments("This Week's Earnings", thisWeekDates, thisWeekPayments)}
          </View>

          {/* Previous Weeks Earnings Section */}
          <View style={styles.earningsContainer}>
            {rendernextWeekPayments("Next Week's Projected Earnings", nextWeekDates, nextWeekPayments)}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleViewHistory}>
              <Text style={styles.buttonText}>View Finance History</Text>
            </TouchableOpacity>
          </View>
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
  tableContainer: {
    marginTop: 10,             
    paddingHorizontal: 10,  
  },
  tableHeader: {
    flexDirection: 'row',    
    backgroundColor: '#f0f0f0', 
    paddingVertical: 10,      
    borderBottomWidth: 1,  
    borderColor: '#ccc',   
  },
  tableHeaderText: {
    flex: 1,                  
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,   
  },
  tableRow: {
    flexDirection: 'row', 
    paddingVertical: 12,   
    borderBottomWidth: 1,  
    borderColor: '#e0e0e0', 
  },
  tableCell: {
    flex: 1,                    
    textAlign: 'center',  
    fontSize: 16,  
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
