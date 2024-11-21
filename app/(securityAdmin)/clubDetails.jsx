import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const ClubDetails = () => {
  const router = useRouter();
  const { club } = useLocalSearchParams();
  const parsedClub = JSON.parse(club);

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{parsedClub.name}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Club Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Address:</Text>
            </View>
            <Text style={styles.detailText}>{parsedClub.address}</Text>

            <View style={styles.detailRow}>
              <Ionicons name="person-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Manager:</Text>
            </View>
            <Text style={styles.detailText}>{parsedClub.manager}</Text>

            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Contact:</Text>
            </View>
            <Text style={styles.detailText}>{parsedClub.contactNum}</Text>

            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Opening Time:</Text>
            </View>
            <Text style={styles.detailText}>{parsedClub.openingTime}</Text>

            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Closing Time:</Text>
            </View>
            <Text style={styles.detailText}>{parsedClub.closingTime}</Text>

            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Rate:</Text>
            </View>
            <Text style={styles.detailText}>R{parsedClub.rate}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push({pathname:'clubPayments', 
                params: { club }})}
            >
              <Text style={styles.buttonText}>Finances</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push({
                pathname: 'assignPersonnelManagement',
                params: { club: JSON.stringify(parsedClub), }
              })}
            >
              <Text style={styles.buttonText}>Assign Personnel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push({
                pathname: 'clubSpecificSchedule',
                params: {
                  club: JSON.stringify(parsedClub),
                },
              })}
            >
              <Text style={styles.buttonText}>View Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push(`securityAdminHome?club=${encodeURIComponent(parsedClub)}`)}
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
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',  // Center the content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  detailTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    width: (width / 2) - 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E21A1A',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default ClubDetails;