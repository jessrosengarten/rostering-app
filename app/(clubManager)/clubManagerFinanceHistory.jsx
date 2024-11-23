import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { getAllFinances } from '../../Backend/clubManager';
import { useRouter, useLocalSearchParams } from 'expo-router';

const FinanceHistory = () => {
  const router = useRouter();
  const [allPayments, setAllPayments] = useState([]);
  const { club: clubParam } = useLocalSearchParams();
  const club = JSON.parse(decodeURIComponent(clubParam));

  useEffect(() => {
    setAllPayments([]);
    loadFinances();
  }, [club.name]);

  // Function to load payments data
  const loadFinances = async () => {
    try {
      const finances = await getAllFinances(club.name);

      // Format data for display
      const formattedPayments = finances.map((finance) => ({
        rate: `R${parseFloat(finance.rate)}`,
        weekRange: finance.dateRange, // Keep date range as-is
        totalAmount: `R${finance.totalAmount.toFixed(2)}`, // Format totalAmount as currency,
        numberOfShifts: finance.numberOfShifts,
      }));

      setAllPayments(formattedPayments);
    } catch (error) {
      console.error("Error fetching finances:", error);
    }
  };

  const handleBack = () => {
    router.push(`/clubManagerPayments?club=${encodeURIComponent(JSON.stringify(club))}`)
  };

  return (
    <SafeAreaView edges={[]} style={styles.safeArea}>
      <ImageBackground source={images.background} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Earnings History</Text>
          </View>

          {allPayments.map((data, index) => (
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleBack}>
              <Text style={styles.buttonText}>Back</Text>
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

export default FinanceHistory;
