import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons'; // For icons
import { useLocalSearchParams } from 'expo-router';

const Settings = () => {

    // State for toggling switches
    const { adminName } = useLocalSearchParams();
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false); // Notifications switch state
    const toggleNotifications = () => setIsNotificationsEnabled((prev) => !prev); // Toggle notifications state

    return (
        <SafeAreaView edges={[]}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.profileContainer}>
                    <FontAwesome name="user" size={80} color="black" />
                    <Text style={styles.userName}>{adminName}</Text>
                </View>

                <View style={styles.settingsItem}>
                    <FontAwesome name="bell" size={24} color="black" />
                    <Text style={styles.settingsText}>Notifications</Text>
                    <View style={styles.switchContainer}>
                        <Switch
                            trackColor={{ false: "#D3D3D3", true: "#D3D3D3" }}
                            thumbColor={isNotificationsEnabled ? "#E21A1A" : "#f4f3f4"}
                            onValueChange={toggleNotifications} // Toggle handler for Notifications
                            value={isNotificationsEnabled} // Bind value to state
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.settingsItem}>
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
