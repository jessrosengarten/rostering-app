import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';

const { width, height } = Dimensions.get('window');

// Dummy data
const shifts = [
    { day: 'Thursday', club: 'Club A', time: '9:00 PM - 2:00 AM' },
    { day: 'Friday', club: 'Club B', time: '10:00 PM - 3:00 AM' },
    { day: 'Saturday', club: 'Club C', time: '8:00 PM - 1:00 AM' },
    { day: 'Sunday', club: 'Club D', time: '9:00 PM - 12:00 AM' },
];

const SecurityHome = () => {
    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className='h-full w-full'>
                <ScrollView contentContainerStyle={{ height: '100%' }}>
                    <View className="flex-1 items-center justify-center">
                        <Text>Welcome, Security Personnel! I LIIIIKKKEEEe</Text>
                        {/* Loop through the shifts to display a box for each night */}
                        <View style={styles.container}>
                        {shifts.map((shift, index) => (
                            <View key={index} style={styles.shiftBox}>
                                <View style={styles.shiftDetails}>
                                    <Text style={styles.dayText}>{shift.day}</Text>
                                    <Text style={styles.clubText}>Club: {shift.club}</Text>
                                    <Text style={styles.timeText}>Shift Time: {shift.time}</Text>

                                    {/* ADDED THIS */}
                                    <CustomButton
                                    title="Cancel"/>
                                </View>
                            </View>
                        ))}
                    </View> 
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default SecurityHome;

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 20,
        width: '100%',
    },
    shiftBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shiftDetails: {
        flex: 1,
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    clubText: {
        fontSize: 16,
    },
    timeText: {
        fontSize: 14,
        color: 'gray',
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    cancelText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

