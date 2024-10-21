import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { images } from '../../constants';
import { useRoute, useNavigation } from '@react-navigation/native';  // Hook for React Navigation
import commonStyles from '../../components/Styles';
const { width } = Dimensions.get('window');

const ClubDetails = () => {
  const route = useRoute();  // Hook to get the current route
  const navigation = useNavigation();  // For navigation
  const { club } = route.params;  // Get the club object from the route parameters

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
            <CustomButton
              title="Finances"
              handlePress={() => navigation.navigate('clubPayments', { club })}
              customStyle={styles.button}
              textStyle={styles.buttonText}
            />

            <CustomButton
              title="Assign Personnel"
              handlePress={() => navigation.navigate('assignPersonnelManagement')}
              customStyle={[styles.button, styles.button]}
              textStyle={styles.buttonText}
            />

            <CustomButton
              title="View Club Schedule"
              handlePress={() => navigation.navigate('clubSpecificSchedule', {club })}
              customStyle={[styles.button, styles.button]}
              textStyle={styles.buttonText}
            />

            <CustomButton
              title="Back"
              handlePress={() => navigation.navigate('securityAdminHome', { club })}  // Pass the club data to the next screen
              customStyle={[styles.button, styles.button]}
              textStyle={styles.buttonText}
            />
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
    marginVertical: 20,
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
    marginTop: 5,
  },
  button: {
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ClubDetails;
