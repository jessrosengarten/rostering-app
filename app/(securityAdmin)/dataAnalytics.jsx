import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions,ImageBackground } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAmountsForAllDateRanges, getAllAmountsForSecurityPersonnel } from '../../Backend/securityAdmin';

const screenWidth = Dimensions.get('window').width;
const Finance = () => {
 const [clubAmounts, setClubAmounts] = useState({});
 const [personnelAllAmounts, setAllPersonnelAmounts] = useState({});

   const fetchClubAmounts = async () => {
    try {
      const amounts = await getAmountsForAllDateRanges();
      setClubAmounts(amounts);
    } catch (error) {
      console.error('Error fetching estimated amounts:', error);
    }
  };

  const fetchAllPersonnelAmounts = async () => {
    try {
      const amounts = await getAllAmountsForSecurityPersonnel();
      console.log(amounts);
      setAllPersonnelAmounts(amounts);
    } catch (error) {
      console.error('Error fetching estimated amounts:', error);
    }
  };

  useEffect(() => {
    fetchAllPersonnelAmounts();
    fetchClubAmounts();
    calculateProfit(clubAmounts,personnelAllAmounts);
  }, []);

  const calculateProfit = (clubData, personnelData) => {
  const profitData = {};

  const allDateRanges = new Set([
    ...Object.keys(clubData),
    ...Object.keys(personnelData),
  ]);

  allDateRanges.forEach((dateRange) => {
    const clubAmounts = clubData[dateRange] || { totalAmountDue: 0, totalEstimatedAmount: 0 };
    const personnelAmounts = personnelData[dateRange] || { totalAmountDue: 0, totalEstimatedAmount: 0 };

    // Calculate profit for the current date range
    profitData[dateRange] = {
      profitAmountDue: clubAmounts.totalAmountDue - personnelAmounts.totalAmountDue,
      profitEstimatedAmount: clubAmounts.totalEstimatedAmount - personnelAmounts.totalEstimatedAmount,
    };
  });
  return profitData;
};
  
  const prepareChartData = (data) => {
  const labels = [];
  const profits = [];

  for (const dateRange in data) {
    labels.push(dateRange); // Add date ranges to labels
    const { profitAmountDue, profitEstimatedAmount } = data[dateRange];
    profits.push(profitAmountDue !== 0 ? profitAmountDue : profitEstimatedAmount);
  }

  return { labels, profits };
};

const { labels, profits } = prepareChartData(calculateProfit(clubAmounts,personnelAllAmounts));

const chartData = {
  labels, // Date ranges
  datasets: [
    {
      data: profits, 
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,// Bar color
    },
  ],
};

const chartConfig = {
  backgroundColor: "#F0F0F0", 
  backgroundGradientFrom: "#F0F0F0",
  backgroundGradientTo: "#F0F0F0", 
  decimalPlaces: 0, 
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
  barPercentage: 0.8,
  style: {
    borderRadius: 16,
  },
};

  return (
    <SafeAreaView edges={[]} style={styles.safeArea}>
    <ImageBackground source={images.background} style={styles.background}>
       <View style={styles.header}>
            <Text style={styles.headerText}>Profit and Projected Profit Per Week</Text>
          </View>
    <ScrollView contentContainerStyle={styles.container} horizontal style={styles.scrollView}>
      <BarChart
            style={styles.chart}
            data={chartData}
            width={screenWidth * 1.3} 
            height={500}
            chartConfig={chartConfig}
            verticalLabelRotation={30} 
            fromZero 
          />
    </ScrollView>
    </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  },
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  scrollView: {
    backgroundColor: '#F0F0F0', 
    borderRadius: 16,
    margin: 16,
  },
});

export default Finance;
