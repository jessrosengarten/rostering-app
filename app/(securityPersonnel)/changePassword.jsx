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
        <SafeAreaView edges={[]} style={Styles.container}>
            <ImageBackground source={images.background} style={Styles.background}>
                <View style={Styles.header}>
                        <Text style={Styles.headerText}>Change Password</Text>
                    </View>
                <ScrollView contentContainerStyle={Styles.scrollContainer}>
                    
                    <View/>
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
  
  scrollContainer: { 
    paddingHorizontal: 20, 
    paddingBottom: 30 
    },

    card: {
        width: '85%',
        maxWidth: 400,
        borderRadius: 10,
        elevation: 5,
        marginVertical: 20,
        marginTop: 80,
        marginBottom: 250
    },
     header: { 
    padding: 15, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)' 
    },
    
      background: { 
    height: '100%', 
    width: '100%' 
    },

    container: { 
    flex: 1, 
    width: '100%' 
    },
  

    headerText: {
        fontSize: 24, 
        fontWeight: 'bold',
        color: 'black', 
        marginLeft: 20, 
    },
});