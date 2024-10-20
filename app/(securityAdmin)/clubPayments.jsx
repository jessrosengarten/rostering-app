import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import React from 'react'


const Payments = () => {

    //Dummy data
    const paymentData = {
        clubName: 'Neon Night Club',
        payments: {
            Thursday: 750.00,
            Friday: 950.00,
            Saturday: 500.00,
            Sunday: 1250.00,
        },
        total: 3450.00
    };

    
  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>

        {/* Semi-transparent Header */}
      <View style={styles.header}>
            <Text style={styles.headerText}>Club Payments: </Text>
        </View> 

        <ScrollView contentContainerStyle={{ height: '100%' }}>
            {/* Club Name */}
            <View style={styles.clubInfo}>
                    <Text style={styles.clubName}>{paymentData.clubName}</Text>
            </View>

            {/* Payments List */}
            <View style={styles.paymentDetails}>
                <Text style={styles.sectionTitle}>Total Income</Text>
                    {Object.keys(paymentData.payments).map((day, index) => (
                        <View key={index} style={styles.paymentRow}>
                            <Text style={styles.dayText}>{day}:</Text>
                            <Text style={styles.amountText}>R {paymentData.payments[day].toFixed(2)}</Text>
                        </View>
                            ))}

            {/* Total */}
            <View style={styles.paymentRow}>
                <Text style={[styles.dayText, { fontWeight: 'bold' }]}>Total for the Week:</Text>
                <Text style={[styles.amountText, { fontWeight: 'bold', color: 'red' }]}>
                    R {paymentData.total.toFixed(2)}
                </Text>
                </View>
            </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    scrollContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clubInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    clubName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    clubLogo: {
        width: 100,
        height: 100,
        borderRadius: 10,
      },
    paymentDetails: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    dayText: {
        fontSize: 16,
        color: '#333',
    },
    amountText: {
        fontSize: 16,
        color: '#333',
    },
    paymentButton: {
        backgroundColor: '#E21A1A',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 20,
    },
    paymentButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Payments
