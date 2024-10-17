import { View, Text, ScrollView, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router';
import { Card } from 'react-native-paper';
import { register } from '../../Backend/loginAndRegister';

const SignUp = () => {
  const [form, setform] = useState({
    verificationCode: "",
    username: "",
    email: "",
    password: "",
  })

  const handleRegister = async () => {
    try {
        await register(email, password);
        alert('Registration Successful');
        router.push('/sign-in')
    } catch (e) {
      setError(e.message);
    }
  };


  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
  }
  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        <ScrollView contentContainerStyle={Styles.scrollViewContent}>
          <View style={Styles.topTextContainer}>
            <Text style={Styles.topText}>Register</Text>
          </View>
          <View style={Styles.horizontalLine} />
          <Card style={Styles.card}>
            <Card.Content>
              <View>
                <FormField
                  title="Verification Code"
                  value={form.verificationCode}
                  placeholder={"Enter Code"}
                  handleChangeText={(e) => setform({
                    ...form,
                    verificationCode: e
                  })}
                />
                <FormField
                  title="Username"
                  value={form.username}
                  placeholder={"Enter Username"}
                  handleChangeText={(e) => setform({
                    ...form,
                     username: e
                  })}
                  otherStyles="mt-5"
                />
                <FormField
                  title="Email"
                  value={form.email}
                  placeholder={"Enter Email"}
                  handleChangeText={(e) => setform({
                    ...form,
                    email: e
                  })}
                  otherStyles="mt-5"
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
                  title="Sign Up"
                  //handlePress={submit}
                  handlePress={() => { handleRegister }}
                  containerStyles="mt-7"
                  //isLoading={isSubmitting}
                />
                <View className="justify-center pt-5 flex-row gap-2">
                  <Text className="text-lg text-black font-pregular">
                    Have an account already?
                  </Text>
                  <Link href={"/sign-in"} className="text-lg font-psemibold text-secondary">Sign In</Link>
                </View>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default SignUp

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
    maxWidth: 400,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 20,
    marginTop: 50,
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
  horizontalLine: {
    width: '90%',
    height: 1,
    backgroundColor: 'black',
    // Adjust the color as needed
  },

  // formContainer: {
  //     width: '100%',
  //     justifyContent: 'center',
  //     minHeight: '85vh',
  //     paddingHorizontal: 16,
  //     marginVertical: 16,
  // },
});