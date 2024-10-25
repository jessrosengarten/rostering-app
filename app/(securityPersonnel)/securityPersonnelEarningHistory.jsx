import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import React from 'react';

const EarningsHistory = () => { 
  return (
    <SafeAreaView edges={[]} style={styles.safeArea}>
      <ImageBackground source={images.background} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Earnings History</Text>
          </View>

          {/* Earnings History Section */}
          <View style={styles.earningsContainer}>
            <Text style={styles.sectionTitle}>Week Ending</Text>
            <Text style={styles.sectionValue}>01/09/2024</Text>
            <View style={styles.row}>
              <Text style={styles.labelText}>Rate per shift:</Text>
              <Text style={styles.valueText}>R200.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Number of shifts:</Text>
              <Text style={styles.valueText}>4</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Total earned:</Text>
              <Text style={styles.valueText}>R 800.00</Text>
            </View>
          </View>

          <View style={styles.earningsContainer}>
            <Text style={styles.sectionTitle}>Week Ending</Text>
            <Text style={styles.sectionValue}>25/08/2024</Text>
            <View style={styles.row}>
              <Text style={styles.labelText}>Rate per shift:</Text>
              <Text style={styles.valueText}>R300.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Number of shifts:</Text>
              <Text style={styles.valueText}>3</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Total earned:</Text>
              <Text style={styles.valueText}>R 600.00</Text>
            </View>
          </View>

          <View style={styles.earningsContainer}>
            <Text style={styles.sectionTitle}>Week Ending</Text>
            <Text style={styles.sectionValue}>18/08/2024</Text>
            <View style={styles.row}>
              <Text style={styles.labelText}>Rate per shift:</Text>
              <Text style={styles.valueText}>R200.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Number of shifts:</Text>
              <Text style={styles.valueText}>5</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelText}>Total earned:</Text>
              <Text style={styles.valueText}>R 1000.00</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensure the SafeAreaView takes the full height of the screen
  },
  background: {
    height: '100%',
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1, // Allow the content to grow and enable scrolling
    paddingBottom: 20, // Optional: Add bottom padding for better visibility
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
    fontSize: 18,
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
  },
  valueText: {
    fontSize: 16,
    color: '#333',
    width: 100,
  },
});


export default EarningsHistory;