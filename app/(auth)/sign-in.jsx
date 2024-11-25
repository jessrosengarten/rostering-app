import { View, Text, ScrollView, ImageBackground, StyleSheet,Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';
import { Card } from 'react-native-paper';
import { login } from '../../Backend/loginAndRegister';
import { db } from '../../Backend/firebaseConfig';
import { ref, get } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const validateInput = (field, value) => {
        let error = '';

        // Email validation
        if (field === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email address.';
            }
        }

        // Password validation
        if (field === 'password') {
            if (value.length < 6) {
                error = 'Password must be at least 6 characters.';
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));

        return error === ''; // Return true if valid
    };

    const handleInputChange = (field, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value,
        }));

        // Validate input as the user types
        validateInput(field, value);
    };

    const saveToken = async (token) => {
        try {
            await AsyncStorage.setItem('userToken', token);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    const handleLogin = async () => {
        const { email, password } = form;

        // Validate all inputs before submission
        const isEmailValid = validateInput('email', email);
        const isPasswordValid = validateInput('password', password);

        if (!isEmailValid || !isPasswordValid) {
            alert('Please correct the errors before proceeding.');
            return;
        }

        try {
            const { user, token } = await login(email, password);

            // Save the token locally
            await saveToken(token);

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
    };

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className="h-full w-full">
                <View style={Styles.topTextContainer}>
                    <Text style={Styles.topText}>Log In</Text>
                </View>
                <ScrollView contentContainerStyle={Styles.scrollViewContent}>
                <Image
                            source={images.naraLogo}
                            className="w-40 h-40"
                            resizeMode="contain"
                            style={{ borderRadius: 30 }}
                        />
                    <Card style={Styles.card}>
                        <Card.Content>
                            <View>
                                <FormField
                                    title="Email"
                                    value={form.email}
                                    placeholder="Enter Email"
                                    handleChangeText={(value) => handleInputChange('email', value)}
                                    otherStyles=""
                                    keyboardType="email-address"
                                />
                                {errors.email && (
                                    <Text style={Styles.errorText}>{errors.email}</Text>
                                )}

                                <FormField
                                    title="Password"
                                    value={form.password}
                                    placeholder="Enter Password"
                                    handleChangeText={(value) => handleInputChange('password', value)}
                                    otherStyles="mt-5"
                                />
                                {errors.password && (
                                    <Text style={Styles.errorText}>{errors.password}</Text>
                                )}

                                <CustomButton
                                    title="Sign In"
                                    handlePress={submit}
                                    containerStyles="mt-7"
                                    isLoading={isSubmitting}
                                />
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default SignIn;

const Styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        marginTop: 0,
    },
    card: {
        width: '85%',
        maxWidth: 450,
        borderRadius: 10,
        elevation: 5,
        marginVertical: 20,
        marginTop: 60,
        marginBottom: 50,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    topTextContainer: {
        position: 'absolute',
        top: 50,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        paddingVertical: 10,
    },
    topText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
});
