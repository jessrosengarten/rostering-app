import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { images } from '../../constants';
import { getShiftsForPersonnel } from '../../Backend/securityAdmin';

const SecurityPersonnelPayments = () => {
  const router = useRouter();
  const { personnelName } = useLocalSearchParams();
  const [paymentData, setPaymentData] = useState({ payments: {}, total: 0, weekRange: '' });

  useEffect(() => {
    const fetchShifts = async () => {
      if (personnelName) {
        const { shifts, weekRange } = await getShiftsForPersonnel(personnelName);
        const numericShifts = Object.fromEntries(
          Object.entries(shifts).map(([day, amount]) => [day, Number(amount)])
        );
        const total = Object.values(numericShifts).reduce((sum, amount) => sum + amount, 0);
        setPaymentData({ payments: numericShifts, total, weekRange });
      }
    };

    fetchShifts();
  }, [personnelName]);

  // Temporary payment status
  const paymentStatus = paymentData.isPaid ? "Paid" : "Not Paid";

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <View style={styles.header}>
          <Text style={styles.headerText}>Security Personnel Payments</Text>
        </View>

        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.paymentDetails}>
              <Text style={styles.sectionTitle}>To Pay {personnelName}</Text>
              <Text style={styles.weekRangeText}>({paymentData.weekRange})</Text>
              {Object.keys(paymentData.payments).map((day, index) => (
                <View key={index} style={styles.paymentRow}>
                  <Text style={styles.dayText}>{day}:</Text>
                  <Text style={styles.amountText}>
                    R {paymentData.payments[day] ? paymentData.payments[day].toFixed(2) : '0.00'}
                  </Text>
                </View>
              ))}

              {/* Total */}
              <View style={styles.paymentRow}>
                <Text style={[styles.dayText, { fontWeight: 'bold' }]}>Total for the Week:</Text>
                <Text style={[styles.amountText, { fontWeight: 'bold', color: 'red' }]}>
                  R {paymentData.total.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Payment Button */}
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>Make Payment</Text>
            </TouchableOpacity>

            {/* Payment Status */}
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>
                Payment Status:
                <Text style={paymentStatus === "Paid" ? styles.paidText : styles.notPaidText}>
                  {` ${paymentStatus}`}
                </Text>
              </Text>
            </View>
          </ScrollView>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SecurityPersonnelPayments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  scrollContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  clubName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
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
  paymentDetails: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  amountText: {
    fontSize: 16,
    color: '#333',
  },
  paymentButton: {
    backgroundColor: '#E21A1A',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});