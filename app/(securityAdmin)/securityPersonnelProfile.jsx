import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { images } from '../../constants';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const securityPersonnelProfile = () => {

    const router = useRouter();
    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className='h-full w-full'>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Softpaws</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailTitle}>Rate per Shift:</Text>
                        <Text style={styles.detailText}>R 500</Text>

                        <Text style={styles.detailTitle}>Address:</Text>
                        <Text style={styles.detailText}>Sandton</Text>


                        <Text style={styles.detailTitle}>Contact Details:</Text>
                        <Text style={styles.detailText}>011 567 0987</Text>

                    </View>

                    <View style={styles.buttonsContainer}>
                        <CustomButton
                            title="View Documents"
                            handlePress={() => router.push('/securityPersonnelUser')}
                            customStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                        <CustomButton
                            title="Finances"
                            handlePress={() => router.push('/securityPersonnelPayments')}
                            customStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                        <CustomButton
                            title="Back"
                            handlePress={() => router.push('/securityAdminHome')}
                            customStyle={styles.button}
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
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default securityPersonnelProfile;
