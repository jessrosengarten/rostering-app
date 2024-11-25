import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Alert,Linking } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

const Tutorials = () => {
  const supportedURL = 'https://www.youtube.com/watch?v=X9bv7TkqdOs';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return <TouchableOpacity onPress={handlePress}>
      <Text style={Styles.link}>{children}</Text>
    </TouchableOpacity>;
};

  return (
    <SafeAreaView edges={[]} style={Styles.container}>
      <ImageBackground source={images.background} style={Styles.background}>
        <View style={Styles.header}>
          <Text style={Styles.headerText}>Tutorials</Text>
        </View>
        <ScrollView contentContainerStyle={Styles.scrollContainer}>
            <View style={Styles.tutorialContainer}>
            <Text style={Styles.tutorialHeading}>How to View Club Details?</Text>
            <OpenURLButton url={supportedURL}>Open YouTube Video</OpenURLButton>
          </View>
          <View style={Styles.tutorialContainer}>
            <Text style={Styles.tutorialHeading}>How to View Security Personnel Details?</Text>
            <OpenURLButton url={supportedURL}>Open YouTube Video</OpenURLButton>
          </View>
          <View style={Styles.tutorialContainer}>
            <Text style={Styles.tutorialHeading}>How to View Club Mangers Details?</Text>
            <OpenURLButton url={supportedURL}>Open YouTube Video</OpenURLButton>
          </View>
          <View style={Styles.tutorialContainer}>
            <Text style={Styles.tutorialHeading}>How to View Schedule?</Text>
            <OpenURLButton url={supportedURL}>Open YouTube Video</OpenURLButton>
          </View>
          <View style={Styles.tutorialContainer}>
            <Text style={Styles.tutorialHeading}>How to View All Finances?</Text>
            <OpenURLButton url={supportedURL}>Open YouTube Video</OpenURLButton>
          </View>
          <View />
          <View />
          
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Tutorials;

const Styles = StyleSheet.create({
    tutorialHeading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  link: { fontSize: 16, color: 'red', marginBottom: 10 },
    tutorialContainer: {
    marginVertical: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 40,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: 350, 
    height: 150, 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: 0
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
  },
});