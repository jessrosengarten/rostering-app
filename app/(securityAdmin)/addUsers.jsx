import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

const AddUsers = () => {
    // State for user input
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [userType, setUserType] = useState('');

    const navigation = useNavigation();



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add User</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Surname"
                value={surname}
                onChangeText={setSurname}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Cellphone Number"
                value={cellphone}
                onChangeText={setCellphone}
            />
            {/* Dropdown for User Type */}
            <RNPickerSelect
                onValueChange={(value) => setUserType(value)}
                items={[
                    { label: 'Club Manager User', value: 'clubManagerUser' },
                    { label: 'Security Admin User', value: 'securityPersonnelUser' }, // Corrected spelling here
                ]}
                style={{ input: styles.pickerInput }} 
                placeholder={{
                    label: 'Select User Type',
                    value: null,
                }}
            />
            {/* Continue Button */}
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddUsers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#FFF',
        color: '#000',
    },
    button: {
        backgroundColor: '#E21A1A',
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    pickerInput: { 
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#FFF',
        color: '#000',
    },
});
