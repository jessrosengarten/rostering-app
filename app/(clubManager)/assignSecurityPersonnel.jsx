import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { addPersonnelNeeded } from '../../Backend/clubManager';
import { router, useLocalSearchParams } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const AssignSecurityPersonnel = () => {
    const { club } = useLocalSearchParams();

    // fucntion to get the next weeks range
    function getNextWeekRange(date = new Date()) {
    const currentDate = new Date(date);

    const startOfWeekDay = 1; // Monday
    const currentDay = currentDate.getDay();

    const startOfNextWeek = new Date(currentDate);
    startOfNextWeek.setDate(currentDate.getDate() - (currentDay - startOfWeekDay) + 7);

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
    const weekDates = getNextWeekRange();

    const [isClubOpen, setIsClubOpen] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    });

    const [personnelCount, setPersonnelCount] = useState({
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Saturday: '',
        Sunday: ''
    });

    const [assignedDays, setAssignedDays] = useState({
        Monday: false,
        Tuesday: false, 
        Wednesday: false,
        Thursday: false,
        Friday: false,  
        Saturday: false,
        Sunday: false,
    });

    const toggleSwitch = (day) => {
        setIsClubOpen((prevState) => ({
            ...prevState,
            [day]: !prevState[day]
        }));
    };

    const handlePersonnelChange = (day, value) => {
        setPersonnelCount((prevState) => ({
            ...prevState,
            [day]: value
        }));
    };

    const handleAssign = async () => {
        try {
            for (const day of Object.keys(isClubOpen)) {
                if (isClubOpen[day] && personnelCount[day]) {
                    await addPersonnelNeeded(club.name, weekDates, day, parseInt(personnelCount[day]));
                }
            }

            alert("Personnel requirements assigned successfully!");

            // clearing fields:
            setIsClubOpen({
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false,
        });

        setPersonnelCount({
            Monday: '',
            Tuesday: '',
            Wednesday: '',
            Thursday: '',
            Friday: '',
            Saturday: '',
            Sunday: ''
        });

        setAssignedDays({
            Monday: false,
            Tuesday: false, 
            Wednesday: false,
            Thursday: false,
            Friday: false,  
            Saturday: false,
            Sunday: false,
        });
        } catch (error) {
            console.error("Error assigning personnel:", error);
            alert("Failed to assign personnel requirements.");
        }
    };

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Personnel Needed</Text>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20 }}>
                    <View style={styles.daysContainer}>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                            <View key={index} style={[
                                styles.dayContainer, 
                                assignedDays[day] && styles.disabledDayContainer
                            ]}>
                                <View style={styles.dayLabelContainer}>
                                    <Text style={styles.dayText}>{day}</Text>
                                    <Text style={styles.dateText}>{weekDates[index]}</Text>
                                </View>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#767577" }}
                                    thumbColor={isClubOpen[day] ? "#E21A1A" : "#f4f3f4"}
                                    value={isClubOpen[day]}
                                    onValueChange={() => toggleSwitch(day)}
                                    style={styles.switch}
                                    disabled={assignedDays[day]}
                                />
                                <TextInput
                                    style={[styles.input, assignedDays[day] && styles.disabledInput]}
                                    placeholder="No. of Personnel"
                                    editable={isClubOpen[day] && !assignedDays[day]}
                                    keyboardType="numeric"
                                    value={personnelCount[day]}
                                    onChangeText={(value) => handlePersonnelChange(day, value)}
                                />
                            </View>
                        ))}

                        <TouchableOpacity style={styles.assignButton} onPress={handleAssign}>
                            <Text style={styles.assignButtonText}>Assign</Text>
                        </TouchableOpacity>
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
    daysContainer: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 255)',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: screenWidth < 350 ? 5 : 5,
    },
    dayLabelContainer: {
        width: screenWidth < 350 ? 70 : 90,
        alignItems: 'center',
    },
    dayText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 14,
        color: '#666',
    },
    switch: {
        marginHorizontal: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: screenWidth < 350 ? 8 : 10,
        fontSize: screenWidth < 350 ? 14 : 16,
    },
    disabledDayContainer: {
        backgroundColor: '#f0f0f0',
        opacity: 0.6,
        borderRadius: 5,
        padding: 10,
    },
    disabledInput: {
        backgroundColor: '#e0e0e0',
        color: '#888',
    },
    assignButton: {
        backgroundColor: '#E21A1A',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    assignButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default AssignSecurityPersonnel;
