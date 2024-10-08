import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import { router } from 'expo-router';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import CustomButton from '../../components/CustomButton';


const { width, height } = Dimensions.get('window')

// ADD PATHS TO LOGOS
// Dummy data
const clubs = [
    { name: 'Omnia', logo: (images.omnia) },
    { name: 'Oasis Disco Bar' },
    { name: 'Jail Night Club' },
    { name: 'Neon Night Club' },
];

const home = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className='h-full w-full'>
                <ScrollView contentContainerStyle={{ height: '100%' }}>
                    
                    {/* Semi-transparent Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>List of Clubs</Text>
                    </View>

                     {/* Scrollable List of Clubs */}
                     <View style={styles.clubList}>   
                        {clubs.map((club, index) => (
                            <View key={index} style={styles.clubItem}>
                                <Text style={styles.clubName}>{club.name}</Text>
                                <View style={styles.buttonsContainer}>
                                    <CustomButton  
                                    handlePress={() => { router.push('/assignSecurityPersonnel') }}
                                    title="Assign Personnel"
                                    style={styles.assignButton}/>

                                    <CustomButton
                                    handlePress={() => {router.push('/clubManagerPayments')}}
                                    title="Payments"
                                    style={styles.assignButton}/>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
    },
    header: {
        width: '100%',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },

    clubName: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },

    assignButton: {
        backgroundColor: '#E21A1A',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },

    paymentButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 5,
        paddingHorizontal:  8,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 10,
    },
    clubList: {
        alignItems: 'left',
    },


    clubItem: {
        width: '90%',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.8)', // background for each club item
        marginVertical: 10,
        borderRadius: 10, 
    }
    
});

export default home