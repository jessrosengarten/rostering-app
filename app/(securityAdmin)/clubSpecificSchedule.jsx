import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';


const ClubSpecificSchedule = () => {
  const route = useRoute();
  const { club, day, assignedPersonnel } = route.params;

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{club.name} Schedule for {day}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.detailsContainer}>
            {assignedPersonnel && assignedPersonnel.length > 0 ? (
              assignedPersonnel.map((person, index) => (
                <View key={index} style={styles.personnelItem}>
                  <Text style={styles.personnelNumber}>{index + 1}.</Text>
                  <Text style={styles.personnelName}>{person}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noScheduleText}>No personnel assigned for {day}.</Text>
            )}

           
          </View>
           <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Schedule</Text>
            </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { 
    width: '100%', 
    height: '100%' 
    },

    editButton: {
        backgroundColor: '#E21A1A',
        padding: 15,
        margin: 20,
        alignItems: 'center',
        borderRadius: 5,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },

  header: { 
    padding: 15, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
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
  
  personnelItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 8, 
    paddingHorizontal: 10 
    },

  personnelNumber: { 
    fontSize: 16, 
    color: '#000', 
    marginRight: 8 
    },

  personnelName: { 
    fontSize: 16, 
    color: '#000' 
    },

  noScheduleText: { 
    fontSize: 16, 
    color: '#888', 
    textAlign: 'center', 
    marginTop: 10 
    },
});

export default ClubSpecificSchedule;
