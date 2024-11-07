import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import { router } from 'expo-router';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const ClubManagerUser = () => {
  return (

    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>

        <View style={styles.header}>
          <Text style={styles.headerText}>List of Clubs</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>

  )
}

export default ClubManagerUser

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
})