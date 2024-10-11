import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import React, { useState } from 'react';

const Schedule = () => {

   // State for selected day
   const [selectedDay, setSelectedDay] = useState('Friday');

     // Dummy data for the schedule
  const scheduleData = {
    Monday: [{ name: 'Arnold', club: 'Omnia' }, { name: 'Ben', club: 'Moon' }],
    Tuesday: [{ name: 'Cleo', club: 'Zest' }, { name: 'Dave', club: 'Moon' }],
    Wednesday: [{ name: 'Daniella', club: 'Zest' }, { name: 'Fred', club: 'Omnia' }],
    Thursday: [{ name: 'Arnold', club: 'Omnia' }, { name: 'Cleo', club: 'Zest' }],
    Friday: [{ name: 'Arnold', club: 'Omnia' }, { name: 'Daniella', club: 'Zest' }, { name: 'Fred', club: 'Omnia' }]
  };


  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          {/* Semi-transparent Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Schedule</Text>
          </View>
          {/* Schedule List */}
          <View style={styles.scheduleContainer}>
            {scheduleData[selectedDay].map((person, index) => (
              <View key={index} style={styles.scheduleItem}>
                <Text style={styles.nameText}>{person.name}</Text>
                <Text style={styles.clubText}>{person.club}</Text>
              </View>
            ))}
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
  dropdownContainer: {
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
  },
  scheduleContainer: {
    padding: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },

  clubName: {
      fontSize: 18,
      fontWeight: 'bold',
  },

  buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 5,
  },

  assignButton: {
      backgroundColor: '#E21A1A',
      paddingVertical: 5,
      paddingHorizontal: 8,
      borderRadius: 5,
      marginHorizontal: 5,
      alignItems: 'center',
  },

  paymentButton: {
      backgroundColor: '#FFD700',
      paddingVertical: 5,
      paddingHorizontal:  8,
      borderRadius: 5,
      alignItems: 'center',
  },
  buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 10,
  },
  
});

export default Schedule
