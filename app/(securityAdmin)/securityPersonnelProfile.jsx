import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { images } from '../../constants';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';


const { width } = Dimensions.get('window');

const securityPersonnelProfile = () => {

    const route = useRoute();
    const navigation = useNavigation(); 
    const { securityPersonnel } = route.params; 
    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className='h-full w-full'>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{securityPersonnel.name}</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    {/* Personnel Info */}
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailTitle}>Rate per Shift:</Text>
                        <Text style={styles.detailText}>{securityPersonnel.rate}</Text>

                        <Text style={styles.detailTitle}>Address:</Text>
                        <Text style={styles.detailText}>{securityPersonnel.address}</Text>


                        <Text style={styles.detailTitle}>Contact Details:</Text>
                        <Text style={styles.detailText}>{securityPersonnel.contact}</Text>

                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('securityPersonnelDocuments')}
                        >
                            <Text style={styles.buttonText}>View Documents</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('securityPersonnelPayments')}
                        >
                            <Text style={styles.buttonText}>Finances</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('securityAdminHome')}
                        >
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        flexGrow: 1,
        justifyContent: 'center',
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 50,
      },
      button: {
        width: (width / 2) - 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E21A1A',
        borderRadius: 5,
        marginBottom: 20,
      },
      buttonText: {
        fontSize: 16,
        color: '#fff',
      },
});

export default securityPersonnelProfile;
