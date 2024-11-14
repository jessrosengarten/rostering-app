import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const SecurityPersonnelProfile = () => {
  const { securityPersonnel } = useLocalSearchParams();
  const router = useRouter();
  const parsedPersonnel = JSON.parse(securityPersonnel);

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.backgroundImage}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{parsedPersonnel.fullName}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Personnel Info */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="cash-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Rate per Shift:</Text>
            </View>
            <Text style={styles.detailText}>{parsedPersonnel.rate}</Text>

            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Email:</Text>
            </View>
            <Text style={styles.detailText}>{parsedPersonnel.email}</Text>

            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={18} color="#E21A1A" />
              <Text style={styles.detailTitle}>Contact Details:</Text>
            </View>
            <Text style={styles.detailText}>{parsedPersonnel.contactNumber}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('securityPersonnelDocuments')}
            >
              <Text style={styles.buttonText}>View Documents</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('securityPersonnelPayments')}
            >
              <Text style={styles.buttonText}>Finances</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('securityAdminHome')}
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
    textAlign: 'left',
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

export default SecurityPersonnelProfile;
