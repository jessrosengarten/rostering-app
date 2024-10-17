import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
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
            <ImageBackground source={images.background} style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>i like</Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        {/* Loop through the shifts to display a box for each night */}
                        {shifts.map((shift, index) => (
                            <View key={index} style={styles.shiftBox}>
                                <View style={styles.shiftDetails}>
                                    <Text style={styles.dayText}>{shift.day}</Text>
                                    <Text style={styles.clubText}>Club: {shift.club}</Text>
                                    <Text style={styles.timeText}>Shift Time: {shift.time}</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    {/* Replace CustomButton with TouchableOpacity */}
                                    <TouchableOpacity style={styles.cancelButton} onPress={() => console.log('Cancel pressed')}>
                                        <Text style={styles.buttonText}>Cancel</Text>
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
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    container: {
        padding: 20,
    },
    shiftBox: {
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center', // Center all items horizontally
        flexDirection: 'row', // Align text and button in a row
        justifyContent: 'space-between', // Space between text and button
    },
    shiftDetails: {
        flex: 1, // Allow text to take up available space
        marginRight: 10, // Space between text and button
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
    }
});

export default SecurityHome;
