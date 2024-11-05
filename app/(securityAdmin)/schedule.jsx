import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const Schedule = () => {
  const route = useRoute();
  const { day = 'Unknown Day', assignedPersonnel = [] } = route.params || {}; // Set default values if undefined

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.background}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          {/* Semi-transparent Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Schedule </Text>
          </View>

          {/* Schedule List */}
          <View style={styles.scheduleContainer}>
            {assignedPersonnel && assignedPersonnel.length > 0 ? (
              assignedPersonnel.map((person, index) => (
                <View key={index} style={styles.scheduleItem}>
                  <Text style={styles.nameText}>{index + 1}. {person}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noScheduleText}>No personnel assigned.</Text>
            )}
          </View>
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
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  scheduleContainer: {
    padding: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff', // White background for the item
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Shadow effect for elevation
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  noScheduleText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginTop: 50,
  },
});

export default Schedule;
