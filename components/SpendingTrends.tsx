"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SpendingTrends = () => {
  const data = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Spending",
        data: [1200, 1900, 1500, 2100, 1800, 2400],
        borderColor: "#0179FE",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(1, 121, 254, 0.3)");
          gradient.addColorStop(1, "rgba(1, 121, 254, 0)");
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#0179FE",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        titleColor: "#fff",
        bodyColor: "#cbd5e1",
        displayColors: false,
        callbacks: {
            label: function(context: any) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
            }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
          font: {
            size: 12,
          }
        }
      },
      y: {
        display: false,
        grid: {
            display: false,
        }
      },
    },
  };

  return (
    <div className="w-full h-full p-6 bg-white rounded-2xl shadow-soft border border-gray-100/50 hover:shadow-soft-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
            <h2 className="header-2">Spending Trends</h2>
            <select className="text-xs bg-gray-50 border-none rounded-lg py-1 px-2 text-gray-600 outline-none cursor-pointer hover:bg-gray-100">
                <option>Last 6 months</option>
                <option>This Year</option>
            </select>
        </div>
      <div className="h-[200px] w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SpendingTrends;
