import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Alert, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { router, useLocalSearchParams } from 'expo-router';
import { getSchedule, getSecurityPersonnelShifts, addingAttendance } from '../../Backend/clubManager';


const Schedule = () => {
  const { club: clubParam } = useLocalSearchParams();
  const club = JSON.parse(decodeURIComponent(clubParam));
  const [thisWeekSchedule, setThisWeekSchedule] = useState([]);
  const [nextWeekSchedule, setNextWeekSchedule] = useState([]);
  const [thisWeekPersonnelList, setThisWeekPersonnelList] = useState([]);
  const [nextWeekPersonnelList, setNextWeekPersonnelList] = useState([]);
  const thisWeekDates = getWeekRange();
  const nextWeekDates = getNextWeekRange();
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


  useEffect(() => {
    loadPersonnelListNextWeek();
    loadPersonnelListThisWeek();
    loadSchedule();
  }, [club.name, thisWeekDates, nextWeekDates]);

  const loadSchedule = async () => {
    try {
      const thisWeekSchedule = await getSchedule(club.name, thisWeekDates);
      const nextWeekSchedule = await getSchedule(club.name, nextWeekDates);

      // Map each entry in the schedule objects to a consistent format
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

  // Function to load personnel data
  const loadPersonnelListThisWeek = async () => {
    try {
      const personnelDetails = await getSecurityPersonnelShifts(club.name, thisWeekDates); // Fetch personnel for the club
      const groupedShifts = groupShiftsByDay(personnelDetails);
      setThisWeekPersonnelList(groupedShifts);
    } catch (error) {
      console.error("Error fetching personnel list:", error);
    }
  };

  // Function to load personnel data
  const loadPersonnelListNextWeek = async () => {
    try {
      const personnelDetails = await getSecurityPersonnelShifts(club.name, nextWeekDates); // Fetch personnel for the club
      const groupedShifts = groupShiftsByDay(personnelDetails);
      setNextWeekPersonnelList(groupedShifts);
    } catch (error) {
      console.error("Error fetching personnel list:", error);
    }
  };

  // Function to get the date range for the week
  function getWeekRange(date = new Date()) {
    const currentDate = new Date(date);

    const startOfWeekDay = 1; // Monday
    const currentDay = currentDate.getDay();

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - (currentDay - startOfWeekDay));

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

  // Function to group personnel shifts by day
  const groupShiftsByDay = (shifts) => {
    const grouped = {};

    shifts.forEach((person) => {
      const { day, email, shiftDetails } = person;

      // If the day is not in the grouped object, initialize it
      if (!grouped[day]) {
        grouped[day] = [];
      }

      // Add the person to the correct day group
      grouped[day].push({ email, ...shiftDetails, fullName: person.fullName });
    });

    return grouped;
  };

  // fucntion to get the next weeks range
  function getNextWeekRange(date = new Date()) {
    const currentDate = new Date(date);

    const startOfWeekDay = 1; // Monday
    const currentDay = currentDate.getDay();

    const startOfNextWeek = new Date(currentDate);
    startOfNextWeek.setDate(currentDate.getDate() - (currentDay - startOfWeekDay) + 7);

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

  const handleAttendanceSubmit = async (name, dateRange, day) => {
    Alert.alert(
      'Confirm Attendance',
      `Are you sure you want to mark ${name.fullName} for ${day}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Mark as Attended',
          onPress: async () => {
            try {
              const personnelName = name.email.replace(/\./g, ',');

              const status = await addingAttendance(personnelName, dateRange, day, 'Attended');
              await loadPersonnelListThisWeek();
              console.log("Attendance updated:", status);
            } catch (error) {
              console.error("Error updating attendance:", error);
            }
          },
        },
        {
          text: 'Mark as Not Attended',
          onPress: async () => {
            try {
              const personnelName = name.email.replace(/\./g, ',');

              const status = await addingAttendance(personnelName, dateRange, day, 'Not Attended');
              await loadPersonnelListThisWeek();
              console.log("Attendance updated:", status);
            } catch (error) {
              console.error("Error updating attendance:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{club.name} - Schedule</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          {/* Display "This Week" Schedule */}
          <View style={styles.weekContainer}>
            <Text style={styles.weekHeading}>This Week</Text>
            <Text style={styles.dateRange}>{thisWeekDates}</Text>

            {/* Display schedule for each day this week */}
            <View style={styles.scrollContainer}>
              {thisWeekSchedule.map(({ day, shift }) => (
                <View key={day} style={styles.dayContainer}>
                  <Text style={styles.dayHeading}>{day}</Text>
                  <Text style={styles.shiftText}>{shift !== null && shift !== undefined ? `Number of Personnel Requested: ${shift}` : 'No shift assigned'}</Text>
                  <Text style={styles.sectionHeading}>Personnel Assigned:</Text>

                  {thisWeekPersonnelList[day] && thisWeekPersonnelList[day].length > 0 ? (
                    thisWeekPersonnelList[day].map((person) => (
                      <View key={person.email} style={styles.personContainer}>
                        <Text style={styles.personName}>{person.fullName}</Text>
                        <Button
                          title={person.attendance ? person.attendance === "Attended" ? "Attended" : "Not Attended" : "Mark Attendance"}
                          disabled={person.attendance === "Attended" || person.attendance === "Not Attended"}
                          onPress={() => handleAttendanceSubmit(person, thisWeekDates, day)}
                        />
                      </View>
                    ))
                  ) : (
                    <Text>No personnel assigned for this day.</Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Display "Next Week" Schedule */}
          <View style={styles.weekContainer}>
            <Text style={styles.weekHeading}>Next Week</Text>
            <Text style={styles.dateRange}>{nextWeekDates}</Text>

            {/* Display schedule for each day next week */}
            <View style={styles.scrollContainer}>
              {nextWeekSchedule.map(({ day, shift }) => (
                <View key={day} style={styles.dayContainer}>
                  <Text style={styles.dayHeading}>{day}</Text>
                  <Text style={styles.shiftText}>{shift !== null && shift !== undefined ? `Number of Personnel Requested: ${shift}` : 'No shift assigned'}</Text>
                  <Text style={styles.sectionHeading}>Personnel Assigned:</Text>

                  {nextWeekPersonnelList[day] && nextWeekPersonnelList[day].length > 0 ? (
                    nextWeekPersonnelList[day].map((person) => (
                      <View key={person.email} style={styles.personContainer}>
                        <Text style={styles.personName}>{person.fullName}</Text>
                      </View>
                    ))
                  ) : (
                    <Text>No personnel assigned for this day.</Text>
                  )}
                </View>
              ))}
            </View>

            {/* Conditional "Assign" button for "Next Week" */}
            <TouchableOpacity
              style={[styles.assignButton, nextWeekSchedule.length > 0 && styles.disabledButton]}
              onPress={() => nextWeekSchedule.length === 0 && router.push(`/assignSecurityPersonnel?club=${encodeURIComponent(JSON.stringify(club))}`)}
              disabled={nextWeekSchedule.length > 0}
            >
              <Text style={styles.assignButtonText}>Assign</Text>
            </TouchableOpacity>
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

  personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  personName: {
    flex: 1,
    fontSize: 16,
  },

  shiftText: {
    fontSize: 12,
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  weekContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  weekHeading: { fontSize: 20, fontWeight: 'bold', color: '#E21A1A', marginBottom: 5 },
  dateRange: { fontSize: 16, color: '#555', marginBottom: 15 },

  assignButton: {
    backgroundColor: '#E21A1A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  assignButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#D3D3D3',
  },

  dayContainer: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
  },
  dayHeading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },

  bouncerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  bouncerName: { fontSize: 16, color: '#333' },
});

export default Schedule;

