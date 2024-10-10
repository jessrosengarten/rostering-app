import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';


const AddUsers = () => {
    // State for user input
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [userType, setUserType] = useState('');

    const navigation = useNavigation();

    // Handle the continue button press
    const handleContinue = () => {
        if (userType === 'clubManagerUser') {
            navigation.navigate('addClubManager');
        } else {
            navigation.navigate('addSecurityPersonnel');
        }
    };

    return (
        <SafeAreaView edges={[]}>
            {/* Background Image */}
            <ImageBackground source={images.background} style={styles.background}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {/* Transparent Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Add User</Text>
                    </View>

                    {/* Input Fields */}
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor="#000"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Surname"
                            value={surname}
                            onChangeText={setSurname}
                            placeholderTextColor="#000"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="#000"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cellphone Number"
                            value={cellphone}
                            onChangeText={setCellphone}
                            placeholderTextColor="#000"
                        />

                        {/* Dropdown for User Type */}
                        <RNPickerSelect
                            onValueChange={(value) => setUserType(value)}
                            items={[
                                { label: 'Club Manager User', value: 'clubManagerUser' },
                                { label: 'Security Personnel User', value: 'securityPersonnelUser' },
                            ]}
                            style={{
                                // CHECK THIS OUT
                                inputAndroid: styles.pickerInput,
                                inputIOS: styles.pickerInput,
                                placeholder: { color: '#000' },
                            }}
                            placeholder={{
                                label: 'Select User Type',
                                value: null,
                                color: '#000',
                            }}
                        />

                        <CustomButton
                            title="Continue"
                            handlePress={handleContinue}
                            style={styles.button}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default AddUsers;

const styles = StyleSheet.create({
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
    formContainer: {
        padding: 20,
        justifyContent: 'center',
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
    button: {
        marginTop: 20,
    },
});
