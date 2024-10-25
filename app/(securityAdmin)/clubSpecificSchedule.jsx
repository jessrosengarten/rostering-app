import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import commonStyles from '../../components/Styles';

const ClubSpecificSchedule = () => {
  const route = useRoute();
  const { club } = route.params;  // Access the club data passed from ClubDetails

  // Dummy data for personnel
  const schedule = {
    Monday: ['Shan', 'Rudi', 'Dagan'],
    Tuesday: ['Mark','Lee', 'Sarah', 'Connor'],
    Wednesday: ['Emily', 'David', 'Thomas'],
    Thursday: ['Hannah', 'Jess'],
    Friday: ['Daniella', 'Jamie'],
  };

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{club.name} Schedule</Text>
          </View>

          {/* Render club-specific schedule details */}
          <View style={styles.detailsContainer}>

            {/* Schedule List */}
            {Object.keys(schedule).map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <Text style={styles.dayTitle}>{day}</Text>
                {schedule[day].map((person, idx) => (
                  <View key={idx} style={styles.personnelItem}>
                    <Text style={styles.personnelNumber}>{idx + 1}.</Text>
                    <Text style={styles.personnelName}>{person}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
        width: '100%',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignItems: 'left',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
  detailsContainer: {
    marginVertical: 20,
  },
  dayContainer: {
    marginBottom: 15,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  personnelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  personnelNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,

    
  },
  personnelName: {
    fontSize: 16,
    color: '#000',
  },
});

export default ClubSpecificSchedule;
