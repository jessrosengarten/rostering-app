import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Modal, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { images } from '../../constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { fetchSecurityPersonnelFullNames, assignPersonnelToShift } from '../../Backend/securityAdmin';

const Assign = () => {
  const { day, personnelCount, clubName, week, startTime, club } = useLocalSearchParams();
  const router = useRouter();

  const [selectedPersonnel, setSelectedPersonnel] = useState(Array(personnelCount).fill(''));
  const [assignedPersonnel, setAssignedPersonnel] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [currentPickerIndex, setCurrentPickerIndex] = useState(null);
  const [tempSelectedValue, setTempSelectedValue] = useState(null);
  const [clubSchedule, setClubSchedule] = useState({});
  const [personnelOptions, setPersonnelOptions] = useState([]);

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const fullNames = await fetchSecurityPersonnelFullNames(day, week);
        setPersonnelOptions(fullNames);
      } catch (error) {
        console.error('Error fetching security personnel:', error);
      }
    };

    fetchPersonnel();
  }, []);

  const handlePersonnelChange = (value) => {
    setTempSelectedValue(value);
  };

  const handleConfirmSelection = () => {
    if (tempSelectedValue && currentPickerIndex !== null) {
      const newSelectedPersonnel = [...selectedPersonnel];
      const previousValue = newSelectedPersonnel[currentPickerIndex];

      newSelectedPersonnel[currentPickerIndex] = tempSelectedValue;
      setSelectedPersonnel(newSelectedPersonnel);

      setAssignedPersonnel((prev) => {
        const updatedAssignedPersonnel = prev.filter((person) => person !== previousValue);
        return [...updatedAssignedPersonnel, tempSelectedValue];
      });

      setPickerVisible(false);
      setCurrentPickerIndex(null);
      setTempSelectedValue(null);
    }
  };

  const handleAssign = async () => {
    if (selectedPersonnel.includes('')) {
      Alert.alert("Incomplete Assignment", "Please assign a person for each spot before proceeding.", [{ text: "OK" }]);
    } else {
      try {
        for (const fullName of selectedPersonnel) {
          try {
            await assignPersonnelToShift(fullName, clubName, week, day, startTime);
          } catch (error) {
            if (error.message.includes('already has a shift assigned')) {
              Alert.alert(
                "Attention",
                `Personnel ${fullName} already has a shift assigned for ${day}. Please choose another personnel.`,
                [
                  { text: "OK", onPress: () => {
                    setCurrentPickerIndex(selectedPersonnel.indexOf(fullName));
                    setTempSelectedValue(fullName);
                  }}
                ]
              );
              return;
            } else {
              throw error;
            }
          }
        }
        setClubSchedule((prev) => ({
          ...prev,
          [day]: selectedPersonnel,
        }));
        setModalVisible(true);
      } catch (error) {
        console.error('Error assigning personnel to shift:', error);
        Alert.alert("Error", "There was an error assigning personnel to the shift. Please try again.", [{ text: "OK" }]);
      }
    }
  };

  const handleViewSchedule = () => {
    setModalVisible(false);
    router.push({
      pathname: 'clubSpecificSchedule',
      params: { club }
    });
  };

  const handleReturn = () => {
    setModalVisible(false);
    router.push({
      pathname: 'assignPersonnelManagement',
      params: { clubName: clubName }
    });
  };

  const closePicker = () => {
    setPickerVisible(false);
    setCurrentPickerIndex(null);
    setTempSelectedValue(null);
  };

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <ImageBackground source={images.background} style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Assign Personnel for {day}</Text>
        </View>

        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {Array.from({ length: personnelCount }).map((_, index) => (
              <View key={index} style={styles.pickerItemContainer}>
                <Text style={styles.pickerLabel}>Personnel {index + 1}:</Text>
                <TouchableOpacity
                  style={styles.pickerWrapper}
                  onPress={() => {
                    setCurrentPickerIndex(index);
                    setTempSelectedValue(selectedPersonnel[index]);
                    setPickerVisible(true);
                  }}
                >
                  <Text style={styles.pickerText}>
                    {selectedPersonnel[index] || 'Select a person...'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            <CustomButton title="Assign" handlePress={handleAssign} customStyle={styles.button} textStyle={styles.buttonText} />
          </ScrollView>
        </KeyboardAvoidingView>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Personnel successfully assigned for {day} at {clubName}.
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

        <Modal
          transparent={true}
          visible={pickerVisible}
          onRequestClose={closePicker}
          animationType="slide"
        >
          <TouchableWithoutFeedback onPress={closePicker}>
            <View style={styles.pickerModalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.pickerModalContainer}>
                  <Picker
                    selectedValue={tempSelectedValue}
                    onValueChange={handlePersonnelChange}
                    style={pickerSelectStyles.picker}
                  >
                    <Picker.Item label="Select a person..." value="" />
                    {personnelOptions.filter((person) => !assignedPersonnel.includes(person)).map((person, idx) => (
                      <Picker.Item key={idx} label={person} value={person} />
                    ))}
                  </Picker>
                  <TouchableOpacity
                    style={styles.pickerModalButton}
                    onPress={handleConfirmSelection}
                  >
                    <Text style={styles.pickerModalButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
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

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#F2F2F2'
  },

  pickerText: {
    fontSize: 16,
    color: '#333'
  },

  button: {
    backgroundColor: '#E21A1A',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center'
  },

  modalText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25
  },

  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },

  modalButton: {
    backgroundColor: '#E21A1A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5
  },

  modalButtonText: {
    color: '#FFF',
    fontSize: 18
  },

  pickerModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  pickerModalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },

  pickerModalButton: {
    backgroundColor: '#E21A1A',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center'
  },

  pickerModalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});

const pickerSelectStyles = StyleSheet.create({
  picker: {
    height: 300,
    width: '100%',
    color: '#333',
    backgroundColor: '#F2F2F2'
  }
});

export default Assign;