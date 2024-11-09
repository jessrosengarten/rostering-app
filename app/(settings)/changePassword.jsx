import { View, Text, ScrollView, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router, useRouter } from 'expo-router';
import { Card } from 'react-native-paper';
import { useNavigation } from 'expo-router';



const ChangePassword = () => {
    const navigation = useNavigation();
    const [form, setform] = useState({
        password: "",
        confirmPassword: "",
    })
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = () => {
        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // Proceed with password change logic
        router.push('/sign-in');
    }
    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className='h-full w-full'>
                <ScrollView contentContainerStyle={Styles.scrollViewContent}>
                    <View style={Styles.topTextContainer}>
                        <Text style={Styles.topText}>Change Password</Text>
                    </View>
                    <View style={Styles.horizontalLine} />
                    <Card style={Styles.card}>
                        <Card.Content>
                            <View>
                                <FormField
                                    title="Password"
                                    value={form.password}
                                    placeholder={"Enter Password"}
                                    handleChangeText={(e) => setform({
                                        ...form,
                                        password: e
                                    })}
                                    otherStyles="mt-5"
                                />
                                <FormField
                                    title="Re-Enter Password"
                                    value={form.confirmPassword}
                                    placeholder={"Re-Enter Password"}
                                    handleChangeText={(e) => setform({
                                        ...form,
                                        confirmPassword: e
                                    })}
                                    otherStyles="mt-5"
                                />
                                <CustomButton
                                    title="Change Password"
                                    handlePress={submit}
                                    containerStyles="mt-7"
                                //isLoading={isSubmitting}
                                //handlePress={() => { router.push('/sign-in') }}

                                />
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default ChangePassword

const Styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        marginTop: 0
    },
    card: {
        width: '85%',
        maxWidth: 400,
        borderRadius: 10,
        elevation: 5,
        marginVertical: 20,
        marginTop: 80,
        marginBottom: 250,
        backgroundColor: '#fff'
    },
    topTextContainer: {
        position: 'absolute',
        top: 50, // Adjust the top position as needed
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // White background
        paddingVertical: 10, // Vertical padding
    },
    topText: {
        fontSize: 24, // Adjust the font size as needed
        fontWeight: 'bold',
        color: 'black'
    },
    horizontalLine: {
        width: '90%',
        height: 1,
        backgroundColor: 'black',
        // Adjust the color as needed
    },
});