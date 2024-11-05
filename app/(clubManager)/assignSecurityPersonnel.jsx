import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

const AssignSecurityPersonnel = () => {
    const [isClubOpen, setIsClubOpen] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
    });

    const toggleSwitch = (day) => {
        setIsClubOpen(prevState => ({
            ...prevState,
            [day]: !prevState[day]
        }));
    };

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} style={styles.background}>
                {/* Semi-transparent header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Personnel Needed</Text>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20 }}>
                  <View style={styles.daysContainer}> 
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                        <View key={index} style={styles.dayContainer}>
                            <Text style={styles.dayText}>{day}</Text>
                            <View style={styles.switchContainer}>
                                <Switch
                                    value={isClubOpen[day]}
                                    onValueChange={() => toggleSwitch(day)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="No. of Personnel"
                                    editable={isClubOpen[day]} // Only editable if the switch is on
                                />
                            </View>
                        </View>
                    ))}

                    {/* Assign Button */}
                    <TouchableOpacity style={styles.assignButton}>
                        <Text style={styles.assignButtonText}>Assign</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    daysContainer: {
        padding: 20, 
        backgroundColor: 'rgba(255, 255, 255, 255)', 
        borderRadius: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android shadow
        marginBottom: 20, 
    },
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

    clubName: {
        textAlign: 'center',
        fontSize: 22,
        color: '#E21A1A',
        marginVertical: 20,
    },
    dayContainer: {
        flexDirection: 'row', // Keep elements in a row
        alignItems: 'center', // Align items vertically centered
        marginBottom: 20, // Add space between days
    },
    dayText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        width: 105, // Fixed width for alignment
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 80, // Fixed width for alignment
    },
    label: {
        marginRight: 10,
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Fixed width for alignment
    },
    input: {
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
        width: 150,
        textAlign: 'center',
        borderRadius: 5,
    },
    
    assignButton: {
        backgroundColor: '#E21A1A',
        padding: 15,
        margin: 20,
        alignItems: 'center',
        borderRadius: 5,
    },
    assignButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default AssignSecurityPersonnel;
