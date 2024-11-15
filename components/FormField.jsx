import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-black font-pmedium">{title}</Text>
            <View className="border-2 border-secondary w-full h-16 px-4 bg-white rounded-2xl focus:border-black items-center flex-row">
                <TextInput
                    className="flex-1 text-black font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    onChangeText={handleChangeText}
                    secureTextEntry={(title === 'Password' || title === 'Re-Enter Password') && !showPassword}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
                {title === 'Re-Enter Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField