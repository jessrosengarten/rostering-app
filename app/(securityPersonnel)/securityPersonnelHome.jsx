import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { fetchPersonnelShifts, cancelShift, checkAvailablePersonnel, reassignShiftToPersonnel } from '../../Backend/securityPersonnel';
import { router, useLocalSearchParams } from 'expo-router';
import NotificationService from '../../Backend/NotificationService';
import * as Notifications from 'expo-notifications';

const { width, height } = Dimensions.get('window');

const SecurityHome = () => {
  const [thisWeekShifts, setThisWeekShifts] = useState([]);
  const [nextWeekShifts, setNextWeekShifts] = useState([]);
  const thisWeekDates = getWeekRange();
  const nextWeekDates = getNextWeekRange();
  const { personnelName } = useLocalSearchParams();
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    NotificationService.registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch(error => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    setThisWeekShifts([]);
    setNextWeekShifts([]);
    const fetchShifts = async () => {
      try {
        const fetchedShifts = await fetchPersonnelShifts(personnelName, thisWeekDates);
        const nextWeekShifts = await fetchPersonnelShifts(personnelName, nextWeekDates);
        setNextWeekShifts(nextWeekShifts);
        setThisWeekShifts(fetchedShifts);
      } catch (error) {
        Alert.alert('Notice', error.message);
      }
    };

    fetchShifts();
  }, [personnelName]);

  const hasDatePassed = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0); // setting time to midnight
    return inputDate <= currentDate;
  };

  // Function to get the date range for the week
  function getWeekRange(date = new Date()) {
    const currentDate = new Date(date);

    const startOfWeekDay = 1; // Monday
    const currentDay = currentDate.getDay();

    const startOfWeek = new Date(currentDate);
    const diff = (currentDay === 0 ? 6 : currentDay - startOfWeekDay);
    startOfWeek.setDate(currentDate.getDate() - diff);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const startFormatted = formatDate(startOfWeek);
    const endFormatted = formatDate(endOfWeek);

    return `${startFormatted} to ${endFormatted}`;
  }

  // Function to get the next week's range
  function getNextWeekRange(date = new Date()) {
    const currentDate = new Date(date);

    const startOfWeekDay = 1; // Monday
    const currentDay = currentDate.getDay();

    const startOfNextWeek = new Date(currentDate);
    const diff = (currentDay === 0 ? 6 : currentDay - startOfWeekDay); 
    startOfNextWeek.setDate(currentDate.getDate() - diff + 7);

    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const startFormatted = formatDate(startOfNextWeek);
    const endFormatted = formatDate(endOfNextWeek);

    return `${startFormatted} to ${endFormatted}`;
  }

  const handleCancelShift = async (selectedShift, weekDate) => {
    try {
      const availablePersonnel = await checkAvailablePersonnel(personnelName, selectedShift);

      if (availablePersonnel.length === 0) {
        Alert.alert(
          'No Available Personnel',
          'You cannot cancel the shift as there is no available personnel for reassignment. Please contact the company.'
        );
        return;
      }
      console.log(availablePersonnel);
      Alert.alert(
        'Confirm Cancellation',
        `Are you sure you want to cancel your shift on ${selectedShift ? selectedShift.day : ''} (${selectedShift ? selectedShift.date : ''}) at ${selectedShift ? selectedShift.clubName : ''}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Cancel Shift',
            onPress: async () => {
              try {
                await cancelShift(personnelName, weekDate, selectedShift.day);
                await reassignShiftToPersonnel(availablePersonnel[0], selectedShift.clubName, weekDate, selectedShift.day, selectedShift.startTime);
                Alert.alert('Shift Cancelled', 'Your shift has been cancelled and reassigned.');

                // Send push notification
                const message = {
                  to: expoPushToken,
                  sound: 'default',
                  title: 'Shift Cancelled',
                  body: `Your shift on ${selectedShift.date} at ${selectedShift.clubName} has been cancelled.`,
                  data: { shift: selectedShift },
                };
                await NotificationService.sendPushNotification(expoPushToken, message);
              } catch (error) {
                console.error("Error cancelling/ reassigning shift:", error);
                Alert.alert('Error', 'There was an issue canceling or reassigning the shift.');
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error checking available personnel:', error);
      Alert.alert('Error', 'There was an issue checking available personnel.');
    }
  };

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{personnelName} - Shifts</Text>
          <Text style={styles.noticeText}>(You can't cancel a shift on the day or if it passed)</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.weekContainer}>
            <Text style={styles.weekHeading}>This Week Shifts</Text>
            <Text style={styles.dateRange}>{thisWeekDates}</Text>
            {thisWeekShifts.map((shift, index) => (
              <View key={index} style={styles.shiftBox}>
                <View style={styles.shiftDetails}>
                  <Text>
                    <Text style={styles.labelText}>Day: </Text>
                    <Text style={styles.normalText}>{shift.day}/{shift.date}</Text>
                  </Text>
                  <View style={{ height: 10 }} />
                  <Text>
                    <Text style={styles.labelText}>Club: </Text>
                    <Text style={styles.normalText}>{shift.clubName}</Text>
                  </Text>
                  <Text>
                    <Text style={styles.labelText}>Start Time: </Text>
                    <Text style={styles.normalText}>
                      {shift.startTime}
                    </Text>
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.cancelButton, hasDatePassed(shift.date) && styles.assignedButton]}
                    onPress={() => handleCancelShift(shift, thisWeekDates)}
                    disabled={hasDatePassed(shift.date)}>
                    <Text style={[styles.buttonText, hasDatePassed(shift.date) && styles.assignedButtonText]}>
                      {'Cancel Shift'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.weekContainer}>
            <Text style={styles.weekHeading}>Next Week Shifts</Text>
            <Text style={styles.dateRange}>{nextWeekDates}</Text>
            {nextWeekShifts.map((shift, index) => (
              <View key={index} style={styles.shiftBox}>
                <View style={styles.shiftDetails}>
                  <Text>
                    <Text style={styles.labelText}>Day: </Text>
                    <Text style={styles.normalText}>{shift.day}/{shift.date}</Text>
                  </Text>
                  <View style={{ height: 10 }} />
                  <Text>
                    <Text style={styles.labelText}>Club: </Text>
                    <Text style={styles.normalText}>{shift.clubName}</Text>
                  </Text>
                  <Text>
                    <Text style={styles.labelText}>Start Time: </Text>
                    <Text style={styles.normalText}>
                      {shift.startTime}
                    </Text>
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.cancelButton, hasDatePassed(shift.date) && styles.assignedButton]}
                    onPress={() => handleCancelShift(shift, nextWeekDates)}
                    disabled={hasDatePassed(shift.date)}>
                    <Text style={[styles.buttonText, hasDatePassed(shift.date) && styles.assignedButtonText]}>
                      {'Cancel Shift'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  header: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  weekHeading: { fontSize: 20, fontWeight: 'bold', color: '#E21A1A', marginBottom: 5 },
  dateRange: { fontSize: 16, color: '#555', marginBottom: 15 },

  scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  container: {
    padding: 20,
  },
  noticeText: {
    fontSize: 16,
    color: '#000',
  },
  shiftBox: {
    padding: 15,
    backgroundColor: '#f7f7f7',
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  weekContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  shiftDetails: {
    flex: 1,
    marginRight: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#E21A1A',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 100,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#E21A1A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  assignedButtonText: {
    color: '#D3D3D3',
  },
  assignedButton: {
    backgroundColor: '#A9A9A9',
  },
});

export default SecurityHome;