import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Finance = () => {
  const route = useRoute();
  const navigation = useNavigation(); 
  
  // State for dropdown visibility
  const [showSection, setShowSection] = useState(null);

  const toggleSection = (section) => {
    setShowSection((prevSection) => (prevSection === section ? null : section));
  };

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Finance Management</Text>
          </View>

          {/* Payments from Specific Club Dropdown */}
          <View style={styles.summary}>
            <TouchableOpacity 
              style={styles.dropdownButton} 
              onPress={() => toggleSection('clubPayments')}
            >
              <Text style={styles.summaryTitle}>Payments from ...</Text>
              <Ionicons 
                name={showSection === 'clubPayments' ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="black" 
              />
            </TouchableOpacity>

            {showSection === 'clubPayments' && (
              <View style={styles.extraInfo}>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle}>Total Earned:</Text>
                  <Text style={styles.summaryTextData}>600</Text>
                </View>
                {/* Breakdown by night */}
                <Text style={styles.summaryTextTitle}>Breakdown by Night:</Text>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Monday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Tuesday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Wednesday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
              </View>
            )}
          </View>

          {/* Payments from All Clubs Dropdown */}
          <View style={styles.summary}>
            <TouchableOpacity 
              style={styles.dropdownButton} 
              onPress={() => toggleSection('allClubsPayments')}
            >
              <Text style={styles.summaryTitle}>Payments from All Clubs</Text>
              <Ionicons 
                name={showSection === 'allClubsPayments' ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="black" 
              />
            </TouchableOpacity>

            {showSection === 'allClubsPayments' && (
              <View style={styles.extraInfo}>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle}>Total Earned:</Text>
                  <Text style={styles.summaryTextData}>600</Text>
                </View>
                {/* Breakdown by night */}
                <Text style={styles.summaryTextTitle}>Breakdown by Night:</Text>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Monday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Tuesday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Wednesday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
              </View>
            )}
          </View>

          {/* Payments to Bouncers Dropdown */}
          <View style={styles.summary}>
            <TouchableOpacity 
              style={styles.dropdownButton} 
              onPress={() => toggleSection('bouncersPayments')}
            >
              <Text style={styles.summaryTitle}>Payments to Security Personnel</Text>
              <Ionicons 
                name={showSection === 'bouncersPayments' ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="black" 
              />
            </TouchableOpacity>

            {showSection === 'bouncersPayments' && (
              <View style={styles.extraInfo}>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle}>Total Payments:</Text>
                  <Text style={styles.summaryTextData}>600</Text>
                </View>
                {/* Breakdown by night */}
                <Text style={styles.summaryTextTitle}>Breakdown by Night:</Text>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Monday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Tuesday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Wednesday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
              </View>
            )}
          </View>

          {/* Profit Dropdown */}
          <View style={styles.summary}>
            <TouchableOpacity 
              style={styles.dropdownButton} 
              onPress={() => toggleSection('profit')}
            >
              <Text style={styles.summaryTitle}>Profit</Text>
              <Ionicons 
                name={showSection === 'profit' ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="black" 
              />
            </TouchableOpacity>

            {showSection === 'profit' && (
              <View style={styles.extraInfo}>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle}>Total Profit:</Text>
                  <Text style={styles.summaryTextData}>600</Text>
                </View>
                {/* Breakdown by night */}
                <Text style={styles.summaryTextTitle}>Breakdown by Night:</Text>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Monday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Tuesday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Wednesday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.buttonsContainer}>
            <CustomButton
              title="View Data Analytics"
              handlePress={() => navigation.navigate('dataAnalytics')}
              customStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <CustomButton
              title="Back"
              handlePress={() => navigation.navigate('securityAdminHome')}
              customStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryTextTitle2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryTextData: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  extraInfo: {
    marginTop: 10,
  },
  buttonsContainer: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  button: {
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default Finance;
