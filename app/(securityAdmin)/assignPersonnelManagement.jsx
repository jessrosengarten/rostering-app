import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { images } from "../../constants";
import { fetchPersonnelNeeded } from '../../Backend/securityAdmin';

const AssignPersonnelManagement = () => {
  const { clubName, club } = useLocalSearchParams();
  const [schedule, setSchedule] = useState([]);
  const router = useRouter();

  const fetchSchedule = async () => {
    try {
      const fetchedSchedule = await fetchPersonnelNeeded(clubName);
      setSchedule(fetchedSchedule);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [clubName]);

  useEffect(() => {
    const handleRouteChange = () => {
      fetchSchedule();
    };

    // Simulate route change detection
    const interval = setInterval(handleRouteChange, 1000);

    return () => clearInterval(interval);
  }, [clubName]);

  const handleAssignPress = (week, day, personnelCount, openingTime) => {
    router.push({
      pathname: 'assignSpecificPersonnel',
      params: { week, day, personnelCount, clubName, startTime: openingTime, club }
    });
  };

  const renderScheduleItem = (item) => (
    <View style={styles.scheduleItem} key={`${item.week}-${item.day}`}>
      <View style={styles.shiftBox}>
        <View style={styles.textContainer}>
          <Text style={styles.dayText}>{item.day}:</Text>
          <Text style={styles.personnelText}>{item.personnelNum} Security Personnel To Assign</Text>
          <Text>Week: {item.week}</Text>
          <Text>Opening Time: {item.openingTime}</Text>
        </View>
        <TouchableOpacity
          style={[styles.assignButton, item.assigned && styles.assignedButton]}
          onPress={() => !item.assigned && handleAssignPress(item.week, item.day, item.personnelNum, item.openingTime)}
          disabled={item.assigned}
        >
          <Text style={[styles.assignButtonText, item.assigned && styles.assignedButtonText]}>
            {item.assigned ? 'Assigned' : 'Assign'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className="h-full w-full">
        <View style={styles.header}>
          <Text style={styles.headerText}>Assign Personnel: {clubName}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.scheduleContainer}>
            {schedule.length === 0 ? (
              <Text style={styles.noShiftsText}>No shifts have been assigned for next week yet.</Text>
            ) : (
              schedule.map((item, index) => (
                <View key={index}>{renderScheduleItem(item)}</View>
              ))
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20
  },

  header: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },

  scheduleContainer: {
    marginTop: 20
  },

  shiftBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  dayText: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  personnelText: {
    fontSize: 16,
    color: '#666'
  },

  assignButton: {
    backgroundColor: '#E21A1A',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },

  assignedButton: {
    backgroundColor: '#A9A9A9',
  },

  assignButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },

  assignedButtonText: {
    color: '#D3D3D3',
  },

  noShiftsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: '#F0F0F0', // Add white background
    padding: 10, // Add padding for better appearance
    borderRadius: 10,
  },
});

export default AssignPersonnelManagement;