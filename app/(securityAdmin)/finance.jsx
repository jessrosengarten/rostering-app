import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import { useRoute } from '@react-navigation/native';


const Finance = () => {
  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView contentContainerStyle={{ height: '100%' }}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Finance Management</Text>
          </View>

           {/* Summary of All Clubs */}
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Total Payments Summary</Text>
            <Text style={styles.summaryTextTitle}>Total Amount to be Paid:</Text>
            <Text style={styles.summaryTextData}>600</Text>
          </View>

          <View style={styles.buttonsContainer}>
                        <CustomButton
                            title="View Data Analytics"
                            //handlePress={() => navigation.navigate('dataAnalytics')}
                            customStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                        <CustomButton
                            title="Bacl"
                            //handlePress={() => navigation.navigate('securityAdminHome')}
                            customStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
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
  
  summary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryTextTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },

    summaryTextData: {
    marginTop: 10,
    fontSize: 16,
  },
    personName: {
    marginTop: 5,
    fontSize: 14,
  },
  paymentItem: {
    marginHorizontal: 15,
    marginBottom: 5,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
   section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
  clubList: {
    paddingHorizontal: 10,
  },
  personnelList: {
    paddingHorizontal: 10,
  },
  personnelItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },

});

export default Finance
