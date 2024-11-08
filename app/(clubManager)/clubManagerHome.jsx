import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Dummy data
const clubs = [
    { name: 'Omnia', logo: images.omnia },
    { name: 'Jail Night Club', logo: images.jail },
    { name: 'Oasis Disco Bar', logo: images.oasis },
    { name: 'Neon Night Club', logo: images.neon },
];

const Home = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} style={styles.background}>
                {/* List of clubs header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>List of Clubs</Text>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
                    {/* Scrollable List of Clubs */}
                    <View style={styles.clubList}>
                        {clubs.map((club, index) => (
                            <View key={index} style={styles.clubItem}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('clubDetails', { club })} 
                                    style={styles.clubInfo}
                                >
                                    <Image source={club.logo} style={styles.clubLogo} />
                                    <Text style={styles.clubName}>{club.name}</Text>
                                </TouchableOpacity>

                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        onPress={() => router.push('/assignSecurityPersonnel')}
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonText}>Select number of Personnel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => router.push('/clubManagerPayments')}
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonText}>Payments</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => router.push('/schedule')}
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonText}>Schedule</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        ))}
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
    clubLogo: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    clubName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    clubList: {
        alignItems: 'center',
    },
    clubItem: {
        width: '85%',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    clubInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#E21A1A',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default Home;
