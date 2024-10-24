import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { Card } from 'react-native-paper';
import { register } from '../../Backend/loginAndRegister';
import { db } from '../../Backend/firebaseConfig';
import { ref, set } from 'firebase/database';

const SignUp = () => {
  const [form, setform] = useState({
    verificationCode: "",
    username: "",
    email: "",
    password: "",
    role: "clubManager",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const { email, password, role } = form;
      await register(email, password);
      console.log("Sign-Up Success");

      // Store user data in Realtime Database
      const userRef = ref(db, 'users/' + email.replace('.', ','));
      await set(userRef, {
        email: email,
        role: role,
      });

      console.log("User data stored in Realtime Database");
      alert('Sign-Up Successful');
      router.push('/sign-in');
    } catch (e) {
      alert(e.message);
    }
  };

  const submit = () => {
    setIsSubmitting(true);
    handleRegister().finally(() => setIsSubmitting(false));
  };

  return (
    <SafeAreaView edges={[]} style={Styles.safeArea}>
      <ImageBackground source={images.background} style={Styles.imageBackground}>
        <View style={Styles.container}>
          <View style={Styles.topTextContainer}>
            <Text style={Styles.topText}>Register</Text>
          </View>
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
                  handlePress={handleRegister}
                  containerStyles="mt-7"
                />
                <View style={{ justifyContent: 'center', paddingVertical: 5, flexDirection: 'row', gap: 2 }}>
                  <Text style={{ fontSize: 16, color: 'black' }}>
                    Have an account already?
                  </Text>
                  <Link href={"/sign-in"} style={{ fontSize: 16, color: '#E21A1A' }}>Sign In</Link>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: '78%',
    //maxWidth: 600, 
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginTop: 40,
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
});