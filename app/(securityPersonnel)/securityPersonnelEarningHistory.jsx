import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import React from 'react'


const EarningsHistory = () => {
  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView contentContainerStyle={{ height: '100%' }}>

          {/* Semi-transparent Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Earnings History</Text>
          </View>

          {/* Earnings History Section */}
          <View style={styles.earningsContainer}>
            <Text style={styles.sectionTitle}>Week Ending</Text>
            <Text style={styles.sectionValue}>01/09/2024</Text>
            <Text style={styles.detailText}>Rate per shift:</Text>
            <Text style={styles.valueText}>R200.00</Text>
            <Text style={styles.detailText}>Number of shifts:</Text>
            <Text style={styles.valueText}> 4</Text>
            <Text style={styles.detailText}>Total earned:</Text>
            <Text style={styles.valueText}>R 800.00</Text>
          </View>

        <View style={styles.earningsContainer}>
            <Text style={styles.sectionTitle}>Week Ending</Text>
            <Text style={styles.sectionValue}>25/08/2024</Text>
            <Text style={styles.detailText}>Rate per shift:</Text>
            <Text style={styles.valueText}>R300.00</Text>
            <Text style={styles.detailText}>Number of shifts:</Text>
            <Text style={styles.valueText}>3</Text>
            <Text style={styles.detailText}>Total earned:</Text>
            <Text style={styles.valueText}>R 600.00</Text>
          </View>

          <View style={styles.earningsContainer}>
            <Text style={styles.sectionTitle}>Week Ending</Text>
            <Text style={styles.sectionValue}>18/08/2024</Text>
              <Text style={styles.detailText}>Rate per shift:</Text>
              <Text style={styles.valueText}>R200.00</Text>
              <Text style={styles.detailText}>Number of shifts:</Text>
              <Text style={styles.valueText}>5</Text>
              <Text style={styles.detailText}>Total earned:</Text>
              <Text style={styles.valueText}>R 1000.00</Text>
          </View>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  earningsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    alignItems: 'center',  
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
  marginBottom: 5,
  color: '#000',
  textAlign: 'center',  
},

detailText: {
  fontSize: 16,
  color: '#333',
  marginBottom: 2,
  fontWeight: 'bold',
},


valueText: {
fontSize: 16,
color: '#333',
},

textRow: {
/* flexDirection to separate heading and value in a row */
flexDirection: 'row', 
justifyContent: 'space-between', /* Space between heading and value */
width: '100%',
marginBottom: 5,
},

  
});

export default EarningsHistory
