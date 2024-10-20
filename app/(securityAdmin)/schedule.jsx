import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

const Schedule = () => {

  // State for selected day
  const [selectedDay, setSelectedDay] = useState('');

  // Dummy data for the schedule
  const scheduleData = {
    Monday: [{ name: 'Arnold', club: 'Omnia' }, { name: 'Ben', club: 'Moon' }],
    Tuesday: [{ name: 'Cleo', club: 'Zest' }, { name: 'Dave', club: 'Moon' }],
    Wednesday: [{ name: 'Daniella', club: 'Zest' }, { name: 'Fred', club: 'Omnia' }],
    Thursday: [{ name: 'Arnold', club: 'Omnia' }, { name: 'Cleo', club: 'Zest' }],
    Friday: [{ name: 'Arnold', club: 'Omnia' }, { name: 'Daniella', club: 'Zest' }, { name: 'Fred', club: 'Omnia' }],
    Saturday: [{ name: 'Arnold', club: 'Omnia' }, { name: 'Daniella', club: 'Zest' }, { name: 'Fred', club: 'Omnia' }],
    Sunday: [{ name: 'Arnold', club: 'Omnia' }, { name: 'Daniella', club: 'Zest' }, { name: 'Fred', club: 'Omnia' }]
  };

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.background}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          {/* Semi-transparent Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Schedule</Text>
          </View>

          {/* RNPicker to select day */}
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select a day:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedDay(value)}
              items={[
                { label: 'Monday', value: 'Monday' },
                { label: 'Tuesday', value: 'Tuesday' },
                { label: 'Wednesday', value: 'Wednesday' },
                { label: 'Thursday', value: 'Thursday' },
                { label: 'Friday', value: 'Friday' },
                { label: 'Saturday', value: 'Saturday' },
                { label: 'Sunday', value: 'Sunday' },
              ]}
              value={selectedDay}
              placeholder={{ label: 'Select a day...', value: '' }}
              style={pickerSelectStyles}
            />
          </View>

          {/* Schedule List */}
          <View style={styles.scheduleContainer}>
            {selectedDay ? (
              scheduleData[selectedDay].map((person, index) => (
                <View key={index} style={styles.scheduleItem}>
                  <Text style={styles.nameText}>{person.name}</Text>
                  <Text style={styles.clubText}>{person.club}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noScheduleText}>No day selected. Please choose a day to see the schedule.</Text>
            )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  scheduleContainer: {
    padding: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'rgba(226, 26, 26, 0.2)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  clubText: {
    fontSize: 16,
    color: '#555',
  },
  noScheduleText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 50,
  },
});

// RNPickerSelect Styles
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    color: '#333',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    color: '#333',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
};

export default Schedule;
