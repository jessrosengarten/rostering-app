import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import React from 'react'
import { useRoute } from '@react-navigation/native'


const Payments = () => {

    const route = useRoute();
    const { club , paymentData} = route.params; // Get the club data from Club Details page
    
  return (
    <SafeAreaView edges={[]}>
        <ImageBackground source={images.background} className='h-full w-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                {/* Semi-transparent Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Payments: {club.name}</Text>
                </View>

                {/* Payments List */}
                <View style={styles.paymentDetails}>
                    <Text style={styles.sectionTitle}>Total Income:</Text>
                        {Object.keys(paymentData.payments).map((day, index) => (
                            <View key={index} style={styles.paymentRow}>
                                <Text style={styles.dayText}>{day}:</Text>
                                <View style={styles.amountContainer}>
                                    <Text style={styles.amountText}>R {paymentData.payments[day].toFixed(2)}</Text>
                                </View>
                            </View>
                        ))}

                    {/* Total Row */}
                    <View style={styles.paymentRow}>
                            <Text style={[styles.dayText, { fontWeight: 'bold' }]}>Total for the Week:</Text>
                        <View style={styles.amountContainer}>
                            <Text style={[styles.amountText, { fontWeight: 'bold', color: 'red' }]}>
                                R {paymentData.total.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    paymentDetails: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      marginTop: 40,
      marginHorizontal: 20,
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
        alignItems: 'center',
        paddingVertical: 5,
        paddingLeft: 10,
    },
    dayText: {
      fontSize: 16,
      color: '#333',
      flex: 1,
    },
    amountContainer: {
        width: 120,
        alignItems: 'flex-start',
    },
    amountText: {
      fontSize: 16,
      color: '#333',
    },
  });

export default Payments
