import React from 'react';
import { SafeAreaView, Text, View, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { images } from '../../constants'; // Assuming the images object includes your background

const screenWidth = Dimensions.get('window').width;

const DataAnalytics = () => { 
  // Example data for profit per club (Bar Chart)
  const profitData = {
    labels: ["Neon Night Club", "Jail Night Club", "Omnia"], // Clubs
    datasets: [
      {
        data: [45000, 38000, 52000], // Profits for each club
      }
    ]
  };

  // Example data for total payments (Pie Chart)
  const personnelPaymentData = [
    { name: 'Person A', total: 12000, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Person B', total: 10000, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Person C', total: 9000, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.background}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Data Analytics</Text>
          </View>

          {/* Bar Chart - Profit Per Club */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Profit per Club (July 2024)</Text>
            <BarChart
              data={profitData}
              width={screenWidth - 40} // adjust width accordingly
              height={220}
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </View>

          {/* Pie Chart - Payments to Personnel */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Total Payments to Security Personnel</Text>
            <PieChart
              data={personnelPaymentData}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              accessor={"total"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute // shows percentage labels inside pie chart
            />
          </View>

          {/* More Charts */}
          {/* Add additional charts like line charts or stacked bar charts here */}
          
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundColor: '#1cc910',
  backgroundGradientFrom: '#eff3ff',
  backgroundGradientTo: '#efefef',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  }
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  header: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  chartContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DataAnalytics;
