import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getAmountsForAllDateRanges, getAllAmountsForSecurityPersonnel } from '../backend/Finances'; 

// Register Chart.js components
Chart.register(...registerables);

const Finances = () => {
  const [dateRangeData, setDateRangeData] = useState(null);
  const [personnelData, setPersonnelData] = useState(null);
  const [profitData, setProfitData] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const dateRangeAmounts = await getAmountsForAllDateRanges();
        setDateRangeData(dateRangeAmounts);

        const personnelAmounts = await getAllAmountsForSecurityPersonnel();
        setPersonnelData(personnelAmounts);

        const calculatedProfit = calculateProfit(dateRangeAmounts, personnelAmounts);
        setProfitData(calculatedProfit);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

  // Data for "Amounts by Date Range" chart
  const getDateRangeChartData = (data) => {
    if (!data || Object.keys(data).length === 0) return null;

    const labels = Object.keys(data);
    const totalAmountDue = labels.map(
      (dateRange) => data[dateRange].totalAmountDue
    );
    const totalEstimatedAmount = labels.map(
      (dateRange) => data[dateRange].totalEstimatedAmount
    );
    return {
      labels,
      datasets: [
        {
          label: 'Total Amount Due',
          data: totalAmountDue,
          backgroundColor: 'rgb(120, 120, 120)', 
        },
        {
          label: 'Total Estimated Amount',
          data: totalEstimatedAmount,
          backgroundColor: 'rgba(255, 99, 71, 1)', // Red
        },
      ],
    };
  };

   // Data for "Profit by Date Range" chart
  const getProfitChartData = (data) => {
    if (!data || Object.keys(data).length === 0) return null;

    const labels = Object.keys(data);
    const profitAmountDue = labels.map(
      (dateRange) => data[dateRange].profitAmountDue
    );
    const profitEstimatedAmount = labels.map(
      (dateRange) => data[dateRange].profitEstimatedAmount
    );

    return {
      labels,
      datasets: [
        {
          label: 'Profit Amount Due',
          data: profitAmountDue,
          backgroundColor: 'rgb(120, 120, 120)', 
        },
        {
          label: 'Profit Estimated Amount',
          data: profitEstimatedAmount,
          backgroundColor: 'rgba(255, 99, 71, 1)', // Red
        },
      ],
    };
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Data Analytics Dashboard</h2>

      {/* Chart for Security Personnel Amounts */}
      {personnelData &&Object.keys(personnelData).length > 0 && (
        <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Expenses for Security Personnel</h3>
        <div style={styles.chartWrapper}>
          <Bar data={getDateRangeChartData(personnelData)} options={chartOptions} />
        </div>
      </div>
      )}

      {/* Chart for Amounts by Date Range */}
      {dateRangeData && Object.keys(dateRangeData).length > 0 && (
        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>Income from Clubs</h3>
          <div style={styles.chartWrapper}>
          <Bar data={getDateRangeChartData(dateRangeData)} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Chart for Profit by Date Range */}
      {profitData && Object.keys(profitData).length > 0 && (
        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>Profit from Clubs and Personnel</h3>
          <div style={styles.chartWrapper}>
            <Bar data={getProfitChartData(profitData)} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

// Chart Options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
  },
  scales: {
    x: { title: { display: true, text: 'Week' } },
    y: { title: { display: true, text: 'Amount (R)' } },
  },
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  chartContainer: {
    marginBottom: '40px',
    width: '100%', // Ensure full width
    textAlign: 'center', // Centers the title
  },
  chartTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    textAlign: 'center',
  },
  chartWrapper: {
    display: 'flex',
    justifyContent: 'center',  // Centers chart horizontally
    alignItems: 'center',      // Centers chart vertically
    height: '400px',           // Fixed height for the chart
  },
};

export default Finances;
