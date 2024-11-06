import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

const ClubSpecificSchedule = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { club, clubSchedule = {} } = route.params; // Default to an empty object if clubSchedule is undefined

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Schedule for {club.name}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.detailsContainer}>
            {Object.keys(clubSchedule).length > 0 ? (
              Object.entries(clubSchedule).map(([night, personnelList], index) => (
                <View key={index} style={styles.nightContainer}>
                  <Text style={styles.nightHeading}>{night}</Text>
                  {personnelList.map((person, i) => (
                    <View key={i} style={styles.personnelItem}>
                      <Text style={styles.personnelNumber}>{i + 1}.</Text>
                      <Text style={styles.personnelName}>{person}</Text>
                    </View>
                  ))}
                </View>
              ))
            ) : (
              <Text style={styles.noScheduleText}>No personnel assigned for this club.</Text>
            )}
          </View>
          {/* Edit Schedule Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('assignPersonnelManagement')}
          >
            <Text style={styles.editButtonText}>Edit Schedule</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { width: '100%', height: '100%' },

  header: { 
    padding: 15, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)' 
  },

  headerText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#000' 
  },

  scrollContainer: {
    paddingHorizontal: 20, 
    paddingBottom: 20 
  },

  editButton: {
    backgroundColor: '#E21A1A',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

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
  nightHeading: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },

  personnelItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  personnelNumber: { fontSize: 16, color: '#000', marginRight: 8 },
  personnelName: { fontSize: 16, color: '#000' },

  noScheduleText: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 10 },
});

export default ClubSpecificSchedule;
