import React from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions,ImageBackground } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const Finance = () => {

  // Sample data for clubs
  const graphData = [
    { clubName: 'Club 1', totalAmount: 200, numberOfShifts: 2 },
    { clubName: 'Club 2', totalAmount: 300, numberOfShifts: 3 },
    { clubName: 'Club 3', totalAmount: 150, numberOfShifts: 1 },
  ];
  // Extract total amounts and club names
  const totalAmounts = graphData.map(item => item.totalAmount);
  const clubs = graphData.map(item => item.clubName);

  // Data structure for Bar Chart
  const data = {
    labels: clubs, // X-axis labels (club names)
    datasets: [
      {
        data: totalAmounts, // Y-axis values (total amounts)
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Bar color
        strokeWidth: 2, // Bar border width
      },
    ],
  };

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <SafeAreaView edges={[]} style={styles.safeArea}>
    <ImageBackground source={images.background} style={styles.background}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Total Amount Recieved from Each Club</Text>
      <BarChart
        data={data}
        width={screenWidth - 30} // Adjust width of the chart
        height={220} // Height of the chart
        chartConfig={chartConfig}
        style={styles.chartStyle}
      />
    </ScrollView>
    </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartStyle: {
    marginVertical: 10,
    borderRadius: 16,
  },
});

export default Finance;
