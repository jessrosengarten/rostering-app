import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { images } from '../../constants'; 
import { useRoute, useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const { width, height } = Dimensions.get('window');

const Assign = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { day, personnelCount } = route.params;

  const [selectedPersonnel, setSelectedPersonnel] = useState(Array(personnelCount).fill(''));

  const handlePersonnelChange = (value, index) => {
    const newSelectedPersonnel = [...selectedPersonnel];
    newSelectedPersonnel[index] = value;
    setSelectedPersonnel(newSelectedPersonnel);
  };

  // Handle the Assign button press to navigate to Schedule page with selected personnel
  const handleAssign = () => {
    navigation.navigate('clubSchedule', { day, assignedPersonnel: selectedPersonnel });
  };

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <ImageBackground source={images.background} style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Assign Personnel for {day}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.pickerContainer}>
          {Array.from({ length: personnelCount }).map((_, index) => (
            <View key={index} style={styles.pickerItemContainer}>
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
          ))}

          <CustomButton
            title="Assign"
            handlePress={handleAssign} // Assign button to navigate to Schedule page
            customStyle={styles.button}
            textStyle={styles.buttonText}
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Assign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  pickerContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    
  },
  pickerItemContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E21A1A',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});
