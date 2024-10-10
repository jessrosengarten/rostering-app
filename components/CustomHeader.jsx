import React from 'react'
import { View, Image, TouchableOpacity, SafeAreaView, Text } from 'react-native'
import { useNavigation } from 'expo-router'
import { icons, images } from '../constants'

const CustomHeader = ({ username, userPhoto, photoNav, notificationNav, settingsNav }) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View className="flex flex-row items-center justify-between px-5 py-3 bg-[#E0E0E0] border-b border-[#d3d3d3]">
                <TouchableOpacity onPress={() => navigation.navigate(photoNav)}>
                    <View className="w-9 h-9 rounded-full bg-white overflow-hidden justify-center items-center" style={{ borderWidth: 2, borderColor: '#a9a9a9' }}>
                        {userPhoto ? (
                            <Image
                                source={userPhoto} //source={{ uri: icons.profile }}
                                resizeMode="cover"
                                className="h-full w-full"
                            />
                        ) : (
                            <Image
                                source={images.jail}
                                resizeMode="contain"
                                className="h-6 w-6"
                                tintColor={'#E21A1A'}
                            />
                        )}
                    </View>
                </TouchableOpacity>
                <Text className="text-lg font-bold">{username}</Text>
                <View className="flex flex-row items-center">
                    <TouchableOpacity onPress={() => navigation.navigate(notificationNav)}>
                        <Image
                            source={icons.notification}
                            resizeMode="contain"
                            className="w-6 h-6 mr-5"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(settingsNav)}>
                        <Image
                            source={icons.settings}
                            resizeMode="contain"
                            className="w-6 h-6"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CustomHeader;