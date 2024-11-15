import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { fetchAllClubsByManager } from '../../Backend/securityAdmin';

const { width } = Dimensions.get('window');

const ClubManagerDetails = () => {
  const [clubs, setClubs] = useState([]);
  const router = useRouter();
  const { clubmanager } = useLocalSearchParams();
  const parsedClubManager = JSON.parse(clubmanager);

  useEffect(() => {
    const loadClubs = async () => {
      const clubsData = await fetchAllClubsByManager(parsedClubManager.fullName);
      const clubsArray = Object.values(clubsData);
      setClubs(clubsArray);
    };

    loadClubs();
  }, [parsedClubManager]);

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{parsedClubManager.fullName}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Manager Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="business-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Club/s Managed:</Text>
            </View>
            <FlatList
              data={clubs}
              renderItem={({ item }) => (
                <Text style={styles.detailText}>{item}</Text>)}
              keyExtractor={(item) => item} />

            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Contact:</Text>
            </View>
            <Text style={styles.detailText}>{parsedClubManager.contactNumber}</Text>

            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Email:</Text>
            </View>
            <Text style={styles.detailText}>{parsedClubManager.email}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push({ pathname: '/securityAdminHome' })}
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
    alignItems: 'center',
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

export default ClubManagerDetails;
