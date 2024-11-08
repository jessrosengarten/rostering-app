import React, { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported from React
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { images } from "../../constants";
import { fetchPersonnelNeeded } from '../../Backend/securityAdmin';

const AssignPersonnelManagement = () => {
  const [schedule, setSchedule] = useState([]);
  const route = useRoute();
  const { clubName } = route.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const fetchedSchedule = await fetchPersonnelNeeded(clubName);
        setSchedule(fetchedSchedule);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, [clubName]);

  const handleAssignPress = (week, day, personnelCount, openingTime) => {
    navigation.navigate('assignSpecificPersonnel', { week, day, personnelCount, clubName, startTime: openingTime });
  };

  const renderScheduleItem = (item) => (
    <View style={styles.scheduleItem} key={`${item.week}-${item.day}`}>
      <View style={styles.shiftBox}>
        <View style={styles.textContainer}>
          <Text style={styles.dayText}>{item.day}:</Text>
          <Text style={styles.personnelText}>{item.personnelNum} Security Personnel</Text>
          <Text>Week: {item.week}</Text>
          <Text>Opening Time: {item.openingTime}</Text>
        </View>
        <TouchableOpacity style={styles.assignButton} onPress={() => handleAssignPress(item.week, item.day, item.personnelNum, item.openingTime)}>
          <Text style={styles.assignButtonText}>Assign</Text>
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

  assignButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
});

export default AssignPersonnelManagement;
