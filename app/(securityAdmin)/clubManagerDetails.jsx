// Updated version of clubManagerProfile.jsx

import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { images } from '../../constants';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Updated import to include useLocalSearchParams

const { width } = Dimensions.get('window');

const clubManagerProfile = () => { // Removed route prop
    const router = useRouter();
    const { managerName } = useLocalSearchParams(); // Updated to use useLocalSearchParams to get managerName
    
    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} style={styles.backgroundImage}>
                <View style={styles.header}>
                    {/* Updated headerText to display the specific manager's name */}
                    <Text style={styles.headerText}>{managerName}</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    {/* Club Details */}
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailTitle}>Club Managed:</Text>
                        <Text style={styles.detailText}>Jail</Text>

                        <Text style={styles.detailTitle}>Contact Details:</Text>
                        <Text style={styles.detailText}>011 567 0987</Text>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonsContainer}>

                        <CustomButton
                            title="View Club"
                            handlePress={() => router.push('/clubDetails')}
                            customStyle={[styles.button, styles.clubViewButton]} 
                            textStyle={styles.buttonText}
                        />

                        <CustomButton
                            title="Back"
                            handlePress={() => router.push('/securityAdminHome')}
                            customStyle={[styles.button, styles.clubViewButton]} 
                            textStyle={styles.buttonText}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        padding: 20,
        flexGrow: 1,
        justifyContent: 'center',
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

    clubLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    clubName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E21A1A',
    },
    detailsContainer: {
        marginBottom: 20,
    },
    detailTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    detailText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonsContainer: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#E21A1A',
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    clubViewButton: {
        backgroundColor: '#FF0000',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default clubManagerProfile;
