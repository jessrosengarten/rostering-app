import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import React from 'react'

const Finances = () => {
  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView contentContainerStyle={{ height: '100%' }}>

          {/* Semi-transparent Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Finances</Text>
          </View>

          {/* Projected Weekly Earnings Section */}
                    <View style={styles.earningsContainer}>
                        <Text style={styles.sectionTitle}>Projected Weekly Earnings</Text>
                        <Text style={styles.dateRange}>29/08/2024 - 01/09/2024</Text>
                        <Text style={styles.detailText}>Rate per shift: </Text>
                        <Text style={styles.valueText}>R200.00</Text>
                        <Text style={styles.detailText}>Number of shifts:</Text>
                        <Text style={styles.valueText}> 4</Text>
                        <Text style={styles.detailText}>Total projected: </Text>
                        <Text style={styles.valueText}>R 800.00</Text>
                    </View>
                      {/* Previous Weeks Earnings Section */}
                      <View style={styles.earningsContainer}>
                        <Text style={styles.sectionTitle}>Previous Weeks Earnings</Text>
                        <Text style={styles.dateRange}>22/08/2024 - 25/08/2024</Text>
                        <Text style={styles.detailText}>Rate per shift:</Text>
                        <Text style={styles.valueText}>R200.00</Text>
                        <Text style={styles.detailText}>Number of shifts: </Text>
                        <Text style={styles.valueText}>3</Text>
                        <Text style={styles.detailText}>Total amount paid:</Text>
                        <Text style={styles.valueText}>R 600.00</Text>
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
},
dateRange: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
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

export default Finances

