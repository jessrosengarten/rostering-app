import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
import { images } from "../../constants";

// Main page for managing personnel assignment

const AssignPersonnelManagement = () => {
  const navigation = useNavigation(); // Initialize the navigation object

  // Dummy data 
  const schedule = [
    { day: 'Thursday', personnel: 5 },
    { day: 'Friday', personnel: 8 },
    { day: 'Saturday', personnel: 12 },
    { day: 'Sunday', personnel: 3 },
  ];

  // Handle navigation to the specific personnel assignment screen
  // Pass the selected day and number of personnel
  const handleAssignPress = (day, personnelCount) => {
    navigation.navigate('assignSpecificPersonnel', { day, personnelCount }); 
  };

  // Render each schedule item (day and number of personnel)
  const renderScheduleItem = (item) => (
    <View style={styles.scheduleItem}>
      <View style={styles.shiftBox}>
        <Text style={styles.dayText}>{item.day}:</Text>
        <Text style={styles.personnelText}>{item.personnel} Security Personnel</Text>
        <TouchableOpacity style={styles.assignButton} onPress={() => handleAssignPress(item.day, item.personnel)}>
          <Text style={styles.assignButtonText}>Assign</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        {/* Semi-transparent Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Assign Personnel</Text>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
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
    flexGrow: 1,
    padding: 20,
  },
  header: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  scheduleContainer: {
    marginTop: 20,
  },
  shiftBox: {
    backgroundColor: 'rgba(255, 255, 255, 255)',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  scheduleItem: {
    marginVertical: 10,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 2,
  },
  personnelText: {
    fontSize: 14,
    color: '#000',
    marginRight: 10,
    flex: 2,
  },
  assignButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  assignButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default AssignPersonnelManagement;
