import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function TransportChart({data}){
    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
            display: false,
            },
        },

        scales: {
            y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
            },

            x: {
            grid: {
                display: false,
            },
            },
        },
    };
    const chartData = {
        labels: data.map(item => item.transport_type),
        datasets: [
            {
            label: "Reports",
            data: data.map(item => item.total),
            backgroundColor:[ 
                "#0d6efd",
                "#198754",
                "#6f42c1",
                "#dc3545",
                "#6f42c1",
                "#20c997",
                "#fd7e14",
                ],
            },
        ],
    };

    return (
        <div style={{ height: "300px", width: "100%" }}>
            <Bar data={chartData} options={options} />
        </div>
    )
}

export default TransportChart;