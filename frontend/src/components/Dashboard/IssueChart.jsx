import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function issueChart({data}){
    
    const chartData = {
        labels: data.map(item => item.issue_type),
        datasets: [
            {
            label: "Reports",
            data: data.map(item => item.total),
            backgroundColor:[ 
                "#198754",
                "#0d6efd",
                "#ffc107",
                "#dc3545",
                "#6f42c1",
                "#20c997",
                "#fd7e14",
                ],
            },
        ],
    };

    return <Pie data={chartData}/>
}

export default issueChart;