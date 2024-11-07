import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { icons, images } from "../../constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { fetchAllClubs, fetchAllSecurityPersonnel, fetchAllClubManagers } from '../../Backend/securityAdmin';

// Dummy payment data for different clubs
const paymentData = {
  'Neon Night Club': {
    payments: {
      Thursday: 750.00,
      Friday: 950.00,
      Saturday: 500.00,
      Sunday: 1250.00,
    },
    total: 3450.00,
  },
  'Jail Night Club': {
    payments: {
      Thursday: 650.00,
      Friday: 800.00,
      Saturday: 700.00,
      Sunday: 1100.00,
    },
    total: 3250.00,
  },
  'Omnia': {
    payments: {
      Thursday: 550.00,
      Friday: 1050.00,
      Saturday: 900.00,
      Sunday: 1300.00,
    },
    total: 3800.00,
  },
};

const SecurityAdmin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { adminName } = route.params;
  const [clubs, setClubs] = useState([]);
  const [securityPersonnel, setSecurityPersonnel] = useState([]);
  const [clubManagers, setClubManagers] = useState([]);

  useEffect(() => {
    const loadClubs = async () => {
      const clubsData = await fetchAllClubs();
      const clubsArray = Object.keys(clubsData).map(key => ({
        name: key,
        ...clubsData[key],
      }));
      setClubs(clubsArray);
    };

    const loadPersonnel =async() => {
      const personnelData =await fetchAllSecurityPersonnel();
      const personnelArray = Object.keys(personnelData).map(key => ({
        name: key,
        ...personnelData[key],
      }));
      setSecurityPersonnel(personnelArray);
    };

    const loadManagers =async() => {
      const managersData =await fetchAllClubManagers();
      const managersArray = Object.keys(managersData).map(key => ({
        name: key,
        ...managersData[key],
      }));
      setClubManagers(managersArray);
    };
    loadManagers();
    loadClubs();
    loadPersonnel();
  }, []);

  // Handle the navigation when a club, security personnel, or club manager is selected
  const handleNavigation = (type, item) => {

    if (type == 'clubs') {
      // Navigate to ClubDetails and pass the entire club object to the page
      navigation.navigate('clubDetails', { club: item, paymentData: paymentData[item.name] });
    }

    else if (type == 'securityPersonnel') {
      // Navigate to securityPersonnelProfile and pass the entire personnel object to the page
      navigation.navigate('securityPersonnelProfile', { securityPersonnel: item });
      console.log({securityPersonnel: item})
    }

    else if (type == 'clubManagers') {
      navigation.navigate('clubManagerDetails', { clubmanager: item });
      console.log({clubManager: item})
    }
  };

  // Display the list items
 const displayItems = ({ item }, type) => {
  let logoSource = null;
  let displayName = "";

  if (type === 'clubs') {
    displayName = item.name; 
    logoSource = item.logo || images.clubDefaultLogo; 
  } else if (type === 'securityPersonnel'|| type === 'clubManagers') {
    displayName = item.fullName; 
    logoSource = images.profileMale;
  } 

  return (
    <TouchableOpacity onPress={() => handleNavigation(type, item)}>
      <View style={styles.personnelItem}>
        <Image source={logoSource} style={styles.personIcon} />
        <Text style={styles.personName}>{displayName}</Text>
      </View>
    </TouchableOpacity>
  );
};

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView style={styles.container}>
          {/* Semi-transparent Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Security Admin Home</Text>
            <Text style={styles.headerText}>{adminName}</Text>
          </View>

          {/* Clubs Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Clubs</Text>
            <FlatList
              data={clubs}
              horizontal
              renderItem={(item) => displayItems(item, 'clubs')}
              keyExtractor={(item) => item.name}
              showsHorizontalScrollIndicator={false}
              style={styles.clubList}
            />
          </View>

          {/* Security Personnel Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Security Personnel</Text>
            <FlatList
              data={securityPersonnel}
              horizontal
              renderItem={(item) => displayItems(item, 'securityPersonnel')}
              keyExtractor={(item) => item.name}
              showsHorizontalScrollIndicator={false}
              style={styles.personnelList}
            />
          </View>

          {/* Club Managers Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Club Managers</Text>
            <FlatList
              data={clubManagers}
              horizontal
              renderItem={(item) => displayItems(item, 'clubManagers')}
              keyExtractor={(item) => item.name}
              showsHorizontalScrollIndicator={false}
              style={styles.personnelList}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: { padding: 15, backgroundColor: 'rgba(255, 255, 255, 0.7)' },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
  clubList: {
    paddingHorizontal: 10,
  },
  personnelList: {
    paddingHorizontal: 10,
  },
  personnelItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  personIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d0d0d0',
  },
  personName: {
    marginTop: 5,
    fontSize: 14,
  },
  documentContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});

export default SecurityAdmin;
