import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { images } from '../../constants';
// import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const securityPersonnelProfile = () => {
    //const navigation = useNavigation();
    const router = useRouter();
    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className='h-full w-full'>
                {/* Profile Name */}
                <View style={styles.profileHeader}>
                    <Text style={styles.clubName}>Softpaws</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailTitle}>Address:</Text>
                        <Text style={styles.detailText}>Sandton</Text>


                        <Text style={styles.detailTitle}>Contact Details:</Text>
                        <Text style={styles.detailText}>011 567 0987</Text>

                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonsContainer}>
                        <CustomButton
                            title="View Documents"
                            handlePress={() => { }}
                            customStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                        <CustomButton
                            title="Finance Details"
                            handlePress={() => { }}
                            customStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                        <CustomButton
                            title="Edit Details"
                            handlePress={() => { }}
                            customStyle={[styles.button, styles.deleteButton]}
                            textStyle={styles.buttonText}
                        />
                        <CustomButton
                            title="Delete"
                            handlePress={() => { }}
                            customStyle={[styles.button, styles.button]}
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
    profileHeader: {
        width: '100%',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignItems: 'left',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
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
    deleteButton: {
        backgroundColor: '#FF0000',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default securityPersonnelProfile;
