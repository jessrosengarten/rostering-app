import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';
import { Card } from 'react-native-paper';

const ChangePassword = () => {
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const validateInput = (field, value) => {
        let error = "";

        // Password validation
        if (field === "password") {
            if (value.length < 6) {
                error = "Password must be at least 6 characters.";
            }
        }

        // Confirm password validation
        if (field === "confirmPassword") {
            if (value !== form.password) {
                error = "Passwords do not match.";
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };

    const handleInputChange = (field, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value,
        }));

        // Validate input dynamically as the user types
        validateInput(field, value);
    };

    const submit = () => {
        const isPasswordValid = !errors.password && form.password.length >= 6;
        const isConfirmPasswordValid =
            !errors.confirmPassword && form.confirmPassword === form.password;

        if (!isPasswordValid || !isConfirmPasswordValid) {
            alert("Please correct the errors before proceeding.");
            return;
        }

        // Proceed with password change logic
        router.push("/sign-in");
    };

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} className="h-full w-full">
                <ScrollView contentContainerStyle={Styles.scrollViewContent}>
                    <View style={Styles.topTextContainer}>
                        <Text style={Styles.topText}>Change Password</Text>
                    </View>
                    <Card style={Styles.card}>
                        <Card.Content>
                            <View>
                                {/* Password Field */}
                                <FormField
                                    title="Password"
                                    value={form.password}
                                    placeholder="Enter Password"
                                    handleChangeText={(value) => handleInputChange("password", value)}
                                    otherStyles="mt-5"
                                />
                                {errors.password && (
                                    <Text style={Styles.errorText}>{errors.password}</Text>
                                )}

                                {/* Confirm Password Field */}
                                <FormField
                                    title="Re-Enter Password"
                                    value={form.confirmPassword}
                                    placeholder="Re-Enter Password"
                                    handleChangeText={(value) =>
                                        handleInputChange("confirmPassword", value)
                                    }
                                    otherStyles="mt-5"
                                />
                                {errors.confirmPassword && (
                                    <Text style={Styles.errorText}>{errors.confirmPassword}</Text>
                                )}

                                <CustomButton
                                    title="Change Password"
                                    handlePress={submit}
                                    containerStyles="mt-7"
                                />
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default ChangePassword;

const Styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        marginTop: 0,
    },
    card: {
        width: "85%",
        maxWidth: 400,
        borderRadius: 10,
        elevation: 5,
        marginVertical: 20,
        marginTop: 80,
        marginBottom: 250,
        backgroundColor: "#fff",
    },
    topTextContainer: {
        position: "absolute",
        top: 50,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        paddingVertical: 10,
    },
    topText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginTop: 5,
    },
});
