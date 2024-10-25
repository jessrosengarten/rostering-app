import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { db } from '../../Backend/firebaseConfig';
import { ref, onValue } from 'firebase/database';

const { width, height } = Dimensions.get('window');

// // Dummy data
// const shifts = [
//     { day: 'Thursday', club: 'Club A', time: '9:00 PM - 2:00 AM' },
//     { day: 'Friday', club: 'Club B', time: '10:00 PM - 3:00 AM' },
//     { day: 'Saturday', club: 'Club C', time: '8:00 PM - 1:00 AM' },
//     { day: 'Sunday', club: 'Club D', time: '9:00 PM - 12:00 AM' },
// ];

const SecurityHome = () => {
    const [shifts, setShifts] = useState([]);
    const personnel = "Rudolf Stassen"; 

    useEffect(() => {
        const shiftsRef = ref(db, 'Shifts');
        onValue(shiftsRef, (snapshot) => {
            const data = snapshot.val();
            console.log('Fetched data:', data); 

            
            const personnelShifts = [];
            for (const week in data) {
                if (data[week].personnel === personnel) {
                    personnelShifts.push(data[week]);
                }
            }
            // Sort the shifts by date
            personnelShifts.sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateA - dateB;
            });

            console.log('Filtered shifts:', personnelShifts);
            setShifts(personnelShifts);
        });
    }, []);

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString.split('/').reverse().join('-'));
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>i liiike</Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        {/* Loop through the shifts to display a box for each night */}
                        {shifts.map((shift, index) => (
                            <View key={index} style={styles.shiftBox}>
                                <View style={styles.shiftDetails}>
                                    <Text>
                                        <Text style={styles.labelText}>Day: </Text>
                                        <Text style={styles.normalText}>{getDayOfWeek(shift.date)}</Text>
                                    </Text>
                                    <View style={{ height: 10 }} />
                                    <Text>
                                        <Text style={styles.labelText}>Club: </Text>
                                        <Text style={styles.normalText}>{shift.club}</Text>
                                    </Text>
                                    <Text>
                                        <Text style={styles.labelText}>Shift Time: </Text>
                                        <Text style={styles.normalText}>
                                            {shift.startTime} - {shift.endTime}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => console.log('Cancel pressed')}>
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
        backgroundColor: 'rgba(255, 255, 255, 1)',
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
});

export default SecurityHome;
