import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { getFinances } from '../../Backend/clubManager';

const clubManagerPayments = () => {
    const { club: clubParam } = useLocalSearchParams();
    const club = JSON.parse(decodeURIComponent(clubParam));
    const [thisWeekPayments, setThisWeekPayments] = useState([]);
    const [nextWeekPayments, setNextWeekPayments] = useState([]);
    const thisWeekDates = getWeekRange();
    const nextWeekDates = getNextWeekRange();

     useEffect(() => {
        setThisWeekPayments([]); 
        setNextWeekPayments([]); 
        loadFinancesThisWeek();
        loadFinancesNextWeek();
  }, [club.name, thisWeekDates, nextWeekDates]);

   // Function to load this week payments data
  const loadFinancesThisWeek = async () => {
    try {
      const financesThisWeek = await getFinances(club.name, thisWeekDates); 
      if (Array.isArray(financesThisWeek) && financesThisWeek.length > 0) {

      const sortedFinances = sortPaymentsByDay(financesThisWeek);

      setThisWeekPayments(sortedFinances);
    } else {
      console.warn("No finances to display.");
    }
    } catch (error) {
      console.error("Error fetching this week payments:", error);
    }
  };

     // Function to load next week payments data
  const loadFinancesNextWeek = async () => {
    try {
      const financesNextWeek = await getFinances(club.name, nextWeekDates); 
      if (Array.isArray(financesNextWeek) && financesNextWeek.length > 0) {

      const sortedFinances = sortPaymentsByDay(financesNextWeek);

      setNextWeekPayments(sortedFinances); // Set next week's payments
    } else {
      console.warn("No finances for next week to display.");
    }
    } catch (error) {
      console.error("Error fetching next week payments:", error);
    }
  };

  // Function to calculate the totals for amountDue and estimatedAmount
const calculateTotals = (payments) => {
  let totalAmountDue = 0;
  let totalEstimatedAmount = 0;

  if (payments) {
    payments.forEach(payment => {
      totalAmountDue += payment.amountDue || 0; 
      totalEstimatedAmount += payment.estimatedAmount || 0; 
    });
  }

  return {
    totalAmountDue,
    totalEstimatedAmount
  };
};

const thisWeekTotals = calculateTotals(thisWeekPayments);
  const nextWeekTotals = calculateTotals(nextWeekPayments);


  // Function to group finances by day
  const sortPaymentsByDay = (payments) => {
  if (!Array.isArray(payments) || payments.length === 0) {
    console.warn("No payments to sort.");
    return [];
  }

  // Define the order of days for sorting
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Sort based on the dayOrder array
  return payments.sort((a, b) => {
    const dayAIndex = dayOrder.indexOf(a.day);
    const dayBIndex = dayOrder.indexOf(b.day);

    // Sort by the index of the day in the week
    return dayAIndex - dayBIndex;
  });
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

   // Function to render payments in a table-like format
const renderPayments = (payments) => {
  const totalAmounts = calculateTotals(payments);
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Day</Text>
        <Text style={styles.tableHeaderText}>Estimated</Text>
        <Text style={styles.tableHeaderText}>Amount Due</Text>
      </View>

      {payments.map((payment, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCell}>{payment.day}</Text>
          <Text style={styles.tableCell}>
            R {payment.estimatedAmount.toFixed(2)}
          </Text>
          <Text style={styles.tableCell}>
            R {payment.amountDue.toFixed(2)}
          </Text>
        </View>
      ))}
      {/* Row for totals */}
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Total</Text>
        <Text style={styles.tableCell}>
          R {totalAmounts.totalEstimatedAmount.toFixed(2)}
        </Text>
        <Text style={styles.tableCell}>
          R {totalAmounts.totalAmountDue.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} style={styles.background}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Payments</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* Club Info */}
                    <View style={styles.clubInfo}>
                        <Text style={styles.clubName}>{club.name}</Text>
                        <Image source={images.neon} style={styles.clubLogo} resizeMode="contain" />
                    </View>

                    {/* This Week Payments */}
                    <View style={styles.paymentDetails}>
                        <Text style={styles.sectionTitle}>This Week's Payments</Text>
                        {Object.keys(thisWeekPayments).length > 0 ? (
                            renderPayments(thisWeekPayments)
                        ) : (
                            <Text style={styles.noPaymentsText}>No payments for this week.</Text>
                        )}
                    </View>

                    {/* Next Week Payments */}
                    <View style={styles.paymentDetails}>
                        <Text style={styles.sectionTitle}>Next Week's Payments</Text>
                        {Object.keys(nextWeekPayments).length > 0 ? (
                            renderPayments(nextWeekPayments)
                        ) : (
                            <Text style={styles.noPaymentsText}>No payments for next week.</Text>
                        )}
                    </View>

                    {/* Payment Button */}
                    <TouchableOpacity style={styles.paymentButton}>
                        <Text style={styles.paymentButtonText}>Make Payment</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
    },
    background: {
        height: '100%',
        width: '100%',
    },
    header: {
        width: '100%',
        padding: 15,
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
    scrollContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clubInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    clubName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    clubLogo: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    paymentDetails: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
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
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    dayText: {
        fontSize: 16,
        color: '#333',
    },
    amountText: {
        fontSize: 16,
        color: '#333',
    },
    paymentButton: {
        backgroundColor: '#E21A1A',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 20,
    },
    paymentButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default clubManagerPayments;
