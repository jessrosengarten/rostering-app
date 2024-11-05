import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

const EarningsHistory = () => {
  // Helper function to format date as "29 Jan 2024"
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  // Function to calculate the Monday and Sunday of a given week offset from the current week
  const calculateWeekRange = (weekOffset) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1) - 7 * weekOffset);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { monday: formatDate(monday), sunday: formatDate(sunday) };
  };

  // Generate the last four weeks' date ranges
  const earningsData = Array.from({ length: 4 }, (_, index) => {
    const { monday, sunday } = calculateWeekRange(index + 1);
    return {
      weekRange: `${monday} - ${sunday}`,
      ratePerShift: index % 2 === 0 ? 'R200.00' : 'R300.00', // Sample rate per shift
      numberOfShifts: 3 + index, // Sample number of shifts
      totalEarned: `R ${200 * (3 + index)}.00`, // Sample total earned
    };
  });

  return (
    <SafeAreaView edges={[]} style={styles.safeArea}>
      <ImageBackground source={images.background} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Earnings History</Text>
          </View>

          {earningsData.map((data, index) => (
            <View key={index} style={styles.earningsContainer}>
              <Text style={styles.sectionTitle}>{data.weekRange}</Text>
              <View style={styles.row}>
                <Text style={styles.labelText}>Rate per shift:</Text>
                <Text style={styles.valueText}>{data.ratePerShift}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Number of shifts:</Text>
                <Text style={styles.valueText}>{data.numberOfShifts}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Total earned:</Text>
                <Text style={styles.valueText}>{data.totalEarned}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default EarningsHistory;
