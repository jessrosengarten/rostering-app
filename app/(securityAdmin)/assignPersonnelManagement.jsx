import React, { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported from React
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { images } from "../../constants";

const AssignPersonnelManagement = () => {
  const navigation = useNavigation();

  // Dynamic state for clubs and schedules
  const [clubs, setClubs] = useState([]); // Initialize clubs state
  const [schedule, setSchedule] = useState([]); // Initialize schedule state

  // Dummy club data
  const club = { name: 'Neon Night Club', address: '123 Main St', manager: 'John Doe', contact: '0123456789' };

  // Populate schedule data
  useEffect(() => {
    // Simulate fetching data by setting schedule state with sample data
    const dummySchedule = [
      { day: 'Thursday', personnel: 5 },
      { day: 'Friday', personnel: 8 },
      { day: 'Saturday', personnel: 12 },
      { day: 'Sunday', personnel: 3 },
    ];
    setSchedule(dummySchedule);
  }, []); // Run only once when the component mounts

  const handleAssignPress = (day, personnelCount) => {
    navigation.navigate('assignSpecificPersonnel', { day, personnelCount, club });
  };

  const renderScheduleItem = (item) => (
    <View style={styles.scheduleItem}>
      <View style={styles.shiftBox}>
        <View style={styles.textContainer}>
          <Text style={styles.dayText}>{item.day}:</Text>
          <Text style={styles.personnelText}>{item.personnel} Security Personnel</Text>
        </View>
        <TouchableOpacity style={styles.assignButton} onPress={() => handleAssignPress(item.day, item.personnel)}>
          <Text style={styles.assignButtonText}>Assign</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className="h-full w-full">
        <View style={styles.header}>
          <Text style={styles.headerText}>Assign Personnel: {club.name}</Text>
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
    backgroundColor: 'red', 
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
