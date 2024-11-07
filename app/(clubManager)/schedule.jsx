import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

const Schedule = () => {
  const [attendance, setAttendance] = useState({});

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
        // Add other days here...
      },
    },
    futureWeek: {
      dates: '8 Nov - 14 Nov',
      shifts: {
        Monday: ['Jess', 'Shan'],
        Tuesday: ['Rudolf', 'Dagan'],
        Wednesday: ['Jess'],
        // Add other days here...
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
          {Object.entries(weekData).map(([week, data]) => (
            <View key={week} style={styles.weekContainer}>
              <Text style={styles.weekHeading}>{week === 'currentWeek' ? 'Current Week' : 'Future Week'}</Text>
              <Text style={styles.dateRange}>{data.dates}</Text>
              {Object.entries(data.shifts).map(([day, bouncers]) => (
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
              ))}
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
