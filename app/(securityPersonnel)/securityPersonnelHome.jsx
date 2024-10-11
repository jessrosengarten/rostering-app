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
                                <CustomButton
                                    title="Cancel"
                                    style={styles.cancelButton}
                                />
                            </View>
                        ))}
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
    container: {
        padding: 20,
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
    shiftBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
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
        padding: 8,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginLeft: 10,
        fontSize: 10,
    },

});
