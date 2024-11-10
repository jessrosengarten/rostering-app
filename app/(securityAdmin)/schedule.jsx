import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../constants';
import { fetchAllClubs, getSchedule, getSecurityPersonnelShifts, fetchSecurityPersonnelFullNames } from '../../Backend/securityAdmin';

const Schedule = () => {
  const navigation = useNavigation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [thisWeekSchedules, setThisWeekSchedules] = useState({});
  const [nextWeekSchedules, setNextWeekSchedules] = useState({});
  const [thisWeekPersonnelLists, setThisWeekPersonnelLists] = useState({});
  const [nextWeekPersonnelLists, setNextWeekPersonnelLists] = useState({});
  const [originalThisWeekPersonnelLists, setOriginalThisWeekPersonnelLists] = useState({});
  const [originalNextWeekPersonnelLists, setOriginalNextWeekPersonnelLists] = useState({});
  const [personnelNames, setPersonnelNames] = useState([]);
  const thisWeekDates = getWeekRange();
  const nextWeekDates = getNextWeekRange();
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    loadClubsAndSchedules();
    fetchPersonnelNames();
  }, [thisWeekDates, nextWeekDates]);

  const fetchPersonnelNames = async () => {
    try {
      const names = await fetchSecurityPersonnelFullNames();
      const items = names.map(name => ({ label: name, value: name }));
      setPersonnelNames(items);
    } catch (error) {
      console.error('Error fetching personnel names:', error);
    }
  };

  const loadClubsAndSchedules = async () => {
    try {
      const clubsData = await fetchAllClubs();
      setClubs(Object.keys(clubsData));

      const thisWeekSchedules = {};
      const nextWeekSchedules = {};
      const thisWeekPersonnelLists = {};
      const nextWeekPersonnelLists = {};

      for (const clubName of Object.keys(clubsData)) {
        const thisWeekSchedule = await getSchedule(clubName, thisWeekDates);
        const nextWeekSchedule = await getSchedule(clubName, nextWeekDates);

        const formattedThisWeekSchedule = Object.entries(thisWeekSchedule).map(([day, shift]) => ({
          day,
          shift: shift || [],
        })).sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

        const formattedNextWeekSchedule = Object.entries(nextWeekSchedule).map(([day, shift]) => ({
          day,
          shift: shift || [],
        })).sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

        thisWeekSchedules[clubName] = formattedThisWeekSchedule;
        nextWeekSchedules[clubName] = formattedNextWeekSchedule;

        const thisWeekPersonnelDetails = await getSecurityPersonnelShifts(clubName, thisWeekDates);
        const nextWeekPersonnelDetails = await getSecurityPersonnelShifts(clubName, nextWeekDates);

        thisWeekPersonnelLists[clubName] = groupShiftsByDay(thisWeekPersonnelDetails);
        nextWeekPersonnelLists[clubName] = groupShiftsByDay(nextWeekPersonnelDetails);
      }

      setThisWeekSchedules(thisWeekSchedules);
      setNextWeekSchedules(nextWeekSchedules);
      setThisWeekPersonnelLists(thisWeekPersonnelLists);
      setNextWeekPersonnelLists(nextWeekPersonnelLists);
      setOriginalThisWeekPersonnelLists(thisWeekPersonnelLists);
      setOriginalNextWeekPersonnelLists(nextWeekPersonnelLists);
    } catch (error) {
      console.error("Error fetching clubs and schedules:", error);
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

  function getWeekRange(date = new Date()) {
    const currentDate = new Date(date);
    const startOfWeekDay = 1;
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
  };

  function getNextWeekRange(date = new Date()) {
    const currentDate = new Date(date);
    const startOfWeekDay = 1;
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
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditMode) {
      setThisWeekPersonnelLists(originalThisWeekPersonnelLists);
      setNextWeekPersonnelLists(originalNextWeekPersonnelLists);
    } else {
      setOriginalThisWeekPersonnelLists(thisWeekPersonnelLists);
      setOriginalNextWeekPersonnelLists(nextWeekPersonnelLists);
    }
    setIsEditMode(!isEditMode);
  };

  // Handle personnel change
  const handlePersonnelChange = (clubName, week, day, index, value) => {
    if (week === 'thisWeek') {
      setThisWeekPersonnelLists((prevList) => ({
        ...prevList,
        [clubName]: {
          ...prevList[clubName],
          [day]: prevList[clubName][day].map((person, i) => (i === index ? { ...person, fullName: value } : person)),
        },
      }));
    } else {
      setNextWeekPersonnelLists((prevList) => ({
        ...prevList,
        [clubName]: {
          ...prevList[clubName],
          [day]: prevList[clubName][day].map((person, i) => (i === index ? { ...person, fullName: value } : person)),
        },
      }));
    }
  };

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {clubs.map((clubName) => (
            <View key={clubName} style={styles.clubContainer}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Schedule for {clubName}</Text>
              </View>

              {/* This Week Schedule */}
              <View style={styles.weekContainer}>
                <Text style={styles.weekHeading}>This Week:</Text>
                <Text style={styles.dateRange}>{thisWeekDates}</Text>
                <View style={styles.scrollContainer}>
                  {thisWeekSchedules[clubName] && thisWeekSchedules[clubName].map(({ day, shift }) => (
                    <View key={`thisWeek-${day}`} style={styles.dayContainer}>
                      <Text style={styles.dayHeading}>{day}:</Text>
                      <Text style={styles.shiftText}>{shift !== null && shift !== undefined ? `Number of Personnel Requested: ${shift}` : 'No shift assigned'}</Text>
                      <Text style={styles.sectionHeading}>Personnel Assigned:</Text>
                      {thisWeekPersonnelLists[clubName] && thisWeekPersonnelLists[clubName][day] && thisWeekPersonnelLists[clubName][day].length > 0 ? (
                        thisWeekPersonnelLists[clubName][day].map((person, i) => (
                          <View key={person.email} style={styles.personContainer}>
                            {isEditMode ? (
                              <RNPickerSelect
                                onValueChange={(value) => handlePersonnelChange(clubName, 'thisWeek', day, i, value)}
                                items={personnelNames}
                                value={person.fullName}
                                placeholder={{ label: 'Select a person...', value: null }}
                                style={pickerSelectStyles}
                              />
                            ) : (
                              <Text style={styles.personName}>{person.fullName}</Text>
                            )}
                          </View>
                        ))
                      ) : (
                        <Text>No personnel assigned for this day.</Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>

              {/* Next Week Schedule */}
              <View style={styles.weekContainer}>
                <Text style={styles.weekHeading}>Next Week</Text>
                <Text style={styles.dateRange}>{nextWeekDates}</Text>
                <View style={styles.scrollContainer}>
                  {nextWeekSchedules[clubName] && nextWeekSchedules[clubName].map(({ day, shift }) => (
                    <View key={`nextWeek-${day}`} style={styles.dayContainer}>
                      <Text style={styles.dayHeading}>{day}:</Text>
                      <Text style={styles.shiftText}>{shift !== null && shift !== undefined ? `Number of Personnel Requested: ${shift}` : 'No shift assigned'}</Text>
                      <Text style={styles.sectionHeading}>Personnel Assigned:</Text>
                      {nextWeekPersonnelLists[clubName] && nextWeekPersonnelLists[clubName][day] && nextWeekPersonnelLists[clubName][day].length > 0 ? (
                        nextWeekPersonnelLists[clubName][day].map((person, i) => (
                          <View key={person.email} style={styles.personContainer}>
                            {isEditMode ? (
                              <RNPickerSelect
                                onValueChange={(value) => handlePersonnelChange(clubName, 'nextWeek', day, i, value)}
                                items={personnelNames}
                                value={person.fullName}
                                placeholder={{ label: 'Select a person...', value: null }}
                                style={pickerSelectStyles}
                              />
                            ) : (
                              <Text style={styles.personName}>{person.fullName}</Text>
                            )}
                          </View>
                        ))
                      ) : (
                        <Text>No personnel assigned for this day.</Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
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

  clubContainer: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  weekContainer: {
    marginVertical: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  weekHeading: { fontSize: 18, color: '#E21A1A', fontWeight: 'bold', marginBottom: 10 },
  dateRange: { fontSize: 16, color: '#888', marginBottom: 10 },
  dayContainer: {
    marginBottom: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 15,
  },
  dayHeading: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  shiftText: { fontSize: 14, color: '#555' },
  sectionHeading: { fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  personContainer: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 10,
  },
  personName: { fontSize: 14, color: '#333' },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderRadius: 8, color: '#333', backgroundColor: '#F2F2F2' },
  inputAndroid: { fontSize: 16, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, color: '#333', backgroundColor: '#F2F2F2' },
});

export default Schedule;