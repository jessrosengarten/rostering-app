import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useRoute, useNavigation } from '@react-navigation/native';  // Hook for React Navigation
import commonStyles from '../../components/Styles';

const { width } = Dimensions.get('window');

const ClubDetails = () => {
  const route = useRoute();  // Hook to get the current route
  const navigation = useNavigation();  // For navigation
  const { club, paymentData } = route.params;  // Get the club object from the route parameters

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{club.name}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Club Details */}
          <View style={styles.detailsContainer}>
            <Text style={commonStyles.detailTitle}>Address:</Text>
            <Text style={commonStyles.detailText}>{club.address}</Text>

            <Text style={commonStyles.detailTitle}>Manager:</Text>
            <Text style={commonStyles.detailText}>{club.manager}</Text>

            <Text style={commonStyles.detailTitle}>Contact Details:</Text>
            <Text style={commonStyles.detailText}>{club.contact}</Text>

            <Text style={commonStyles.detailTitle}>Opening Time:</Text>
            <Text style={commonStyles.detailText}>{club.opening}</Text>

            <Text style={commonStyles.detailTitle}>Closing Time:</Text>
            <Text style={commonStyles.detailText}>{club.closing}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('clubPayments', { club, paymentData })}
            >
              <Text style={styles.buttonText}>Finances</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('assignPersonnelManagement')}
            >
              <Text style={styles.buttonText}>Assign Personnel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('clubSpecificSchedule', { club })}
            >
              <Text style={styles.buttonText}>View Club Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('securityAdminHome', { club })}  // Pass the club data to the next screen
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
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
  detailsContainer: {
    marginVertical: 10,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  button: {
    width: (width / 2) - 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E21A1A',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ClubDetails;
