import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { useRoute } from '@react-navigation/native';
import { images } from '../../constants';

const ClubSpecificSchedule = () => {
  const route = useRoute();
  const { club, clubSchedule = {} } = route.params;

  const [isEditMode, setIsEditMode] = useState(false);
  const [editableSchedule, setEditableSchedule] = useState(clubSchedule);

  // Toggle edit mode
  const toggleEditMode = () => setIsEditMode(!isEditMode);

  // Handle personnel change
  const handlePersonnelChange = (night, index, value) => {
    setEditableSchedule((prevSchedule) => ({
      ...prevSchedule,
      [night]: prevSchedule[night].map((person, i) => (i === index ? value : person)),
    }));
  };

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Schedule for {club.name}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.detailsContainer}>
            {Object.keys(editableSchedule).length > 0 ? (
              Object.entries(editableSchedule).map(([night, personnelList], index) => (
                <View key={index} style={styles.nightContainer}>
                  <Text style={styles.nightHeading}>{night}</Text>
                  {personnelList.map((person, i) => (
                    <View key={i} style={styles.personnelItem}>
                      <Text style={styles.personnelNumber}>{i + 1}.</Text>
                      {isEditMode ? (
                        <RNPickerSelect
                          onValueChange={(value) => handlePersonnelChange(night, i, value)}
                          items={[
                            { label: 'Shan', value: 'Shan' },
                            { label: 'Rudolf', value: 'Rudolf' },
                            { label: 'Dagan', value: 'Dagan' },
                            { label: 'Jess', value: 'Jess' },
                          ]}
                          value={person}
                          placeholder={{ label: 'Select a person...', value: null }}
                          style={pickerSelectStyles}
                        />
                      ) : (
                        <Text style={styles.personnelName}>{person}</Text>
                      )}
                    </View>
                  ))}
                </View>
              ))
            ) : (
              <Text style={styles.noScheduleText}>No personnel assigned for this club.</Text>
            )}
          </View>

          {/* Toggle Edit Mode Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={toggleEditMode}
          >
            <Text style={styles.editButtonText}>{isEditMode ? 'Save Changes' : 'Edit Schedule'}</Text>
          </TouchableOpacity>
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

  noScheduleText: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 10 },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderRadius: 8, color: '#333', backgroundColor: '#F2F2F2' },
  inputAndroid: { fontSize: 16, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, color: '#333', backgroundColor: '#F2F2F2' },
});

export default ClubSpecificSchedule;
