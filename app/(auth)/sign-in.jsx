import { View, Text, ScrollView, Image, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, useRouter } from 'expo-router';
import { Card } from 'react-native-paper';
import { login } from '../../Backend/loginAndRegister';
import { db } from '../../Backend/firebaseConfig'
import { ref, set, get } from 'firebase/database'
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
    const [form, setform] = useState({
        email: "",
        password: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const navigation = useNavigation();

    const handleLogin = async () => {
        const { email, password } = form;

        try {
            await login(email, password);
            //console.log("Login Success");

            // Fetch user role from Realtime Database
            const roles = ['securityAdmin', 'securityPersonnel', 'clubManager'];
            let userRole = null;
            let userData = null;

            for (const role of roles) {
                const userRef = ref(db, `${role}/${email.replace('.', ',')}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    userRole = role;
                    userData = snapshot.val();
                    break;
                }
            }

            if (userRole) {
                switch (userRole) {
                    case 'securityAdmin':
                        router.push(`/securityAdminHome?adminName=${encodeURIComponent(userData.fullName)}`);
                        break;
                    case 'securityPersonnel':
                        router.push(`/securityPersonnelHome?personnelName=${encodeURIComponent(userData.fullName)}`);
                        break;
                    case 'clubManager':
                        router.push(`/clubManagerHome?managerName=${encodeURIComponent(userData.fullName)}`);
                        break;
                    default:
                        console.log('Unknown user role');
                        alert('Unsuccessful, User Role Not Found');
                        return;
                }
            }

        } catch (e) {
            alert(e.message);
        }
    };

    const submit = () => {
        setIsSubmitting(true);
        handleLogin().finally(() => setIsSubmitting(false));
    }

    return (
        <SafeAreaView edges={[]} >
            <ImageBackground source={images.background} className='h-full w-full'>
                <View style={Styles.topTextContainer}>
                    <Text style={Styles.topText}>Log In</Text>
                </View>
                <ScrollView contentContainerStyle={Styles.scrollViewContent}>
                    <Card style={Styles.card}>
                        <Card.Content>
                            <View>
                                <FormField
                                    title="Email"
                                    value={form.email}
                                    placeholder={"Enter Email"}
                                    handleChangeText={(e) => setform({
                                        ...form,
                                        email: e
                                    })}
                                    otherStyles=""
                                    keyboardType="email-address"
                                />

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
                                <CustomButton
                                    title="Sign In"
                                    handlePress={submit}
                                    containerStyles="mt-7"
                                    isLoading={isSubmitting}
                                />
                                <View className="justify-center pt-5 flex-row ">
                                    <Link href={'/change-password'} className="text-lg font-pregular text-black" style={{ textDecorationLine: 'underline' }}>Forgot Password?</Link>
                                </View>
                                <View className="justify-center pt-3" style={{ flexDirection: 'row' }}>
                                    <Text className="text-lg text-black font-pregular" style={{ textDecorationLine: 'underline' }}>
                                        Don't have an account?
                                    </Text>
                                    <Link href={'/sign-up'} className="text-lg font-psemibold text-secondary">  Sign Up</Link>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default SignIn

const Styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        marginTop: 0
    },
    card: {
        width: '85%',
        maxWidth: 450,
        borderRadius: 10,
        elevation: 5,
        marginVertical: 20,
        marginTop: 100,
        marginBottom: 50,
        paddingHorizontal: 15,
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
        color: 'black', // Adjust the color as needed
        marginLeft: 20, // Adjust the left margin as needed
    },
});