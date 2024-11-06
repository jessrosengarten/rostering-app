import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const Schedule = () => {
  const route = useRoute();
  const { clubSchedule = {} } = route.params || {}; // Retrieve the clubSchedule data from route params

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Full Schedule</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Display each day's schedule */}
          {Object.keys(clubSchedule).length > 0 ? (
            Object.entries(clubSchedule).map(([day, clubs]) => (
              <View key={day} style={styles.dayContainer}>
                <Text style={styles.dayHeading}>{day}</Text>
                {Object.entries(clubs).map(([clubName, personnelList], index) => (
                  <View key={index} style={styles.clubContainer}>
                    <Text style={styles.clubHeading}>{clubName}</Text>
                    {personnelList.map((person, i) => (
                      <Text key={i} style={styles.personnelName}>
                        {i + 1}. {person}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            ))
          ) : (
            <Text style={styles.noScheduleText}>No personnel assigned.</Text>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  header: { 
    padding: 15, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    alignItems: 'left', 
    borderBottomWidth: 1, 
    borderBottomColor: '#d3d3d3',
  },
  headerText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#000' 
  },
  dayContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  dayHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  clubContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  clubHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  personnelName: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 10,
  },
  noScheduleText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});

export default Schedule;
