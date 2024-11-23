import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions,ImageBackground } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAmountsForAllClubs, getAmountsForAllSecurityPersonnel } from '../../Backend/securityAdmin';

const screenWidth = Dimensions.get('window').width;
const Finance = () => {

  const [estimatedAmounts, setEstimatedAmounts] = useState({});
  const [personnelAmounts, setPersonnelAmounts] = useState({});

  const fetchEstimatedAmounts = async () => {
    try {
      const amounts = await getAmountsForAllClubs();
      setEstimatedAmounts(amounts);
    } catch (error) {
      console.error('Error fetching estimated amounts:', error);
    }
  };

  const fetchPersonnelAmounts = async () => {
    try {
      const amounts = await getAmountsForAllSecurityPersonnel();
      setPersonnelAmounts(amounts);
    } catch (error) {
      console.error('Error fetching personnel amounts:', error);
    }
  };

  useEffect(() => {
    fetchEstimatedAmounts();
    fetchPersonnelAmounts();
    console.log(estimatedAmounts);
    console.log(personnelAmounts);
  }, []);

  const totalPaymentsThisWeek = personnelAmounts.personnel?.reduce((acc, { currentWeekAmount }) => acc + currentWeekAmount, 0) || 0;
  const estimatedPaymentsNextWeek = personnelAmounts.personnel?.reduce((acc, { nextWeekAmount }) => acc + nextWeekAmount, 0) || 0;

  const totalActualEarnThisWeek = Object.values(estimatedAmounts.clubs || {}).reduce((acc, clubCosts) => {
    return acc + clubCosts.currentWeek.reduce((sum, { amount }) => sum + amount, 0);
  }, 0);

  const totalEstimatedEarnNextWeek = Object.values(estimatedAmounts.clubs || {}).reduce((acc, clubCosts) => {
    return acc + clubCosts.nextWeek.reduce((sum, { amount }) => sum + amount, 0);
  }, 0);

  const totalProfitThisWeek = totalActualEarnThisWeek - totalPaymentsThisWeek;
  const totalProfitNextWeek = totalEstimatedEarnNextWeek - estimatedPaymentsNextWeek;
  
  const graphData = [
    { week: 'This Week', totalAmount: totalProfitThisWeek},
    { week: 'Next Week', totalAmount: totalProfitNextWeek},
  ];

  const totalAmounts = graphData.map(item => item.totalAmount);
  const profit = graphData.map(item => item.week);

  // Data structure for Bar Chart
  const data = {
    labels: profit, // X-axis labels (club names)
    datasets: [
      {
        data: totalAmounts, // Y-axis values (total amounts)
        color:'red', // Bar color
        strokeWidth: 2, // Bar border width
      },
    ],
  };

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 5) => `rgba(255, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <SafeAreaView edges={[]} style={styles.safeArea}>
    <ImageBackground source={images.background} style={styles.background}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Total Profit for This Week And Estimated Profit for Next Week</Text>
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
