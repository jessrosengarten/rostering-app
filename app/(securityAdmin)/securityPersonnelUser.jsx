import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import React from 'react'

// WHERE YOU CAN VIEW THE DOCUMENTS AND THE PROFILE
const SecurityPersonnelUser = () => {
  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
      <View style={styles.header}>
            <Text style={styles.headerText}>Security Personnel Documents</Text>
          </View>

        <ScrollView contentContainerStyle={{ height: '100%' }}>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default SecurityPersonnelUser

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
      color: 'red',
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