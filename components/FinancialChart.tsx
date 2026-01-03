'use client'

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FinancialChart = ({ transactions }: { transactions: Transaction[] }) => {
  // Process transactions to get last 7 days of spending/income
  // For robustness in this demo, if no transactions, we might show empty or mock
  
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Mock data structure matching the "clean aesthetic"
  // In a real app, we would aggregate `transactions` by day
  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: [1200, 1900, 300, 500, 200, 3000, 1500], // Placeholder for visual demo
        backgroundColor: '#0747b6',
        borderRadius: 4,
      },
      {
        label: 'Expense',
        data: [800, 1200, 1500, 400, 500, 800, 1000], // Placeholder
        backgroundColor: '#2265d8',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 8,
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
        y: {
            grid: {
                display: false,
            },
            ticks: {
                display: false
            },
            border: {
                display: false
            }
        },
        x: {
             grid: {
                display: false,
            },
            border: {
                display: false
            }
        }
    }
  };

  return (
    <div className="w-full h-full min-h-[250px]">
         <Bar options={options} data={data} />
    </div>
  );
}

export default FinancialChart;
