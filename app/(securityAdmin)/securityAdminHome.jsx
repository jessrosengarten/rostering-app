import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { icons, images } from "../../constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import CustomButton from '../../components/CustomButton';

// Dummy data for clubs
const clubs = [
  { name: 'Omnia', logo: (images.omnia), address: 'Cape Town', manager: 'Alice', contact: '012 345 6789', opening: '20:00', closing: '02:00' },
  { name: 'Jail Night Club', logo: (images.jail), address: 'Johannesburg', manager: 'Tom', contact: '011 123 4567', opening: '21:00', closing: '03:00' },
  { name: 'Oasis Disco Bar', logo: (images.oasis), address: 'Sandton', manager: 'Donald', contact: '011 567 0987', opening: '19:00', closing: '00:00' },
  { name: 'Neon Night Club', logo: (images.neon), address: 'Durban', manager: 'Kate', contact: '031 876 5432', opening: '22:00', closing: '04:00' },
];

// Dummy data for security personnel
const securityPersonnel = [
  { name: 'Jess', logo: (images.profileFemale), rate: 500, address: 'JHB', contact: '011 567 0987' },
  { name: 'Dagan', logo: (images.profileMale), rate: 200, address: 'CPT', contact: '011 567 0987' },
  { name: 'Shannon', logo: (images.profileFemale), rate: 750, address: 'JHB', contact: '011 567 0987' },
  { name: 'Rudi', logo: (images.profileMale), rate: 700, address: 'CPT', contact: '011 567 0987' },
];


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

// Dummy data for club managers
const clubManagers = [
  { name: 'Bob', logo: (images.profileMale) },
  { name: 'Jason', logo: (images.profileMale) },
  { name: 'Megan', logo: (images.profileFemale) },
  { name: 'Sally', logo: (images.profileMale) },
  { name: 'Ben', logo: (images.profileMale) },
];

const SecurityAdmin = () => {
  const navigation = useNavigation();

  // Handle the navigation when a club, security personnel, or club manager is selected
  const handleNavigation = (type, item) => {
   
    if (type == 'clubs') {
      // Navigate to ClubDetails and pass the entire club object to the page
      navigation.navigate('clubDetails', { club: item });
    } 
    
    else if (type == 'securityPersonnel') {
      // Navigate to securityPersonnelProfile and pass the entire personnel object to the page
      navigation.navigate('securityPersonnelProfile', { securityPersonnel: item });
    } 
    
    else if (type == 'clubManagers') {
      navigation.navigate('clubManagerDetails', { managerName: item.name });
    }
  };

  // Display the list items
  const displayItems = ({ item }, type) => (
    <TouchableOpacity onPress={() => handleNavigation(type, item)}>
      <View style={styles.personnelItem}>
        <Image source={item.logo} style={styles.personIcon} />
        <Text style={styles.personName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView style={styles.container}>
          {/* Semi-transparent Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Security Admin Home</Text>
          </View>
          <View style={styles.section}>
            <FlatList
              data={clubs}
              horizontal
              renderItem={(item) => displayItems(item, 'clubs')}
              keyExtractor={(item) => item.name}
              showsHorizontalScrollIndicator={false}
              style={styles.clubList}
            />
          </View>

          <View style={styles.section}>
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

          <View style={styles.section}>
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
});

export default SecurityAdmin;
