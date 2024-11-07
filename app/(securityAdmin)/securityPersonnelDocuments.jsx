import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import React from 'react';
import CustomButton from '../../components/CustomButton';

const SecurityPersonnelUser = ({ documents }) => {
  const renderDocument = (title, document) => {
    return (
      <View key={title} style={styles.documentContainer}>
        <Text style={styles.documentTitle}>{title}</Text>
        {document ? (
          <CustomButton title="Download" />
        ) : (
          <Text style={styles.noDocumentText}>No Document</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} className='h-full w-full'>
        {/* Semi-transparent Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Security Personnel Documents</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {renderDocument('PSIRA', documents?.psira)}
          {renderDocument('Drivers License', documents?.driversLicense)}
          {renderDocument('ID', documents?.id)}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SecurityPersonnelUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: '100%',
    width: '100%',
  },
  header: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    alignContent: 'left',
  },
  scrollContainer: {
    padding: 20,
    justifyContent: 'flex-start',
  },
  documentContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noDocumentText: {
    fontSize: 16,
    color: '#888',
  },
});
