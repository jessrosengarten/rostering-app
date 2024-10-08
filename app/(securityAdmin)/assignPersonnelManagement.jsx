import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
      <TouchableOpacity style={styles.personnelButton}>
        <Text style={styles.personnelText}>{item.personnel}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.assignButton}>
        {/* Black triangle button */}
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
              <Image source={icons.profile} style={styles.profileIcon} />
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

        {/* Bottom Navigation */}
        <View style={styles.bottomMenu}>
          <TouchableOpacity>
            <Image source={icons.home} style={styles.menuIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icons.schedule} style={styles.menuIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icons.finance} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
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
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
});

export default AssignPersonnelManagement;
