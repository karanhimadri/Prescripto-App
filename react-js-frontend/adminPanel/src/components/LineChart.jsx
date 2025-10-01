import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const LineChart = ({ data, labels, title = 'Earnings', color = 'rgb(59, 130, 246)', height = 300 }) => {
  const chartData = {
    labels,
    datasets: [{
      label: title,
      data,
      fill: true,
      borderColor: color,
      backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: color,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      tension: 0.4,
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          title: function (context) {
            return context[0].label;
          },
          label: function (context) {
            if (title === 'Earnings') {
              return `$${context.parsed.y.toLocaleString()}`;
            }
            return `${context.parsed.y}${title.includes('%') || title.includes('Rate') ? '%' : ''}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: '#f3f4f6',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12
          },
          callback: function (value) {
            if (title === 'Earnings') {
              return '$' + value.toLocaleString();
            }
            return value + (title.includes('%') || title.includes('Rate') ? '%' : '');
          }
        }
      }
    },
    elements: {
      point: {
        hoverRadius: 8
      }
    }
  }

  return (
    <div style={{ height: `${height}px` }}>
      <Line data={chartData} options={options} />
    </div>
  )
}

export default LineChart
