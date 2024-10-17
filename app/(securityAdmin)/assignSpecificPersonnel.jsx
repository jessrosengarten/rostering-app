import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { images } from '../../constants'; 

const { width, height } = Dimensions.get('window');

const Assign = () => {
  const [selectedPersonnel, setSelectedPersonnel] = useState('');

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <ImageBackground source={images.background} style={styles.background}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>Assign Specific Personnel</Text>
        </View>

        {/* RNPickerSelect component with items passed as a prop */}
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedPersonnel(value)}
            
            // Items to be displayed in the picker
            items={[
              { label: 'Shan', value: 'Shan' },
              { label: 'Rudolf', value: 'Rudolf' },
              { label: 'Dagan', value: 'Dagan' },
              { label: 'Jess', value: 'Jess' },
            ]}

            placeholder={{ label: 'Select a person...', value: null }}

            // Custom styles for the picker select component
            style={pickerSelectStyles}
          />
        </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginTop: 20,
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
    paddingRight: 30, // to ensure the text is never behind the icon
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
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});
