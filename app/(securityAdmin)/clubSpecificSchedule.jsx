import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { images } from '../../constants';
import { getSchedule, getSecurityPersonnelShifts } from '../../Backend/securityAdmin';

const ClubSpecificSchedule = () => {
  const { club } = useLocalSearchParams();
  const router = useRouter();
  const parsedClub = JSON.parse(club);

  const [thisWeekSchedule, setThisWeekSchedule] = useState([]);
  const [nextWeekSchedule, setNextWeekSchedule] = useState([]);
  const [thisWeekPersonnelList, setThisWeekPersonnelList] = useState([]);
  const [nextWeekPersonnelList, setNextWeekPersonnelList] = useState([]);
  const thisWeekDates = getWeekRange();
  const nextWeekDates = getNextWeekRange();
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const fetchSchedule = async () => {
    try {
      const thisWeekSchedule = await getSchedule(parsedClub.name, thisWeekDates);
      const nextWeekSchedule = await getSchedule(parsedClub.name, nextWeekDates);

      const formattedThisWeekSchedule = Object.entries(thisWeekSchedule).map(([day, shift]) => ({
        day,
        shift: shift || [],
        week: thisWeekDates,
      })).sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

      const formattedNextWeekSchedule = Object.entries(nextWeekSchedule).map(([day, shift]) => ({
        day,
        shift: shift || [],
        week: nextWeekDates,
      })).sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

      setThisWeekSchedule(formattedThisWeekSchedule);
      setNextWeekSchedule(formattedNextWeekSchedule);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const loadPersonnelListThisWeek = async () => {
    try {
      const personnelDetails = await getSecurityPersonnelShifts(parsedClub.name, thisWeekDates);
      const groupedShifts = groupShiftsByDay(personnelDetails);
      setThisWeekPersonnelList(groupedShifts);
    } catch (error) {
      console.error("Error fetching personnel list:", error);
    }
  };

  const loadPersonnelListNextWeek = async () => {
    try {
      const personnelDetails = await getSecurityPersonnelShifts(parsedClub.name, nextWeekDates);
      const groupedShifts = groupShiftsByDay(personnelDetails);
      setNextWeekPersonnelList(groupedShifts);
    } catch (error) {
      console.error("Error fetching personnel list:", error);
    }
  };

  const groupShiftsByDay = (shifts) => {
    const grouped = {};
    shifts.forEach((person) => {
      const { day, email, shiftDetails } = person;
      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push({ email, ...shiftDetails, fullName: person.fullName });
    });
    return grouped;
  };

  useEffect(() => {
    fetchSchedule();
    loadPersonnelListThisWeek();
    loadPersonnelListNextWeek();
  }, [parsedClub.name, thisWeekDates, nextWeekDates]);

  useEffect(() => {
    const handleRouteChange = () => {
      fetchSchedule();
      loadPersonnelListThisWeek();
      loadPersonnelListNextWeek();
    };

    // Simulate route change detection
    const interval = setInterval(handleRouteChange, 1000);

    return () => clearInterval(interval);
  }, [parsedClub.name, thisWeekDates, nextWeekDates]);

  // Function to get the date range for the week
  function getWeekRange(date = new Date()) {
    const currentDate = new Date(date);

    const startOfWeekDay = 1; // Monday
    const currentDay = currentDate.getDay();

    const startOfWeek = new Date(currentDate);
    const diff = (currentDay === 0 ? 6 : currentDay - startOfWeekDay);
    startOfWeek.setDate(currentDate.getDate() - diff);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const startFormatted = formatDate(startOfWeek);
    const endFormatted = formatDate(endOfWeek);

    return `${startFormatted} to ${endFormatted}`;
  }

   // fucntion to get the next weeks range
   function getNextWeekRange(date = new Date()) {
    const currentDate = new Date(date);

    const startOfWeekDay = 1; // Monday
    const currentDay = currentDate.getDay();

    const startOfNextWeek = new Date(currentDate);
    const diff = (currentDay === 0 ? 6 : currentDay - startOfWeekDay); 
    startOfNextWeek.setDate(currentDate.getDate() - diff + 7);
    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const startFormatted = formatDate(startOfNextWeek);
    const endFormatted = formatDate(endOfNextWeek);

    return `${startFormatted} to ${endFormatted}`;
  }

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Schedule for {parsedClub.name}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          {/* Display "This Week" Schedule */}
          <View style={styles.weekContainer}>
            <Text style={styles.weekHeading}>This Week</Text>
            <Text style={styles.dateRange}>{thisWeekDates}</Text>
            <View style={styles.scrollContainer}>
              {thisWeekSchedule.map(({ day, shift }) => (
                <View key={day} style={styles.dayContainer}>
                  <View style={styles.dayBox}>
                    <Text style={styles.dayHeading}>{day}:</Text>
                    <Text style={styles.shiftText}>{shift !== null && shift !== undefined ? `Number of Personnel Requested: ${shift}` : 'No shift assigned'}</Text>
                    <Text style={styles.sectionHeading}>Personnel Assigned:</Text>
                    {thisWeekPersonnelList[day] && thisWeekPersonnelList[day].length > 0 ? (
                      thisWeekPersonnelList[day].map((person, i) => (
                        <View key={person.email} style={styles.personContainer}>
                          <Text style={styles.personName}>{person.fullName}</Text>
                        </View>
                      ))
                    ) : (
                      <Text>No personnel assigned for this day.</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Display "Next Week" Schedule */}
          <View style={styles.weekContainer}>
            <Text style={styles.weekHeading}>Next Week</Text>
            <Text style={styles.dateRange}>{nextWeekDates}</Text>
            <View style={styles.scrollContainer}>
              {nextWeekSchedule.map(({ day, shift }) => (
                <View key={day} style={styles.dayContainer}>
                  <View style={styles.dayBox}>
                    <Text style={styles.dayHeading}>{day}:</Text>
                    <Text style={styles.shiftText}>{shift !== null && shift !== undefined ? `Number of Personnel Requested: ${shift}` : 'No shift assigned'}</Text>
                    <Text style={styles.sectionHeading}>Personnel Assigned:</Text>
                    {nextWeekPersonnelList[day] && nextWeekPersonnelList[day].length > 0 ? (
                      nextWeekPersonnelList[day].map((person, i) => (
                        <View key={person.email} style={styles.personContainer}>
                          <Text style={styles.personName}>{person.fullName}</Text>
                        </View>
                      ))
                    ) : (
                      <Text>No personnel assigned for this day.</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { width: '100%', height: '100%' },

  header: { padding: 15, backgroundColor: 'rgba(255, 255, 255, 0.7)' },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },

  editButton: {
    backgroundColor: '#E21A1A',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  editButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },

  cancelButton: {
    backgroundColor: '#888',
    padding: 15,
    marginTop: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  cancelButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },

  detailsContainer: {
    marginVertical: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  nightContainer: {
    marginBottom: 20,
    backgroundColor: '#e8e8e8',
    padding: 15,
    borderRadius: 8,
  },
  nightHeading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

  personnelItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  personnelNumber: { fontSize: 16, color: '#000', marginRight: 8 },
  personnelName: { fontSize: 16, color: '#000' },

  noScheduleContainer: {
    backgroundColor: '#e8e8e8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  noScheduleText: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 10 },

  weekContainer: {
    marginVertical: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  weekHeading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  dateRange: { fontSize: 16, color: '#888', marginBottom: 10 },
  dayContainer: { marginBottom: 20 },
  dayBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 15,
  },
  dayHeading: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  shiftText: { fontSize: 14, color: '#555' },
  sectionHeading: { fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  personContainer: {
    marginBottom: 0,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 10,
  },
  personName: { fontSize: 14, color: '#333' },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderRadius: 8, color: '#333', backgroundColor: '#D3D3D3' },
  inputAndroid: { fontSize: 16, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, color: '#333', backgroundColor: '#D3D3D3' },
});

export default ClubSpecificSchedule;