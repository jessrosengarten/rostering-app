import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useRoute } from '@react-navigation/native';
import { addPersonnelNeeded } from '../../Backend/clubManager';

const AssignSecurityPersonnel = () => {
    const route = useRoute();
    const { club } = route.params;

    // Function to get the date range for the next week
      function getWeekRange(date = new Date()) {
        const currentDate = new Date(date);
    
        const startOfWeekDay = 1; // Monday
        const currentDay = currentDate.getDay();
    
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - (currentDay - startOfWeekDay));
    
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

    const weekDates = getWeekRange();

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
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
    },
    dayLabelContainer: {
        width: 90,
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
        marginTop: 20,
    },
    assignButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default AssignSecurityPersonnel;
