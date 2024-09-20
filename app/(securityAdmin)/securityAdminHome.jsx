import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { icons, images } from "../../constants";
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample data for clubs, security personnel, and managers
const clubs = [
  { name: 'Omnia', logo: (images.omnia) },
  { name: 'Jail Night Club', logo: (images.jail) },
  { name: 'Oasis Disco Bar', logo: (images.oasis) },
  { name: 'Neon Night Club', logo: (images.neon) },
];

const securityPersonnel = [
  { name: 'Frikkie', logo: (images.profileMale) },
  { name: 'Trent', logo: (images.profileMale) },
  { name: 'Dagan', logo: (images.profileMale) },
  { name: 'Shannon', logo: (images.profileFemale) },
  { name: 'Rudi', logo: (images.profileMale) },
];

const clubManagers = [
  { name: 'Bob', logo: (images.profileMale) },
  { name: 'Jason', logo: (images.profileMale) },
  { name: 'Megan', logo: (images.profileFemale) },
  { name: 'Sally', logo: (images.profileMale) },
  { name: 'Ben', logo: (images.profileMale) },
];

const SecurityAdmin = () => {

  // function to diplay the lists of clubs, security personnel and club managers. 
  const displayItmes = ({ item }) => (
    <View style={styles.personnelItem}>
      <Image source={item.logo} style={styles.personIcon} />
      <Text style={styles.personName}>{item.name}</Text>
    </View>
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
              renderItem={displayItmes}
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
              renderItem={displayItmes}
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
              renderItem={displayItmes}
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
});

export default SecurityAdmin;
