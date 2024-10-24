import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Finance = () => {
  const route = useRoute();
  const navigation = useNavigation(); 
  
  // State for dropdown visibility
  const [showClubPayments, setShowClubPayments] = useState(false);
  const [showAllClubsPayments, setShowAllClubsPayments] = useState(false);
  const [showBouncersPayments, setShowBouncersPayments] = useState(false);
  const [showProfit, setShowProfit] = useState(false);

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView contentContainerStyle={{ height: '100%' }}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Finance Management</Text>
          </View>

          {/* Payments from Specific Club Dropdown */}
          <View style={styles.summary}>
            <TouchableOpacity 
              style={styles.dropdownButton} 
              onPress={() => setShowClubPayments(!showClubPayments)}
            >
              <Text style={styles.summaryTitle}>Payments from ...</Text>
              <Ionicons 
                name={showClubPayments ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="black" 
              />
            </TouchableOpacity>

            {showClubPayments && (
              <View style={styles.extraInfo}>
                <Text style={styles.summaryTextTitle}>Total Earned:</Text>
                <Text style={styles.summaryTextData}>600</Text>
                {/* Breakdown by night */}
                <Text style={styles.summaryTextTitle}>Breakdown by Night:</Text>
                <Text style={styles.summaryTextTitle2}>Monday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
                <Text style={styles.summaryTextTitle2}>Tuesday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
                <Text style={styles.summaryTextTitle2}>Wednesday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
              </View>
            )}
          </View>

          {/* Payments from All Clubs Dropdown */}
          <View style={styles.summary}>
            <TouchableOpacity 
              style={styles.dropdownButton} 
              onPress={() => setShowClubPayments(!showClubPayments)}
            >
              <Text style={styles.summaryTitle}>Payments from All Clubs</Text>
              <Ionicons 
                name={showClubPayments ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="black" 
              />
            </TouchableOpacity>

            {showClubPayments && (
              <View style={styles.extraInfo}>
                <Text style={styles.summaryTextTitle}>Total Earned:</Text>
                <Text style={styles.summaryTextData}>600</Text>
                {/* Breakdown by night */}
                <Text style={styles.summaryTextTitle}>Breakdown by Night:</Text>
                <Text style={styles.summaryTextTitle2}>Monday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
                <Text style={styles.summaryTextTitle2}>Tuesday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
                <Text style={styles.summaryTextTitle2}>Wednesday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
              </View>
            )}
          </View>

          {/* Payments to Bouncers Dropdown */}
          <View style={styles.summary}>
            <TouchableOpacity 
              style={styles.dropdownButton} 
              onPress={() => setShowClubPayments(!showClubPayments)}
            >
              <Text style={styles.summaryTitle}>Payments to Security Personnel</Text>
              <Ionicons 
                name={showClubPayments ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="black" 
              />
            </TouchableOpacity>

            {showClubPayments && (
              <View style={styles.extraInfo}>
                <Text style={styles.summaryTextTitle}>Total Payments:</Text>
                <Text style={styles.summaryTextData}>600</Text>
                {/* Breakdown by night */}
                <Text style={styles.summaryTextTitle}>Breakdown by Night:</Text>
                <Text style={styles.summaryTextTitle2}>Monday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
                <Text style={styles.summaryTextTitle2}>Tuesday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
                <Text style={styles.summaryTextTitle2}>Wednesday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
              </View>
            )}
          </View>

{/* Profit Dropdown */}
          <View style={styles.summary}>
            <TouchableOpacity 
              style={styles.dropdownButton} 
              onPress={() => setShowClubPayments(!showClubPayments)}
            >
              <Text style={styles.summaryTitle}>Profit</Text>
              <Ionicons 
                name={showClubPayments ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="black" 
              />
            </TouchableOpacity>

            {showClubPayments && (
              <View style={styles.extraInfo}>
                <Text style={styles.summaryTextTitle}>Total Profit:</Text>
                <Text style={styles.summaryTextData}>600</Text>
                {/* Breakdown by night */}
                <Text style={styles.summaryTextTitle}>Breakdown by Night:</Text>
                <Text style={styles.summaryTextTitle2}>Monday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
                <Text style={styles.summaryTextTitle2}>Tuesday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
                <Text style={styles.summaryTextTitle2}>Wednesday:</Text>
                <Text style={styles.summaryTextData}>200</Text>
              </View>
            )}
          </View>

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
  )
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
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
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryTextTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },

    summaryTextTitle2: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  summaryTextData: {
    marginTop: 10,
    fontSize: 16,
  },
  extraInfo: {
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#E21A1A',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Finance;
