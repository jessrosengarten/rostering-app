import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'

const { width, height } = Dimensions.get('window')

const home = () => {
    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className='h-full w-full'>
                <ScrollView contentContainerStyle={{ height: '100%' }}>

                    <View className="flex-1 items-center justify-center">
                        <Text>hello</Text>
                    </View>

                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default home