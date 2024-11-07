import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

const Finances = () => {
  // Get the current date
  const currentDate = new Date();

  // Calculate current week's Monday and Friday
  const currentDay = currentDate.getDay();
  const currentMonday = new Date(currentDate);
  currentMonday.setDate(currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
  const currentFriday = new Date(currentMonday);
  currentFriday.setDate(currentMonday.getDate() + 4);

  // Calculate the previous week's Monday to Sunday for "Previous Weekly Earnings"
  const lastMonday = new Date(currentMonday);
  lastMonday.setDate(currentMonday.getDate() - 7);
  const lastSunday = new Date(lastMonday);
  lastSunday.setDate(lastMonday.getDate() + 6);

  // Format dates as "29 Jan 2024"
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const projectedWeekRange = `${formatDate(currentMonday)} - ${formatDate(currentFriday)}`;
  const previousWeekRange = `${formatDate(lastMonday)} - ${formatDate(lastSunday)}`;

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.background}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Finances</Text>
          </View>

          {/* Projected Weekly Earnings Section */}
          <View style={styles.earningsContainer}>
            <Text style={styles.sectionTitle}>Projected Weekly Earnings</Text>
            <Text style={styles.dateRange}>{projectedWeekRange}</Text>
            <View style={styles.row}>
              <Text style={styles.labelText}>Rate per shift:</Text>
              <Text style={styles.valueText}>R200.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Number of shifts:</Text>
              <Text style={styles.valueText}>4</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Total projected:</Text>
              <Text style={styles.valueText}>R 800.00</Text>
            </View>
          </View>

          {/* Previous Weeks Earnings Section */}
          <View style={styles.earningsContainer}>
            <Text style={styles.sectionTitle}>Previous Weekly Earnings</Text>
            <Text style={styles.dateRange}>{previousWeekRange}</Text>
            <View style={styles.row}>
              <Text style={styles.labelText}>Rate per shift:</Text>
              <Text style={styles.valueText}>R200.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Number of shifts:</Text>
              <Text style={styles.valueText}>3</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Total amount paid:</Text>
              <Text style={styles.valueText}>R 600.00</Text>
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
