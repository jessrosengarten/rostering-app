import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';


const assignSecurityPersonnel = () => {
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
            <ImageBackground source={images.background} className='h-full w-full'>
                {/* Semi-transparent header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Personnel Needed</Text>
                </View>
                <ScrollView contentContainerStyle={{ height: '100%' }}>
                    {/* Club Name */}
                    <Text style={styles.clubName}>Neon Night Club</Text>

                    {/* Day Elements */}
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
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
                </ScrollView>
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
        fontWeight: 'bold',

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
