import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getClubFinances } from '../../Backend/securityAdmin';

const Payments = () => {
  const { clubName } = useLocalSearchParams();
  const [paymentData, setPaymentData] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('Not Paid');
  const [weekRange, setWeekRange] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const { weekRange, finances } = await getClubFinances(clubName);
        const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const sortedFinances = finances.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
        setPaymentData(sortedFinances);
        setWeekRange(weekRange);

        // Determine payment status based on the fetched data
        const isPaid = finances.some(finance => finance.amountDue > 0);
        setPaymentStatus(isPaid ? 'Paid' : 'Not Paid');
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchPaymentData();
  }, [clubName]);

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          {/* Semi-transparent Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Payments: {clubName}</Text>
          </View>

          {/* Payments List */}
          <View style={styles.paymentDetails}>
            <Text style={styles.sectionTitle}>Total Income:</Text>
            <Text style={styles.weekRangeText}>{weekRange}</Text>
            {paymentData.map((data, index) => (
              <View key={index} style={styles.paymentRow}>
                <Text style={styles.dayText}>{data.day}:</Text>
                <View style={styles.amountContainer}>
                  <Text style={styles.amountText}>R {data.amountDue.toFixed(2)}</Text>
                </View>
              </View>
            ))}

            {/* Total Row */}
            <View style={styles.paymentRow}>
              <Text style={[styles.dayText, { fontWeight: 'bold' }]}>Total for the Week:</Text>
              <View style={styles.amountContainer}>
                <Text style={[styles.amountText, { fontWeight: 'bold', color: 'red' }]}>
                  R {paymentData.reduce((total, data) => total + data.amountDue, 0).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          {/* Payment Status */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              Payment Status:
              <Text style={paymentStatus === 'Paid' ? styles.paidText : styles.notPaidText}>
                {` ${paymentStatus}`}
              </Text>
            </Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  paymentDetails: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginTop: 40,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },

  weekRangeText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: 10,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  amountContainer: {
    width: 120,
    alignItems: 'flex-start',
  },
  amountText: {
    fontSize: 16,
    color: '#333',
  },
  statusContainer: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statusText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  paidText: {
    color: 'green',
    fontWeight: 'bold',
  },
  notPaidText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Payments;