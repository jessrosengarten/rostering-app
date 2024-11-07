import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';

const Finance = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [showSection, setShowSection] = useState(null);

  const toggleSection = (section) => {
    setShowSection((prevSection) => (prevSection === section ? null : section));
  };

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Finance Management</Text>
          </View>

          {['clubPayments', 'allClubsPayments', 'bouncersPayments', 'profit'].map((section) => (
            <View key={section} style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => toggleSection(section)}
              >
                <Text style={styles.dropdownTitle}>
                  {section === 'clubPayments'
                    ? 'Payments from Specific Club'
                    : section === 'allClubsPayments'
                      ? 'Payments from All Clubs'
                      : section === 'bouncersPayments'
                        ? 'Payments to Security Personnel'
                        : 'Profit'}
                </Text>
                <Ionicons
                  name={showSection === section ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>

              {showSection === section && (
                <View style={styles.dropdownContent}>
                  <View style={styles.row}>
                    <Text style={styles.textLabel}>Total Earned:</Text>
                    <Text style={styles.textValue}>600</Text>
                  </View>
                  <Text style={styles.textLabel}>Breakdown by Night:</Text>
                  {['Monday', 'Tuesday', 'Wednesday'].map((day) => (
                    <View key={day} style={styles.row}>
                      <Text style={styles.textLabelSecondary}>{day}:</Text>
                      <Text style={styles.textValue}>200</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

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
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d3d3d3',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownContent: {
    marginTop: 10,
    backgroundColor: '#fafafa',
    padding: 15,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  textLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  textLabelSecondary: {
    fontSize: 15,
    color: '#777',
  },
  textValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonsContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  button: {
    marginVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default Finance;
