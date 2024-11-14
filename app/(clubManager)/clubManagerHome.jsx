import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { TouchableOpacity } from 'react-native';
import { fetchClubsByManager } from '../../Backend/clubManager'

const { width, height } = Dimensions.get('window');

const clubManagerHome = () => {
    const [clubs, setClubs] = useState([]);
    const { managerName } = useLocalSearchParams();

    useEffect(() => {
        const loadClubs = async () => {
            try {
                const fetchedClubs = await fetchClubsByManager(managerName);
                setClubs(Object.keys(fetchedClubs).map(clubName => ({
                    name: clubName,
                    ...fetchedClubs[clubName],
                    logo: images.neon // we have to change...
                })));
            } catch (error) {
                console.error("Error fetching clubs:", error);
            }
        };
        loadClubs();
    }, [managerName]);

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} style={styles.background}>
                {/* List of clubs header */}
                <View style={styles.header}>
                    <Text>Welcome, Manager: {managerName}</Text>
                    <Text style={styles.headerText}>List of Clubs</Text>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
                    {/* Scrollable List of Clubs */}
                    <View style={styles.clubList}>
                        {clubs.map((club, index) => (
                            <View key={index} style={styles.clubItem}>
                                <TouchableOpacity
                                    onPress={() => router.push(`/clubDetails?club=${encodeURIComponent(JSON.stringify(club))}`)}
                                    style={styles.clubInfo}>
                                    <Image source={club.logo} style={styles.clubLogo} />
                                    <Text style={styles.clubName}>{club.name}</Text>
                                </TouchableOpacity>

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
        width: '48%', // Take half the width of the container
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default clubManagerHome;

