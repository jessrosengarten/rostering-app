import { View, Text, ScrollView, StyleSheet, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';
import { Card } from 'react-native-paper';
import { auth } from '../../Backend/firebaseConfig';
import { updatePassword } from 'firebase/auth';

const ChangePassword = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sanitizeInput = (input) => input.trim();

  const validatePassword = (password) => {
    const regex = /^.{6,}$/; // At least 6 characters
    return regex.test(password);
  };

  const submit = async () => {
    // Clear previous errors
    setErrors({ password: "", confirmPassword: "" });

    const sanitizedPassword = sanitizeInput(form.password);
    const sanitizedConfirmPassword = sanitizeInput(form.confirmPassword);

    if (!validatePassword(sanitizedPassword)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long.",
      }));
      return;
    }

    if (sanitizedPassword !== sanitizedConfirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, sanitizedPassword);
        Alert.alert("Success", "Password changed successfully");
        router.push("/sign-in");
      } else {
        Alert.alert("Error", "No user is signed in");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={[]} style={Styles.container}>
      <ImageBackground source={images.background} style={Styles.background}>
        <View style={Styles.header}>
          <Text style={Styles.headerText}>Change Password</Text>
        </View>
        <ScrollView contentContainerStyle={Styles.scrollContainer}>
          <View />
          <Card style={Styles.card}>
            <Card.Content>
              <View>
                <FormField
                  title="Password"
                  value={form.password}
                  placeholder={"Enter Password"}
                  handleChangeText={(e) =>
                    setForm({
                      ...form,
                      password: e,
                    })
                  }
                  otherStyles="mt-5"
                />
                {errors.password && <Text style={Styles.errorText}>{errors.password}</Text>}
                <FormField
                  title="Re-Enter Password"
                  value={form.confirmPassword}
                  placeholder={"Re-Enter Password"}
                  handleChangeText={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e,
                    })
                  }
                  otherStyles="mt-5"
                />
                {errors.confirmPassword && <Text style={Styles.errorText}>{errors.confirmPassword}</Text>}
                <CustomButton
                  title="Change Password"
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

export default ChangePassword;

const Styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: 0,
  },
  card: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 20,
    marginTop: 80,
    marginBottom: 250,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  background: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
