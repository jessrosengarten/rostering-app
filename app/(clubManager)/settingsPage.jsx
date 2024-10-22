import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons'; // For icons
import { useNavigation } from '@react-navigation/native';
const Settings = () => {
    const navigation = useNavigation(); // For navigating

    // State for toggling switches

     const [languageVisible, setLanguageVisible] = useState(false); // State for dropdown visibility
    const [selectedLanguage, setSelectedLanguage] = useState('English'); // State for selected language

    const toggleLanguageDropdown = () => {
        setLanguageVisible(!languageVisible); // Toggle dropdown visibility
    };

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language); // Update selected language
        setLanguageVisible(!languageVisible); // Hide dropdown
    };
    return (
        <SafeAreaView edges={[]}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.profileContainer}>
                    <FontAwesome name="user" size={80} color="black" />
                    <Text style={styles.userName}>Softpaws</Text>
                </View>

                {/* Settings Options */}
                <View style={styles.settingsItem}>
                    <FontAwesome name="user" size={24} color="black" />
                    <Text style={styles.settingsText}>Profile</Text>
                </View>

                <View style={styles.settingsItem}>
                    <FontAwesome name="moon-o" size={24} color="black" />
                    <Text style={styles.settingsText}>Select Light/Dark Mode</Text>
                    <View style={styles.switchContainer}>
                        <Switch

                        />
                    </View>
                </View>

                 <TouchableOpacity style={styles.settingsItem} onPress={toggleLanguageDropdown}>
                    <FontAwesome name="language" size={24} color="black" />
                    <Text style={styles.settingsText}>Language Preferences</Text>
                    <FontAwesome name="caret-down" size={24} color="black" />
                </TouchableOpacity>

                {languageVisible && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleLanguageSelect('English')}>
                            <Text style={styles.dropdownText}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleLanguageSelect('Afrikaans')}>
                            <Text style={styles.dropdownText}>Afrikaans</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.settingsItem}>
                    <FontAwesome name="bell" size={24} color="black" />
                    <Text style={styles.settingsText}>Notifications</Text>
                    <View style={styles.switchContainer}>
                        <Switch
                        
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.settingsItem} 
                onPress={() => navigation.navigate('changePassword')}>
                    <FontAwesome name="lock" size={24} color="black" />
                    <Text style={styles.settingsText}>Change Password</Text>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    scrollViewContent: {
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    userName: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    settingsText: {
        marginLeft: 15,
        fontSize: 16,
        flex: 1, 
    },
    switchContainer: {
        justifyContent: 'flex-end',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 10,
    },
    dropdownItem: {
        padding: 10,
    },
    dropdownText: {
        fontSize: 16,
        color: '#000',
    },
    logoutButton: {
        backgroundColor: '#E21A1A',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 40,
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
