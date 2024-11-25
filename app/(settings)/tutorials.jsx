import { View, Text, ScrollView, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import { Link, router, useRouter } from 'expo-router';
import { Card } from 'react-native-paper';
import { useNavigation } from 'expo-router';

const Tutorials = () => {

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className='h-full w-full'>
                <ScrollView contentContainerStyle={Styles.scrollViewContent}>
                    
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Tutorials

const Styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        marginTop: 0
    },
});