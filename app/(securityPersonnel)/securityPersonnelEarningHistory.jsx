import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { getAllFinances} from '../../Backend/securityPersonnel';
import { useRouter, useLocalSearchParams } from 'expo-router';

const EarningsHistory = () => {
  const router = useRouter();
  const [allPayments, setAllPayments] = useState([]);
  const { personnelName } = useLocalSearchParams();

  useEffect(() => {
    setAllPayments([]); 
    loadFinances();
  }, [personnelName]);

  // Function to load payments data
  const loadFinances = async () => {
  try {
    const financesThisWeek = await getAllFinances(personnelName);

    // Map the response to match the structure required by the component
    const formattedPayments = financesThisWeek.map((finance) => {
      const ratePerShift = parseFloat(finance.rate); // Parse rate as a float
      const actualAmount = finance.actualAmount;

      // Calculate number of shifts dynamically
      const numberOfShifts = actualAmount / ratePerShift;

      return {
        weekRange: finance.dateRange,
        ratePerShift: `R${ratePerShift.toFixed(2)}`, // Format as currency
        numberOfShifts: numberOfShifts.toFixed(0), // Rounded to nearest whole number
        totalEarned: `R${actualAmount.toFixed(2)}`, // Format as currency
      };
    });

    setAllPayments(formattedPayments);
  } catch (error) {
    console.error("Error fetching finances:", error);
  }
};

const handleBack = () => {
    router.push(`/securityPersonnelFinances?personnelName=${personnelName}`)
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
