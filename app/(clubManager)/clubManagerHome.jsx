import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import { router } from 'expo-router';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';


const { width, height } = Dimensions.get('window')

// Dummy data
const clubs = [
    { name: 'Omnia', logo: (images.omnia) },
    { name: 'Jail Night Club', logo: (images.jail) },
    { name: 'Oasis Disco Bar', logo: (images.oasis) },
    { name: 'Neon Night Club', logo: (images.neon) },
  ];

const home = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className='h-full w-full'>
                {/* List of clubs header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>List of Clubs</Text>
                </View>
                <ScrollView contentContainerStyle={{ height: '100%' }}>

                    {/* Scrollable List of Clubs */}
                    <View style={styles.clubList}>
                        {clubs.map((club, index) => (
                            <View key={index} style={styles.clubItem}>
                                <Image
                                    source={club.logo} 
                                    style={styles.clubLogo} 
                                />
                                <Text style={styles.clubName}>{club.name}</Text>
                                <View style={styles.buttonsContainer}>
                                    <CustomButton
                                        handlePress={() => { router.push('/assignSecurityPersonnel') }}
                                        title="Assign Personnel"
                                        style={styles.assignButton} />

                                    <CustomButton
                                        handlePress={() => { router.push('/clubManagerPayments') }}
                                        title="Payments"
                                        style={styles.assignButton} />
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
        borderRadius: 10,
      },

    clubName: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
    },

    assignButton: {
        backgroundColor: '#E21A1A',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },

    paymentButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 5,
        paddingHorizontal: 8,
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