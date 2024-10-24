import React, { useState } from 'react';
import { SafeAreaView, Text, View, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit'; // Using PieChart instead of LineChart
import { Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Importing dropdown component
import { images } from '../../constants'; // Assuming the images object includes your background

const screenWidth = Dimensions.get('window').width;

const DataAnalytics = () => { 
  // Example data for profit per club
  const profitDataByMonth = {
    July: [4500, 3800, 5200],
    August: [4800, 4200, 5300],
    September: [5000, 4100, 5500],
  };

  const earningsByClub = {
    July: [12000, 11000, 15000],
    August: [13000, 10000, 16000],
    September: [12500, 10500, 15500],
  };

  // State to track selected month and club
  const [selectedMonth, setSelectedMonth] = useState('July');
  const [selectedClub, setSelectedClub] = useState(null);

  // Profit Data based on selected month
  const profitData = {
    labels: ["Neon", "Jail", "Omnia"], // Clubs
    datasets: [
      {
        data: profitDataByMonth[selectedMonth], // Display profits for selected month
      }
    ]
  };

  // Pie chart data for earnings comparison
  const earningsComparisonData = [
    {
      name: "Neon",
      population: earningsByClub[selectedMonth][0],
      color: "#810819", // Customize colors as needed
      legendFontColor: "#000",
      legendFontSize: 15
    },
    {
      name: "Jail",
      population: earningsByClub[selectedMonth][1],
      color: "#E21A1A",
      legendFontColor: "#000",
      legendFontSize: 15
    },
    {
      name: "Omnia",
      population: earningsByClub[selectedMonth][2],
      color: "#1F2837",
      legendFontColor: "#000",
      legendFontSize: 15
    }
  ];

  return (
    <SafeAreaView edges={[]}>
      <ImageBackground source={images.background} style={styles.background}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Data Analytics</Text>
          </View>

          {/* Dropdown for Selecting Month */}
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select Month:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedMonth(value)} // Update state when a different month is selected
              items={[
                { label: 'July', value: 'July' },
                { label: 'August', value: 'August' },
                { label: 'September', value: 'September' },
              ]}
              style={pickerSelectStyles}
              value={selectedMonth}
            />
          </View>

          {/* Bar Chart - Profit Per Club */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Profit per Club ({selectedMonth} 2024)</Text>
            <BarChart
              data={profitData} // Pass in the profit data for the selected month
              width={screenWidth - 40} // Adjust width accordingly
              height={220}
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </View>

          {/* Pie Chart - Earnings Comparison */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Club Earnings Comparison ({selectedMonth})</Text>
            <PieChart
              data={earningsComparisonData} // Pie chart data for earnings comparison
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              accessor={"population"} // Key to access the data value for each section
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute
            />
          </View>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Chart configuration for styling
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

// Styles
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
    alignItems: 'left',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  dropdownContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
});

// Styles for the picker
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is not overlapping with the dropdown
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is not overlapping with the dropdown
  },
};

export default DataAnalytics;
