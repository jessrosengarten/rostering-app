import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getSchedule } from '../../Backend/clubManager';

const Schedule = () => {
  const [attendance, setAttendance] = useState({});
  const [thisWeek, setThisWeekSchedule] = useState([]);
  const [nextWeek, setNextWeekSchedule] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { club } = route.params;
  const thisWeekDates = getWeekRange();
  const nextWeekDates = getNextWeekRange();

  useEffect(() => {
        const loadSchedule = async () => {
            try {
                const thisWeekSchedule = await getSchedule(club.name, thisWeekDates);
                const nextWeekSchedule = await getSchedule(club.name, nextWeekDates);
                setThisWeekSchedule(Object.keys(thisWeekSchedule).map(schedule => ({
                    week: schedule,
                    ...thisWeekSchedule[schedule],
                })));
                setNextWeekSchedule(Object.keys(nextWeekSchedule).map(schedule => ({
                    week: schedule,
                    ...nextWeekSchedule[schedule],
                })));
            } catch (error) {
                console.error("Error fetching schedule:", error);
            }
        };
        loadSchedule();
    });

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

  const toggleAttendance = (week, day, bouncer) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [week]: {
        ...prevAttendance[week],
        [day]: {
          ...prevAttendance[week][day],
          [bouncer]: !prevAttendance[week]?.[day]?.[bouncer],
        },
      },
    }));
  };

  const weekData = {
    currentWeek: {
      dates: '1 Nov - 7 Nov',
      shifts: {
        Monday: ['Shan', 'Rudolf', 'Dagan'],
        Tuesday: ['Jess', 'Shan'],
        Wednesday: ['Dagan', 'Rudolf'],
      },
    },
    futureWeek: {
      dates: '8 Nov - 14 Nov',
      shifts: {
        Monday: ['Jess', 'Shan'],
        Tuesday: ['Rudolf', 'Dagan'],
        Wednesday: ['Jess'],
      },
    },
  };

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Schedule</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {Object.entries(thisWeek).map(([week, data]) => (
            <View key={week} style={styles.weekContainer}>
              <Text style={styles.weekHeading}>{thisWeek.week}</Text>
              <Text style={styles.dateRange}>{data.dates}</Text>

              {/* Conditional "Assign" button for "Next Week" */}
             {week === 'futureWeek' && (
  <TouchableOpacity
    style={styles.assignButton}
    onPress={() => navigation.navigate('assignSecurityPersonnel', { club})} // UPDATE THIS
  >
    <Text style={styles.assignButtonText}>Assign</Text>
  </TouchableOpacity>
)}

              {/* {Object.entries(data.shifts).map(([day, bouncers]) => (
                <View key={day} style={styles.dayContainer}>
                  <Text style={styles.dayHeading}>{day}</Text>
                  {bouncers.map((bouncer, index) => (
                    <View key={index} style={styles.bouncerContainer}>
                      <Text style={styles.bouncerName}>{bouncer}</Text>
                      <Switch
                        value={attendance?.[week]?.[day]?.[bouncer] || false}
                        onValueChange={() => toggleAttendance(week, day, bouncer)}
                      />
                    </View>
                  ))}
                </View>
              ))} */}
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
  assignButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  dayContainer: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
  },
  dayHeading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

  bouncerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  bouncerName: { fontSize: 16, color: '#333' },
});

export default Schedule;
