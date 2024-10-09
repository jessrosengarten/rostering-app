import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker'
import { icons, images } from "../../constants"; 

const AssignPersonnelManagement = () => {
  // Dummy data 
  const schedule = [
    { day: 'Thursday', personnel: '5 Security Personnel' },
    { day: 'Friday', personnel: '8 Security Personnel' },
    { day: 'Saturday', personnel: '12 Security Personnel' },
    { day: 'Sunday', personnel: '3 Security Personnel' },
  ];

  const renderScheduleItem = (item) => (
    <View style={styles.scheduleItem}>
      <Text style={styles.dayText}>{item.day}:</Text>
      
        {/* Text Display for Personnel */}
        <Text style={styles.personnelText}>{item.personnel}</Text>

      <TouchableOpacity style={styles.assignButton}>
        <Text style={styles.assignButtonText}>Assign</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        <ScrollView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerText}>Clarence</Text>
            </View>
            <Text style={styles.clubName}>Oasis Disco Bar</Text>
          </View>

          {/* Schedule List */}
          <View style={styles.scheduleContainer}>
            {schedule.map((item, index) => (
              <View key={index}>{renderScheduleItem(item)}</View>
            ))}
          </View>
        </ScrollView>

      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  clubName: {
    fontSize: 18,
    color: '#777',
  },
  scheduleContainer: {
    marginTop: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dayText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  personnelButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    flex: 2,
    alignItems: 'center',
    marginRight: 10,
  },
  personnelText: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
    flex:2,
  },
  assignButton: {
    backgroundColor: '#d0d0d0',
    padding: 10,
    borderRadius: 8,
  },
  assignButtonText: {
    fontSize: 14,
    color: '#000',
  },

  pickerContainer: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    width: '100%',
    alignSelf: 'stretch',
  },

});

export default AssignPersonnelManagement;
