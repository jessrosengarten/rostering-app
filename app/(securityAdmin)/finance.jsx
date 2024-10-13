import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import React from 'react'


const Finance = () => {
  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView contentContainerStyle={{ height: '100%' }}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Finance</Text>
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
      paddingHorizontal:  8,
      borderRadius: 5,
      alignItems: 'center',
  },
  buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 10,
  },
  
});

export default Finance
