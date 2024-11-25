import React from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, Text, Platform, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
import { icons, images } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomHeader = ({ username, userPhoto, settingsNav }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#E0E0E0', borderBottomWidth: 1, borderBottomColor: '#d3d3d3' }}>
                <TouchableOpacity >
                    <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'white', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#a9a9a9' }}>
                        {userPhoto ? (
                            <Image
                                source={userPhoto}
                                resizeMode="cover"
                                style={{ width: '100%', height: '100%' }}
                            />
                        ) : (
                            <Image
                                source={images.jail}
                                resizeMode="contain"
                                style={{ width: 24, height: 24 }}
                                tintColor={'#E21A1A'}
                            />
                        )}
                    </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{username}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate(settingsNav)}>
                        <Image
                            source={icons.settings}
                            resizeMode="contain"
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CustomHeader;