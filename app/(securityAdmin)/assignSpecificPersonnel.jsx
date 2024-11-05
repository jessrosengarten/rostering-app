import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { images } from '../../constants';
import { useRoute, useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const Assign = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { day, personnelCount, club } = route.params;

  const [selectedPersonnel, setSelectedPersonnel] = useState(Array(personnelCount).fill(''));
  const [modalVisible, setModalVisible] = useState(false);

  const handlePersonnelChange = (value, index) => {
    const newSelectedPersonnel = [...selectedPersonnel];
    newSelectedPersonnel[index] = value;
    setSelectedPersonnel(newSelectedPersonnel);
  };

  const handleAssign = () => {
    setModalVisible(true);
  };

  const handleViewSchedule = () => {
    setModalVisible(false);
    navigation.navigate('clubSpecificSchedule', { club, day, assignedPersonnel: selectedPersonnel });
  };

  const handleReturn = () => {
    setModalVisible(false);
    navigation.navigate('assignPersonnelManagement');
  };

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <ImageBackground source={images.background} style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Assign Personnel for {day}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {Array.from({ length: personnelCount }).map((_, index) => (
            <View key={index} style={styles.pickerItemContainer}>
              <Text style={styles.pickerLabel}>Personnel {index + 1}:</Text>
              <View style={styles.pickerWrapper}>
                <RNPickerSelect
                  onValueChange={(value) => handlePersonnelChange(value, index)}
                  items={[
                    { label: 'Shan', value: 'Shan' },
                    { label: 'Rudolf', value: 'Rudolf' },
                    { label: 'Dagan', value: 'Dagan' },
                    { label: 'Jess', value: 'Jess' },
                  ]}
                  placeholder={{ label: 'Select a person...', value: null }}
                  style={pickerSelectStyles}
                />
              </View>
            </View>
          ))}
          <CustomButton title="Assign" handlePress={handleAssign} customStyle={styles.button} textStyle={styles.buttonText} />
        </ScrollView>

        <Modal
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
  animationType="slide"
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>
        Personnel successfully assigned for {day} at {club.name}.
      </Text>
      <View style={styles.modalButtonsContainer}>
        <TouchableOpacity style={styles.modalButton} onPress={handleViewSchedule}>
          <Text style={styles.modalButtonText}>View Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={handleReturn}>
          <Text style={styles.modalButtonText}>Return</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    width: '100%' 
    },
  
  scrollContainer: { 
    paddingHorizontal: 20, 
    paddingBottom: 30 
    },
  
  background: { 
    height: '100%', 
    width: '100%' 
    },
  
  header: { 
    padding: 15, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)' 
    },
  
  headerText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#000' 
    },
  
  pickerItemContainer: { 
    padding: 20, 
    backgroundColor: '#FFF', 
    borderRadius: 10, 
    marginTop: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 3 
    },
  
  button: { 
    backgroundColor: '#E21A1A', 
    paddingVertical: 10, 
    borderRadius: 5 
    },
  
  buttonText: { 
    color: '#FFF', 
    fontWeight: 'bold'
     },
  
  pickerLabel: { 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#444', 
    marginBottom: 5 
    },
  
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    justifyContent: 'center', 
    alignItems: 'center' 
    },
  
  modalContainer: { 
    width: '80%', 
    padding: 20, 
    backgroundColor: '#FFF', 
    borderRadius: 10, 
    alignItems: 'center' },
  
  modalText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20 
    },
  
  modalButtonsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%' 
    },
  
  modalButton: { 
    backgroundColor: '#E21A1A', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 5, 
    marginHorizontal: 5 
    },
  
  modalButtonText: { 
    color: '#FFF', 
    fontWeight: 'bold' 
    },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderRadius: 8, color: '#333', backgroundColor: '#F2F2F2' },
  inputAndroid: { fontSize: 16, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, color: '#333', backgroundColor: '#F2F2F2' },
  placeholder: { color: '#666' },
});

export default Assign;
