import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getEstimatedAmountsForAllClubs, getAmountsForAllSecurityPersonnel } from '../../Backend/securityAdmin';

const Finance = () => {
  const router = useRouter();
  const [showSection, setShowSection] = useState(null);
  const [estimatedAmounts, setEstimatedAmounts] = useState({});
  const [personnelAmounts, setPersonnelAmounts] = useState({});

  useEffect(() => {
    const fetchEstimatedAmounts = async () => {
      try {
        const amounts = await getEstimatedAmountsForAllClubs();
        setEstimatedAmounts(amounts);
      } catch (error) {
        console.error('Error fetching estimated amounts:', error);
      }
    };

    const fetchPersonnelAmounts = async () => {
      try {
        const amounts = await getAmountsForAllSecurityPersonnel();
        setPersonnelAmounts(amounts);
      } catch (error) {
        console.error('Error fetching personnel amounts:', error);
      }
    };

    fetchEstimatedAmounts();
    fetchPersonnelAmounts();
  }, []);

  const toggleSection = (section) => {
    setShowSection((prevSection) => (prevSection === section ? null : section));
  };

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const renderCosts = (costs) => {
    const sortedCosts = costs.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
    return sortedCosts.map(({ day, amount }) => (
      <View style={styles.row} key={day}>
        <Text style={styles.summaryTextTitle2}>{day}:</Text>
        <Text style={styles.summaryTextData}>R{amount}</Text>
      </View>
    ));
  };

  const renderPersonnelCosts = (personnel, currentWeekRange, nextWeekRange) => {
    return personnel
      .filter(({ currentWeekAmount, nextWeekAmount }) => currentWeekAmount > 0 || nextWeekAmount > 0)
      .map(({ name, currentWeekAmount, nextWeekAmount }) => (
        <View key={name} style={styles.clubContainer}>
          <View style={styles.clubCosts}>
            <Text style={styles.clubName}>{name}</Text>
            <Text style={styles.summaryTextTitle}>
              This Week: <Text style={styles.dateText}> ({currentWeekRange})</Text>
            </Text>
            <View style={styles.row}>
              <Text style={styles.summaryTextTitle2}>Actual Amount:</Text>
              <Text style={styles.summaryTextData}>R{currentWeekAmount}</Text>
            </View>
            <Text style={styles.summaryTextTitle}>
              Next Week: <Text style={styles.dateText}> ({nextWeekRange})</Text>
            </Text>
            <View style={styles.row}>
              <Text style={styles.summaryTextTitle2}>Estimated Amount:</Text>
              <Text style={styles.summaryTextData}>R{nextWeekAmount}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      ));
  };

  const totalPaymentsThisWeek = personnelAmounts.personnel?.reduce((acc, { currentWeekAmount }) => acc + currentWeekAmount, 0) || 0;
  const estimatedPaymentsNextWeek = personnelAmounts.personnel?.reduce((acc, { nextWeekAmount }) => acc + nextWeekAmount, 0) || 0;

  const renderClubCosts = (clubName, costs, currentWeekRange, nextWeekRange) => {
    const actualEarnThisWeek = costs.currentWeek.reduce((total, { amount }) => total + amount, 0);

    return (
      <View key={clubName} style={styles.clubContainer}>
        <View style={styles.clubCosts}>
          <Text style={styles.clubName}>{clubName}</Text>
          {costs.currentWeek.length > 0 && (
            <>
              <Text style={styles.summaryTextTitle}>
                This Week: <Text style={styles.dateText}> ({currentWeekRange})</Text>
              </Text>
              {renderCosts(costs.currentWeek)}
              <View style={styles.row}>
                <Text style={styles.summaryTextTitle2}>Actual Earn:</Text>
                <Text style={styles.summaryTextData}>R{actualEarnThisWeek}</Text>
              </View>
            </>
          )}
          {costs.nextWeek.length > 0 && (
            <>
              <Text style={styles.summaryTextTitle}>
                Next Week: <Text style={styles.dateText}> ({nextWeekRange})</Text>
              </Text>
              {renderCosts(costs.nextWeek)}
            </>
          )}
          <View style={styles.row}>
            <Text style={styles.summaryTextTitle2}>Estimated Earn:</Text>
            <Text style={styles.summaryTextData}>R
              {costs.nextWeek.reduce((total, { amount }) => total + amount, 0)}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    );
  };

  const totalActualEarnThisWeek = Object.values(estimatedAmounts.clubs || {}).reduce((acc, clubCosts) => {
    return acc + clubCosts.currentWeek.reduce((sum, { amount }) => sum + amount, 0);
  }, 0);

  const totalEstimatedEarnNextWeek = Object.values(estimatedAmounts.clubs || {}).reduce((acc, clubCosts) => {
    return acc + clubCosts.nextWeek.reduce((sum, { amount }) => sum + amount, 0);
  }, 0);

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Finance Management</Text>
          </View>

          {/* Payments from All Clubs Dropdown */}
          <View style={styles.summary}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => toggleSection('allClubsPayments')}
            >
              <Text style={styles.summaryTitle}>Payments from All Clubs</Text>
              <Ionicons
                name={showSection === 'allClubsPayments' ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="black"
              />
            </TouchableOpacity>
            {showSection === 'allClubsPayments' && (
              <View style={styles.extraInfo}>
                {/* Breakdown by night */}
                {Object.entries(estimatedAmounts.clubs || {}).map(([clubName, costs]) =>
                  renderClubCosts(clubName, costs, estimatedAmounts.currentWeekRange, estimatedAmounts.nextWeekRange)
                )}
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle}>Total Actual Earn:</Text>
                  <Text style={styles.summaryTextData}>R{totalActualEarnThisWeek}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle}>Total Estimated Earn:</Text>
                  <Text style={styles.summaryTextData}>R{totalEstimatedEarnNextWeek}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Payments to Bouncers Dropdown */}
          <View style={styles.summary}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => toggleSection('bouncersPayments')}
            >
              <Text style={styles.summaryTitle}>Payments to Security Personnel</Text>
              <Ionicons
                name={showSection === 'bouncersPayments' ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="black"
              />
            </TouchableOpacity>

            {showSection === 'bouncersPayments' && (
              <View style={styles.extraInfo}>
                {/* Breakdown by night */}
                {renderPersonnelCosts(personnelAmounts.personnel || [], personnelAmounts.currentWeekRange, personnelAmounts.nextWeekRange)}
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle}>Total Payments This Week:</Text>
                  <Text style={styles.summaryTextData}>R{totalPaymentsThisWeek}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle}>Total Payments Next Week:</Text>
                  <Text style={styles.summaryTextData}>R{estimatedPaymentsNextWeek}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Profit Dropdown */}
          <View style={styles.summary}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => toggleSection('profit')}
            >
              <Text style={styles.summaryTitle}>Profit</Text>
              <Ionicons
                name={showSection === 'profit' ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="black"
              />
            </TouchableOpacity>

            {showSection === 'profit' && (
              <View style={styles.extraInfo}>
                {/* Breakdown by night */}
                <Text style={styles.summaryTextTitle}>Breakdown by Night:</Text>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Monday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Tuesday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle2}>Wednesday:</Text>
                  <Text style={styles.summaryTextData}>200</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.summaryTextTitle}>Total Profit:</Text>
                  <Text style={styles.summaryTextData}>600</Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.buttonsContainer}>
            <CustomButton
              title="View Data Analytics"
              handlePress={() => router.push('dataAnalytics')}
              customStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <CustomButton
              title="Back"
              handlePress={() => router.push('securityAdminHome')}
              customStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15, // Reduced width by adding margin on sides
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Shadow effect
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryTextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'red',
  },
  summaryTextTitle2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryTextData: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  dateText: {
    fontSize: 12,
    color: 'black',
  },
  extraInfo: {
    marginTop: 10,
  },
  buttonsContainer: {
    marginTop: 30,
    marginHorizontal: 40,
  },
  button: {
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  clubContainer: {
    marginBottom: 20,
  },
  clubCosts: {
    marginBottom: 20,
  },
  clubName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  separator: {
    height: 1,
    backgroundColor: '#d3d3d3',
    marginVertical: 10,
  },
});

export default Finance;