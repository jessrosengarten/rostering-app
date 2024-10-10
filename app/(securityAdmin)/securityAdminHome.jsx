import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { icons, images } from "../../constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

// Dummy data
const clubs = [
  { name: 'Omnia', logo: (images.omnia) },
  { name: 'Jail Night Club', logo: (images.jail) },
  { name: 'Oasis Disco Bar', logo: (images.oasis) },
  { name: 'Neon Night Club', logo: (images.neon) },
];

// Dummy data
const securityPersonnel = [
  { name: 'Jess', logo: (images.profileFemale) },
  { name: 'Dagan', logo: (images.profileMale) },
  { name: 'Shannon', logo: (images.profileFemale) },
  { name: 'Rudi', logo: (images.profileMale) },
];

// Dummy data
const clubManagers = [
  { name: 'Bob', logo: (images.profileMale) },
  { name: 'Jason', logo: (images.profileMale) },
  { name: 'Megan', logo: (images.profileFemale) },
  { name: 'Sally', logo: (images.profileMale) },
  { name: 'Ben', logo: (images.profileMale) },
];

const SecurityAdmin = () => {
  const navigation = useNavigation();

  // Handle the navigation
  const handleNavigation = (type, name) => {
    if (type == 'clubs') {
      navigation.navigate('clubDetails', { clubName: name });  
    } 
    else if (type == 'securityPersonnel') {
      navigation.navigate('securityPersonnelProfile', { securityName: name });  
    } 
    else if (type == 'clubManagers') {
      navigation.navigate('clubManagerDetails', { managerName: name });  
    }
  };

    // Display the lists of clubs, security personnel, and club managers
    const displayItems = ({ item }, type) => (
      <TouchableOpacity onPress={() => handleNavigation(type, item.name)}>
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
          <View style={styles.header}>
            <Text style={styles.headerText}>Clarence</Text>
          </View>

          <View style={styles.section}>
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
            {/* Add User Button */}
            <CustomButton  
               handlePress={() => {router.push('/addUsers')}}
              title="Add User"
              style={styles.addButton}/>
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
    backgroundColor: '#e0e0e0',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  clubItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  clubLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  clubName: {
    marginTop: 5,
    fontSize: 14,
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
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  menuItem: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 5,
    paddingHorizontal:  8,
    borderRadius: 5,
    alignItems: 'center',
},
});

export default SecurityAdmin;
