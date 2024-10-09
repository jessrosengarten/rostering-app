import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';


const assignSecurityPersonnel = () => {
    const [isClubOpen, setIsClubOpen] = useState({
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
        <SafeAreaView style={styles.container}>
            <ImageBackground source={images.background} style={styles.background}>
                {/* Semi-transparent header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Assigning Security Personnel</Text>
                </View>
                {/* Club Name */}
                <Text style={styles.clubName}>Neon Night Club</Text>

                {/* Day Elements */}
                {['Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                    <View key={index} style={styles.dayContainer}>
                        <Text style={styles.dayText}>{day}</Text>
                        <Switch
                            value={isClubOpen[day]}
                            onValueChange={() => toggleSwitch(day)}
                        />
                        <Text style={styles.label}>No of Personnel:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Input No."
                            editable={isClubOpen[day]} // Only editable if the switch is on
                        />
                    </View>
                ))}

                {/* Assign Button */}
                <TouchableOpacity style={styles.assignButton}>
                    <Text style={styles.assignButtonText}>Assign</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        height: '100%',
        width: '100%',
    },
    header: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
        padding: 15,
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    clubName: {
        textAlign: 'center',
        fontSize: 22,
        color: 'red',
        marginVertical: 20,
    },
    dayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
    },
    dayText: {
        fontSize: 18,
        color: 'black',
        fontWeight:  'bold',

    },
    label: {
        marginLeft: 10,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
        width: 100,
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

export default assignSecurityPersonnel;
