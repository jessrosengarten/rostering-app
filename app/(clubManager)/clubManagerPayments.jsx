import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { getFinances } from '../../Backend/clubManager';

const clubManagerPayments = () => {
    const router = useRouter();
    const { club: clubParam } = useLocalSearchParams();
    const club = JSON.parse(decodeURIComponent(clubParam));
    const [payments, setPayments] = useState([]);
    const thisWeekDates = getWeekRange();
    const nextWeekDates = getNextWeekRange();

     useEffect(() => {

  }, [club.name, thisWeekDates, nextWeekDates]);

   // Function to load personnel data
  const loadFinancesThisWeek = async () => {
    try {
      const financesThisWeek = await getFinances(club.name, thisWeekDates); 
      const groupedShifts = groupShiftsByDay(personnelDetails);
      setThisWeekPersonnelList(groupedShifts);
    } catch (error) {
      console.error("Error fetching personnel list:", error);
    }
  };

  // Function to group finances by day
  const groupShiftsByDay = (shifts) => {
    const grouped = {};

    shifts.forEach((person) => {
      const { day, email, shiftDetails } = person;

      // If the day is not in the grouped object, initialize it
      if (!grouped[day]) {
        grouped[day] = [];
      }

      // Add the person to the correct day group
      grouped[day].push({ email, ...shiftDetails, fullName: person.fullName });
    });

    return grouped;
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

    // Dummy data
    const paymentData = {
        clubName: 'Neon Night Club',
        clubLogo: images.neon, // Placeholder for club logo URL
        payments: {
            Thursday: 750.00,
            Friday: 950.00,
            Saturday: 500.00,
            Sunday: 1250.00,
        },
        total: 3450.00
    };

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className='h-full w-full'>
                {/* Semi-transparent Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Payments</Text>
                </View>
                <ScrollView contentContainerStyle={{ height: '100%' }}>

                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {/* Club Name and Logo */}
                        <View style={styles.clubInfo}>
                            <Text style={styles.clubName}>{paymentData.clubName}</Text>
                            <Image
                                source={paymentData.clubLogo}
                                style={styles.clubLogo}
                                resizeMode='contain'
                            />
                        </View>

                        {/* Payments List */}
                        <View style={styles.paymentDetails}>
                            <Text style={styles.sectionTitle}>Total Invoice to Pay</Text>
                            {Object.keys(paymentData.payments).map((day, index) => (
                                <View key={index} style={styles.paymentRow}>
                                    <Text style={styles.dayText}>{day}:</Text>
                                    <Text style={styles.amountText}>R {paymentData.payments[day].toFixed(2)}</Text>
                                </View>
                            ))}

                            {/* Total */}
                            <View style={styles.paymentRow}>
                                <Text style={[styles.dayText, { fontWeight: 'bold' }]}>Total for the Week:</Text>
                                <Text style={[styles.amountText, { fontWeight: 'bold', color: 'red' }]}>
                                    R {paymentData.total.toFixed(2)}
                                </Text>
                            </View>
                        </View>

                        {/* Payment Button */}
                        <TouchableOpacity style={styles.paymentButton}>
                            <Text style={styles.paymentButtonText}>Make Payment</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
